/**
 * DEMO DATA ONLY.
 * Every record here is fictional and exists to preview the dashboards until the
 * real database is connected. Do not treat any of it as live information.
 */

export type ProductStatus = "active" | "draft" | "inactive";
export type TagStatus = "assigned" | "unassigned" | "deactivated";
export type ScanResult = "verified" | "inactive" | "unknown";

export type DemoProduct = {
  id: string;
  name: string;
  sku: string;
  category: string;
  status: ProductStatus;
  tagId: string | null;
  tagType: "NFC" | "QR" | "Secure NFC";
  scans: number;
  createdAt: string;
  description: string;
};

export const DEMO_MANUFACTURER = {
  name: "Halden & Co. Leatherworks",
  contact: "Inês Halden",
  email: "operations@halden-demo.example",
  country: "Portugal",
  vat: "PT 000 000 000",
  plan: "Business",
};

export const DEMO_PRODUCTS: DemoProduct[] = [
  { id: "TGV-7F3K-29QX", name: "Weekender Travel Bag — Cognac", sku: "HC-WKD-COG", category: "Bags", status: "active", tagId: "NFC-424-000812", tagType: "Secure NFC", scans: 148, createdAt: "2026-11-04", description: "Full-grain vegetable-tanned leather, hand-stitched in Porto." },
  { id: "TGV-2M8P-51RT", name: "Card Holder — Black", sku: "HC-CRD-BLK", category: "Small leather goods", status: "active", tagId: "NFC-213-004511", tagType: "NFC", scans: 412, createdAt: "2026-10-21", description: "Slim four-slot card holder in pebbled calfskin." },
  { id: "TGV-9C1D-77LA", name: "Belt 35 mm — Tan", sku: "HC-BLT-TAN", category: "Belts", status: "active", tagId: "QR-000-019334", tagType: "QR", scans: 96, createdAt: "2026-10-12", description: "Solid brass buckle, single-piece bridle leather." },
  { id: "TGV-5H6J-08WE", name: "Messenger Bag — Olive", sku: "HC-MSG-OLV", category: "Bags", status: "draft", tagId: null, tagType: "Secure NFC", scans: 0, createdAt: "2026-11-15", description: "Waxed canvas body with leather trims." },
  { id: "TGV-3K4L-62PN", name: "Passport Cover — Navy", sku: "HC-PSP-NVY", category: "Small leather goods", status: "active", tagId: "NFC-213-004598", tagType: "NFC", scans: 57, createdAt: "2026-09-30", description: "Fits all EU passports, with two card slots." },
  { id: "TGV-8R2T-14YB", name: "Watch Strap 20 mm — Brown", sku: "HC-WST-BRN", category: "Accessories", status: "inactive", tagId: "QR-000-018870", tagType: "QR", scans: 23, createdAt: "2026-06-02", description: "Discontinued model, retired from verification." },
];

export const DEMO_TAGS = [
  { id: "NFC-424-000812", type: "Secure NFC", status: "assigned" as TagStatus, productId: "TGV-7F3K-29QX", batch: "B-2026-11-01" },
  { id: "NFC-213-004511", type: "NFC", status: "assigned" as TagStatus, productId: "TGV-2M8P-51RT", batch: "B-2026-10-03" },
  { id: "QR-000-019334", type: "QR", status: "assigned" as TagStatus, productId: "TGV-9C1D-77LA", batch: "B-2026-10-02" },
  { id: "NFC-213-004598", type: "NFC", status: "assigned" as TagStatus, productId: "TGV-3K4L-62PN", batch: "B-2026-10-03" },
  { id: "QR-000-018870", type: "QR", status: "deactivated" as TagStatus, productId: "TGV-8R2T-14YB", batch: "B-2026-06-01" },
  { id: "NFC-424-000813", type: "Secure NFC", status: "unassigned" as TagStatus, productId: null, batch: "B-2026-11-01" },
  { id: "NFC-424-000814", type: "Secure NFC", status: "unassigned" as TagStatus, productId: null, batch: "B-2026-11-01" },
  { id: "NFC-213-004599", type: "NFC", status: "unassigned" as TagStatus, productId: null, batch: "B-2026-10-03" },
];

