import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  ClipboardCheck,
  Fingerprint,
  Layers,
  Nfc,
  QrCode,
  ScanLine,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tag,
  TrendingUp,
  Users,
} from "lucide-react";

import heroImage from "@/assets/hero-nfc-tap.jpg";
import { IdentityPhone } from "@/components/site/IdentityPhone";
import { SectionHeading } from "@/components/site/PageHero";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { MerchSection } from "@/components/site/MerchSection";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TAGVERIS — NFC & QR product identity for European brands" },
      {
        name: "description",
        content:
          "Connect every physical product to a unique digital identity. TAGVERIS NFC and QR tags let consumers verify products with a tap or scan.",
      },
      { property: "og:title", content: "TAGVERIS — NFC & QR product identity" },
      {
        property: "og:description",
        content: "Connect every physical product to a unique, verifiable digital identity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const INDUSTRIES = [
  "Fashion & leather",
  "Wine & spirits",
  "Cosmetics",
  "Watches & jewellery",
  "Consumer electronics",
  "Spare parts",
];

const STEPS = [
  {
    icon: Tag,
    title: "Order tags",
    text: "Choose NFC stickers, labels, QR codes or secure NFC tags — individually or in bulk.",
  },
  {
    icon: ClipboardCheck,
    title: "Register products",
    text: "Create each product in your TAGVERIS dashboard with images, origin and details.",
  },
  {
    icon: Layers,
    title: "Attach & link",
    text: "Apply the tag to the product. Its unique ID is linked to that product's digital identity.",
  },
  {
    icon: Smartphone,
    title: "Tap or scan",
    text: "Consumers tap the NFC tag or scan the QR code to open the product's identity page.",
  },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero text-navy-foreground">
        <div className="absolute inset-0 bg-grid-light" aria-hidden />
        <div className="container-page relative grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:py-28">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/15 bg-navy-foreground/5 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
              <span className="eyebrow text-navy-muted">European product identity platform</span>
            </p>
            <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.04] sm:text-5xl lg:text-[4.1rem]">
              Every product,
              <br />
              a <span className="text-teal">verifiable</span> digital identity.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-muted">
              TAGVERIS connects physical products to unique digital identities through NFC and QR
              tags. Manufacturers register. Consumers tap or scan. Everyone knows what's real.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/solutions">
                  Explore Solutions <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline-light" size="xl">
                <Link to="/register">Register Your Products</Link>
              </Button>
              <Button asChild variant="outline-light" size="xl">
                <Link to="/verify">
                  <ScanLine /> Verify Product
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl animate-fade-up [animation-delay:150ms]">
            <div className="overflow-hidden rounded-3xl border border-navy-foreground/10 shadow-elevated">
              <img
                src={heroImage}
                alt="A smartphone tapping an NFC tag attached to a premium product box"
                className="aspect-[4/3] w-full object-cover"
                width={1536}
                height={1024}
              />
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="border-b bg-background">
        <div className="container-page flex flex-col gap-4 py-8 md:flex-row md:items-center md:gap-10">
          <p className="eyebrow shrink-0 text-muted-foreground">Built for</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium text-foreground/70">
            {INDUSTRIES.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONCEPT */}
      <section className="py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="The concept"
            title="One tag. One identity. Verified in seconds."
            description="Each TAGVERIS tag carries a unique ID. Once you register a product and attach a tag, that physical item is permanently linked to its own digital product identity."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Nfc,
                title: "Physical tag",
                text: "An NFC chip or serialised QR code applied to the product or its packaging.",
              },
              {
                icon: Fingerprint,
                title: "Digital identity",
                text: "A product page with manufacturer, origin, batch and product details — managed by you.",
              },
              {
                icon: ShieldCheck,
                title: "Instant verification",
                text: "Anyone with a smartphone can check whether a product is registered — no app required.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="group relative rounded-2xl border bg-card p-7 shadow-soft transition-shadow hover:shadow-elevated"
              >
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <div className="mt-6 grid h-12 w-12 place-items-center rounded-xl bg-teal-soft text-teal-strong transition-colors group-hover:bg-gradient-teal group-hover:text-teal-foreground">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative overflow-hidden bg-surface py-20 md:py-28">
        <div className="absolute inset-0 bg-grid-dark" aria-hidden />
        <div className="container-page relative grid items-center gap-16 lg:grid-cols-[1fr_auto]">
          <div>
            <SectionHeading
              eyebrow="How it works"
              title="From production line to the customer's phone."
              description="NFC and QR identification work with the smartphones people already own. A tap or a scan opens the product's identity page in the browser."
            />
            <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {STEPS.map((step, i) => (
                <li key={step.title} className="relative">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-navy font-mono text-sm font-medium text-navy-foreground">
                      {i + 1}
                    </span>
                    <step.icon className="h-5 w-5 text-teal-strong" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted-foreground">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative mx-auto">
            <div className="absolute -inset-10 rounded-full bg-teal/20 blur-3xl" aria-hidden />
            <IdentityPhone className="relative" />
          </div>
        </div>
      </section>

      {/* NFC vs QR */}
      <section className="py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Two technologies, one platform"
            title="NFC and QR, working together."
            align="center"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl bg-hero p-8 text-navy-foreground md:p-10">
              <div className="absolute inset-0 bg-grid-light" aria-hidden />
              <div className="relative">
                <Nfc className="h-9 w-9 text-teal" />
                <h3 className="mt-6 text-2xl font-semibold">NFC tags</h3>
                <p className="mt-3 leading-relaxed text-navy-muted">
                  A small chip read by tapping a smartphone. Hard to copy, invisible when embedded, and
                  ready for secure cryptographic authentication with dedicated chips.
                </p>
                <ul className="mt-6 space-y-2 text-sm">
                  {["Tap-to-open on modern iOS & Android", "Secure chip options", "Embeddable in labels or packaging"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-teal" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rounded-3xl border bg-card p-8 shadow-soft md:p-10">
              <QrCode className="h-9 w-9 text-navy" />
              <h3 className="mt-6 text-2xl font-semibold">QR identification</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                A serialised code any camera can read. The most accessible, lowest-cost way to give
                every unit a digital identity — perfect for high volumes.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {["Works with any smartphone camera", "Lowest cost per unit", "Printable on existing labels"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-teal-strong" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-t bg-gradient-surface py-20 md:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-navy text-navy-foreground">
                <Boxes className="h-5 w-5" />
              </span>
              <p className="eyebrow text-teal-strong">For manufacturers</p>
            </div>
            <h3 className="mt-5 text-3xl font-semibold">Protect your brand and know your products.</h3>
            <ul className="mt-8 space-y-5">
              {[
                { icon: ShieldCheck, t: "Brand protection", d: "Give customers a simple way to check that a product is registered by you." },
                { icon: TrendingUp, t: "Scan insights", d: "See where and when your products are verified across markets." },
                { icon: Sparkles, t: "Richer product stories", d: "Share origin, materials, care and warranty on every item's page." },
              ].map((b) => (
                <li key={b.t} className="flex gap-4">
                  <b.icon className="mt-1 h-5 w-5 shrink-0 text-teal-strong" />
                  <div>
                    <p className="font-semibold">{b.t}</p>
                    <p className="text-muted-foreground">{b.d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8" size="lg">
              <Link to="/manufacturers">
                For manufacturers <ArrowRight />
              </Link>
            </Button>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-teal text-teal-foreground">
                <Users className="h-5 w-5" />
              </span>
              <p className="eyebrow text-teal-strong">For consumers</p>
            </div>
            <h3 className="mt-5 text-3xl font-semibold">Confidence with a single tap.</h3>
            <ul className="mt-8 space-y-5">
              {[
                { icon: Smartphone, t: "No app needed", d: "Tap or scan with your phone and the product page opens in your browser." },
                { icon: BadgeCheck, t: "Clear answers", d: "See instantly whether a product is registered, inactive or unknown." },
                { icon: Fingerprint, t: "Real product details", d: "Manufacturer, origin and product information straight from the source." },
              ].map((b) => (
                <li key={b.t} className="flex gap-4">
                  <b.icon className="mt-1 h-5 w-5 shrink-0 text-teal-strong" />
                  <div>
                    <p className="font-semibold">{b.t}</p>
                    <p className="text-muted-foreground">{b.d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-8" size="lg">
              <Link to="/verify">
                <ScanLine /> Verify a product
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <MerchSection />
    </SiteLayout>
  );
}
