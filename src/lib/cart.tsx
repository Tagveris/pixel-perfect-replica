import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { CATALOG } from "@/lib/catalog";

export type CartLine = { productId: string; quantity: number };

const STORAGE_KEY = "tagveris-cart-v1";
export const MAX_QUANTITY = 99;

/** Pure helpers — kept outside React so they can be unit-tested. */
export function addToLines(lines: CartLine[], productId: string, quantity = 1): CartLine[] {
  const existing = lines.find((l) => l.productId === productId);
  if (existing) {
    return lines.map((l) =>
      l.productId === productId ? { ...l, quantity: Math.min(MAX_QUANTITY, l.quantity + quantity) } : l,
    );
  }
  return [...lines, { productId, quantity: Math.min(MAX_QUANTITY, quantity) }];
}

export function setLineQuantity(lines: CartLine[], productId: string, quantity: number): CartLine[] {
  if (quantity <= 0) return lines.filter((l) => l.productId !== productId);
  return lines.map((l) =>
    l.productId === productId ? { ...l, quantity: Math.min(MAX_QUANTITY, quantity) } : l,
  );
}

export function cartSubtotalCents(lines: CartLine[]): number {
  return lines.reduce((sum, line) => {
    const product = CATALOG.find((p) => p.id === line.productId);
    return product ? sum + product.priceCents * line.quantity : sum;
  }, 0);
}

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotalCents: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const add = useCallback((productId: string, quantity = 1) => {
    setLines((prev) => addToLines(prev, productId, quantity));
    setOpen(true);
  }, []);
  const setQuantity = useCallback((productId: string, quantity: number) => {
    setLines((prev) => setLineQuantity(prev, productId, quantity));
  }, []);
  const remove = useCallback((productId: string) => {
    setLines((prev) => setLineQuantity(prev, productId, 0));
  }, []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      itemCount: lines.reduce((n, l) => n + l.quantity, 0),
      subtotalCents: cartSubtotalCents(lines),
      open,
      setOpen,
      add,
      setQuantity,
      remove,
      clear,
    }),
    [lines, open, add, setQuantity, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