export const DEMO_SCANS = [
  { id: "s1", at: "2026-11-20 09:12", productId: "TGV-2M8P-51RT", method: "NFC", location: "Lisbon, PT", device: "iOS", result: "verified" as ScanResult },
  { id: "s2", at: "2026-11-20 08:47", productId: "TGV-7F3K-29QX", method: "NFC", location: "Munich, DE", device: "Android", result: "verified" as ScanResult },
  { id: "s3", at: "2026-11-19 21:03", productId: "TGV-9C1D-77LA", method: "QR", location: "Lyon, FR", device: "iOS", result: "verified" as ScanResult },
  { id: "s4", at: "2026-11-19 17:40", productId: "TGV-8R2T-14YB", method: "QR", location: "Milan, IT", device: "Android", result: "inactive" as ScanResult },
  { id: "s5", at: "2026-11-19 12:15", productId: "TGV-3K4L-62PN", method: "NFC", location: "Amsterdam, NL", device: "iOS", result: "verified" as ScanResult },
  { id: "s6", at: "2026-11-18 19:58", productId: "TGV-2M8P-51RT", method: "NFC", location: "Madrid, ES", device: "Android", result: "verified" as ScanResult },
  { id: "s7", at: "2026-11-18 10:22", productId: "TGV-7F3K-29QX", method: "NFC", location: "Vienna, AT", device: "iOS", result: "verified" as ScanResult },
];

/** Scans per day, last 14 days (demo). */
export const DEMO_SCAN_TREND = [18, 22, 19, 27, 31, 26, 34, 29, 38, 41, 36, 44, 48, 52];

/* ---------- Admin demo data ---------- */

export const DEMO_MANUFACTURERS = [
  { id: "m1", name: "Halden & Co. Leatherworks", country: "PT", plan: "Business", products: 6, tags: 8, status: "active", joined: "2026-09-12" },
  { id: "m2", name: "Nordlys Audio AB", country: "SE", plan: "Enterprise", products: 214, tags: 2400, status: "active", joined: "2025-07-03" },
  { id: "m3", name: "Vinhos Serra Alta", country: "PT", plan: "Business", products: 38, tags: 5000, status: "active", joined: "2026-02-18" },
  { id: "m4", name: "Atelier Morelle", country: "FR", plan: "Starter", products: 12, tags: 100, status: "pending", joined: "2026-11-17" },
  { id: "m5", name: "Kessler Uhrenmanufaktur", country: "DE", plan: "Enterprise", products: 91, tags: 1200, status: "active", joined: "2025-11-29" },
  { id: "m6", name: "Bianchi Cosmetici", country: "IT", plan: "Starter", products: 4, tags: 100, status: "suspended", joined: "2026-04-08" },
];

export const DEMO_INVENTORY = [
  { batch: "B-2026-11-01", type: "Secure NFC", chip: "NTAG 424 DNA", total: 5000, assigned: 1820, available: 3180, received: "2026-11-02" },
  { batch: "B-2026-10-03", type: "NFC", chip: "NTAG213", total: 20000, assigned: 14210, available: 5790, received: "2026-10-14" },
  { batch: "B-2026-10-02", type: "QR", chip: "—", total: 50000, assigned: 31400, available: 18600, received: "2026-10-09" },
  { batch: "B-2026-09-01", type: "NFC", chip: "NTAG215", total: 10000, assigned: 9980, available: 20, received: "2026-09-05" },
];

export const DEMO_AUDIT = [
  { at: "2026-11-20 09:30", actor: "admin@tagveris.com", action: "tag.batch.assign", target: "B-2026-11-01 → Halden & Co. (50)", ip: "10.0.x.x" },
  { at: "2026-11-20 08:02", actor: "system", action: "manufacturer.registered", target: "Atelier Morelle", ip: "—" },
  { at: "2026-11-19 16:44", actor: "ops@tagveris.com", action: "product.deactivate", target: "TGV-8R2T-14YB", ip: "10.0.x.x" },
  { at: "2026-11-19 11:10", actor: "admin@tagveris.com", action: "manufacturer.suspend", target: "Bianchi Cosmetici", ip: "10.0.x.x" },
  { at: "2026-11-18 14:27", actor: "ops@tagveris.com", action: "tag.batch.receive", target: "B-2026-11-01 (5,000)", ip: "10.0.x.x" },
  { at: "2026-11-18 09:05", actor: "admin@tagveris.com", action: "plan.change", target: "Kessler Uhrenmanufaktur → Enterprise", ip: "10.0.x.x" },
];
