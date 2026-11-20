import { Minus, Plus, ShoppingBag, Trash2, Lock } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { formatEuro, getCatalogProduct } from "@/lib/catalog";

export function CartSheet() {
  const { lines, open, setOpen, setQuantity, remove, subtotalCents } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b p-6">
          <SheetTitle className="font-display">Your cart</SheetTitle>
          <SheetDescription>Online ordering opens soon. Prices shown are indicative.</SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-teal-soft text-teal-strong">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            <Button asChild variant="outline" onClick={() => setOpen(false)}>
              <Link to="/shop">Browse tags</Link>
            </Button>
          </div>
        ) : (
          <ul className="flex-1 divide-y overflow-y-auto px-6">
            {lines.map((line) => {
              const product = getCatalogProduct(line.productId);
              if (!product) return null;
              return (
                <li key={line.productId} className="flex gap-4 py-5">
                  <img src={product.image} alt="" className="h-20 w-20 rounded-lg bg-muted object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium leading-tight">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.unit}</p>
                      </div>
                      <button
                        onClick={() => remove(line.productId)}
                        className="rounded p-1 text-muted-foreground hover:text-destructive"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-md border">
                        <button
                          className="grid h-8 w-8 place-items-center hover:bg-muted"
                          onClick={() => setQuantity(line.productId, line.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center font-mono text-sm" aria-live="polite">
                          {line.quantity}
                        </span>
                        <button
                          className="grid h-8 w-8 place-items-center hover:bg-muted"
                          onClick={() => setQuantity(line.productId, line.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-mono text-sm font-medium">
                        {formatEuro(product.priceCents * line.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {lines.length > 0 && (
          <SheetFooter className="flex-col gap-3 border-t bg-surface p-6 sm:flex-col sm:space-x-0">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal (excl. VAT)</span>
              <span className="font-mono text-base font-semibold">{formatEuro(subtotalCents)}</span>
            </div>
            <Button size="xl" disabled className="w-full">
              <Lock /> Checkout — coming soon
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Payments are not active yet. For bulk orders, contact{" "}
              <a href="mailto:sales@tagveris.com" className="font-medium text-foreground underline">
                sales@tagveris.com
              </a>
              .
            </p>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
