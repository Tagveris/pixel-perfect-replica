/**
 * DEMO verification lookup.
 * No real verification database is connected yet. This module only recognises a
 * small set of clearly-labelled demo IDs so the interface states can be previewed.
 * Replace `lookupProduct` with a server call once the database is connected.
 */

export type VerifiedProduct = {
  id: string;
  name: string;
  manufacturer: string;
  country: string;
  category: string;
  batch: string;
  registeredOn: string;
  tagType: "NFC" | "QR" | "Secure NFC";
  description: string;
};

export type VerificationResult =
  | { status: "registered"; product: VerifiedProduct }
  | { status: "inactive"; product: VerifiedProduct; reason: string }
  | { status: "not_found"; query: string }
  | { status: "invalid"; query: string };

export const PRODUCT_ID_PATTERN = /^TGV-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

export const DEMO_IDS = {
  registered: "TGV-7F3K-29QX",
  inactive: "TGV-4B8M-61ZD",
  notFound: "TGV-0000-0000",
} as const;

const DEMO_PRODUCTS: Record<string, VerifiedProduct> = {
  [DEMO_IDS.registered]: {
    id: DEMO_IDS.registered,
    name: "Weekender Travel Bag — Cognac",
    manufacturer: "Halden & Co. Leatherworks",
    country: "Portugal",
    category: "Leather goods",
    batch: "HC-2026-11-A",
    registeredOn: "2026-11-04",
    tagType: "Secure NFC",
    description: "Full-grain vegetable-tanned leather, hand-stitched in Porto.",
  },
  [DEMO_IDS.inactive]: {
    id: DEMO_IDS.inactive,
    name: "Studio Headphones H2",
    manufacturer: "Nordlys Audio AB",
    country: "Sweden",
    category: "Consumer electronics",
    batch: "NA-2025-08-C",
    registeredOn: "2025-08-19",
    tagType: "NFC",
    description: "Closed-back studio monitoring headphones.",
  },
};

/** Uppercases, trims, strips whitespace and accepts IDs typed without dashes. */
export function normalizeProductId(input: string): string {
  const compact = input.toUpperCase().replace(/\s+/g, "").replace(/[^A-Z0-9-]/g, "");
  const bare = compact.replace(/-/g, "");
  if (/^TGV[A-Z0-9]{8}$/.test(bare)) {
    return `TGV-${bare.slice(3, 7)}-${bare.slice(7, 11)}`;
  }
  return compact;
}

export function lookupDemoProduct(input: string): VerificationResult {
  const id = normalizeProductId(input);
  if (!PRODUCT_ID_PATTERN.test(id)) return { status: "invalid", query: input.trim() };
  const product = DEMO_PRODUCTS[id];
  if (!product) return { status: "not_found", query: id };
  if (id === DEMO_IDS.inactive) {
    return { status: "inactive", product, reason: "Deactivated by the manufacturer" };
  }
  return { status: "registered", product };
}
