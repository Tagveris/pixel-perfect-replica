import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Fingerprint, KeyRound, Nfc, QrCode, ScanLine, ShieldCheck, ClipboardList } from "lucide-react";

import manufacturerImage from "@/assets/manufacturer-labeling.jpg";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — NFC tags, QR identification & digital product identity | TAGVERIS" },
      {
        name: "description",
        content:
          "NFC product tags, QR identification, digital product identities and product registration & verification from TAGVERIS.",
      },
      { property: "og:title", content: "TAGVERIS Solutions" },
      { property: "og:description", content: "NFC tags, QR identification and digital product identities for manufacturers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SolutionsPage,
});

const SOLUTIONS = [
  {
    id: "nfc",
    icon: Nfc,
    eyebrow: "01 — NFC product tags",
    title: "Tap-to-verify NFC tags",
    text: "NFC chips are read by holding a smartphone close to the product. Each TAGVERIS NFC tag stores a unique ID that opens the product's identity page — no app download required.",
    points: ["Stickers, labels and rugged tags", "Works with modern iOS & Android phones", "Can be hidden inside packaging or labels"],
  },
  {
    id: "qr",
    icon: QrCode,
    eyebrow: "02 — QR product identification",
    title: "Serialised QR codes",
    text: "Every QR label carries its own unique serial, not a shared link. That means each unit you produce has an individual identity, readable with any smartphone camera.",
    points: ["Unique code per unit", "Lowest cost for high volumes", "Can be combined with NFC on the same label"],
  },
  {
    id: "identity",
    icon: Fingerprint,
    eyebrow: "03 — Digital product identity",
    title: "A living page for every product",
    text: "The digital identity is the product's page on TAGVERIS: name, images, manufacturer, origin, batch and any information you choose to share. You can update it at any time.",
    points: ["Manufacturer-controlled content", "Batch, origin and material details", "Status: registered, inactive or retired"],
  },
  {
    id: "registration",
    icon: ClipboardList,
    eyebrow: "04 — Registration & verification",
    title: "Register once, verify anywhere",
    text: "Manufacturers register products and assign tags in their dashboard. Consumers verify by tapping, scanning, or entering the product ID on tagveris.com.",
    points: ["Single or bulk product registration", "Tag-to-product assignment", "Verification history per product"],
  },
];

function SolutionsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Solutions"
        title="The building blocks of product identity."
        description="Physical tags, a digital identity for every product, and a simple way for anyone to verify it. Choose the technology that fits your product and volume."
      >
        <div className="flex flex-wrap gap-2">
          {SOLUTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-navy-foreground/15 bg-navy-foreground/5 px-4 py-2 text-sm font-medium text-navy-foreground hover:bg-navy-foreground/10"
            >
              {s.title}
            </a>
          ))}
        </div>
      </PageHero>

      <section className="py-20 md:py-28">
        <div className="container-page space-y-6">
          {SOLUTIONS.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className="grid scroll-mt-24 gap-8 rounded-3xl border bg-card p-8 shadow-soft md:grid-cols-[auto_1fr_1fr] md:p-10"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-teal-soft text-teal-strong">
                <s.icon className="h-7 w-7" />
              </div>
              <div>
                <p className="eyebrow text-muted-foreground">{s.eyebrow}</p>
                <h2 className="mt-3 text-2xl font-semibold md:text-3xl">{s.title}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
              <ul className="space-y-3 self-center md:border-l md:pl-8">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal-strong" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Future authentication */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Badge variant="teal" className="mb-4">On the roadmap</Badge>
            <SectionHeading
              title="Secure authentication, ready when you are."
              description="Registration tells customers a product is known to the manufacturer. Secure NFC chips go further: they can prove a tag is genuine and has not been cloned."
            />
            <div className="mt-10 space-y-6">
              {[
                { icon: KeyRound, t: "Cryptographic tag signatures", d: "Secure NFC chips (such as NTAG 424 DNA) generate a fresh, signed code on every tap, which can be validated server-side." },
                { icon: ShieldCheck, t: "Clone & tamper detection", d: "Detect duplicated tags and tamper-evident seals being broken." },
                { icon: ScanLine, t: "Scan anomaly alerts", d: "Flag unusual verification patterns, such as one ID scanned in many countries at once." },
              ].map((f) => (
                <div key={f.t} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-navy text-navy-foreground">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{f.t}</p>
                    <p className="text-muted-foreground">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              These capabilities are planned and not yet live. Our Secure NFC tags are prepared for them today.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-elevated">
            <img
              src={manufacturerImage}
              alt="A gloved hand applying an NFC label to a product box on a production line"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page flex flex-col items-start justify-between gap-6 rounded-3xl border p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">Ready to tag your first products?</h2>
            <p className="mt-2 text-muted-foreground">Order sample packs or talk to us about bulk volumes.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/shop">
                Visit the shop <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/manufacturers">For manufacturers</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
