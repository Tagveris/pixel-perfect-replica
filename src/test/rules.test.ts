import { describe, expect, it } from "vitest";

import { addToLines, cartSubtotalCents, setLineQuantity } from "@/lib/cart";
import { DEMO_IDS, lookupDemoProduct, normalizeProductId } from "@/lib/verify";

describe("demo product verification", () => {
  it("shows a registered product for the registered demo ID", () => {
    expect(lookupDemoProduct(DEMO_IDS.registered).status).toBe("registered");
  });
  it("shows an inactive product for the inactive demo ID", () => {
    expect(lookupDemoProduct(DEMO_IDS.inactive).status).toBe("inactive");
  });
  it("reports not found for a well-formed unknown ID", () => {
    expect(lookupDemoProduct("TGV-0000-0000").status).toBe("not_found");
  });
  it("rejects input that is not a product ID", () => {
    expect(lookupDemoProduct("hello").status).toBe("invalid");
  });
  it("accepts lowercase IDs typed without dashes", () => {
    expect(normalizeProductId("tgv7f3k29qx")).toBe("TGV-7F3K-29QX");
  });
});

describe("cart", () => {
  it("adds up placeholder prices by quantity", () => {
    const lines = addToLines(addToLines([], "nfc-stickers", 2), "qr-labels", 1);
    expect(cartSubtotalCents(lines)).toBe(2 * 3900 + 2900);
  });
  it("removes a line when quantity drops to zero", () => {
    expect(setLineQuantity([{ productId: "qr-labels", quantity: 1 }], "qr-labels", 0)).toEqual([]);
  });
});
