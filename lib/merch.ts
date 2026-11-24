/**
 * TAGVERIS branded merchandise data.
 *
 * This is BRAND REPRESENTATION, not a separate business and not a shop.
 * No prices, no cart, no payments.
 *
 * Copy is in English to match the rest of the site (the site is English;
 * only the chat assistant is bilingual).
 */

export const MERCH_CONTACT_EMAIL = "tavodangus@gmail.com";

export interface MerchItem {
  id: string;
  name: string;
  description: string;
  /** Short technical label under the name. */
  tag: string;
  /** Illustration variant, matched by MerchIllustration. */
  illustration: "keychain" | "pen" | "card";
}

export const MERCH_ITEMS: MerchItem[] = [
  {
    id: "nfc-keychain",
    name: "NFC keychain",
    description:
      "A branded keychain with an embedded NFC chip. Hold a phone near it and the TAGVERIS site opens — a simple way to show how the technology works.",
    tag: "NFC · PVC",
    illustration: "keychain",
  },
  {
    id: "pen",
    name: "TAGVERIS pen",
    description:
      "A metal pen with an engraved logo. Everyday branded stationery for meetings, trade fairs and partner gifts.",
    tag: "Metal · engraved",
    illustration: "pen",
  },
  {
    id: "card",
    name: "Branded QR card",
    description:
      "A compact card with a QR code pointing to the TAGVERIS verification page. A practical demo tool for sales conversations.",
    tag: "Card stock · QR",
    illustration: "card",
  },
];

/** mailto link with a prepared subject line. */
export function merchMailto(subject = "TAGVERIS branded merchandise"): string {
  return `mailto:${MERCH_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
