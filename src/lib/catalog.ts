import nfcStickers from "@/assets/shop-nfc-stickers.jpg";
import nfcLabels from "@/assets/shop-nfc-labels.jpg";
import qrLabels from "@/assets/shop-qr-labels.jpg";
import secureTags from "@/assets/shop-secure-tags.jpg";

export type CatalogProduct = {
  id: string;
  name: string;
  category: "NFC" | "QR" | "Secure NFC";
  tagline: string;
  description: string;
  image: string;
  /** Placeholder price per pack in EUR cents. Not a real offer yet. */
  priceCents: number;
  unit: string;
  specs: string[];
  badge?: string;
};

export const CATALOG: CatalogProduct[] = [
  {
    id: "nfc-stickers",
    name: "NFC Stickers",
    category: "NFC",
    tagline: "Round adhesive tags for everyday products",
    description:
      "Thin, flexible NFC stickers that link any product to its TAGVERIS digital identity with a single tap.",
    image: nfcStickers,
    priceCents: 3900,
    unit: "Pack of 100",
    specs: ["NTAG213 chip", "Ø 25 mm", "Paper face, permanent adhesive"],
  },
  {
    id: "nfc-labels",
    name: "NFC Product Labels",
    category: "NFC",
    tagline: "Printable labels on a roll for production lines",
    description:
      "Rectangular NFC labels supplied on rolls for fast manual or automated application during packaging.",
    image: nfcLabels,
    priceCents: 11900,
    unit: "Roll of 250",
    specs: ["NTAG215 chip", "50 × 30 mm", "Thermal-transfer printable"],
    badge: "Best for production",
  },
  {
    id: "qr-labels",
    name: "QR Identity Labels",
    category: "QR",
    tagline: "Unique QR codes, pre-linked to your account",
    description:
      "Serialised QR labels that any smartphone camera can scan — the most accessible way to start.",
    image: qrLabels,
    priceCents: 2900,
    unit: "500 labels",
    specs: ["Unique serial per label", "20 × 20 mm", "Matte, scratch-resistant"],
  },
  {
    id: "secure-tags",
    name: "Secure NFC Tags",
    category: "Secure NFC",
    tagline: "Durable tags prepared for cryptographic authentication",
    description:
      "Epoxy-sealed tags with a secure NFC chip, built for high-value goods and future authentication features.",
    image: secureTags,
    priceCents: 14900,
    unit: "Pack of 50",
    specs: ["NTAG 424 DNA chip", "Epoxy, IP67", "Tamper-evident option"],
    badge: "Authentication-ready",
  },
];

export function getCatalogProduct(id: string) {
  return CATALOG.find((p) => p.id === id);
}

export function formatEuro(cents: number) {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(cents / 100);
}
