import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Boxes, Check, ClipboardList, Globe2, PackageCheck, ShieldCheck, Tags } from "lucide-react";

import manufacturerImage from "@/assets/manufacturer-labeling.jpg";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/manufacturers")({
  head: () => ({
    meta: [
      { title: "For Manufacturers — Register products & order tags in bulk | TAGVERIS" },
      {
        name: "description",
        content:
          "Register products, order NFC and QR tags in bulk and give every item a verifiable digital identity. Plans for every production volume.",
      },
      { property: "og:title", content: "TAGVERIS for Manufacturers" },
      { property: "og:description", content: "Product registration, bulk tag ordering and verification insights." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ManufacturersPage,
});

const PLANS = [
  {
    name: "Starter",
    price: "€0",
    period: "/ month",
    description: "Try TAGVERIS with a small product range.",
    features: ["Up to 50 registered products", "NFC & QR tag support", "Standard identity pages", "Basic scan counts"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Business",
    price: "€49",
    period: "/ month",
    description: "For growing brands with active product lines.",
    features: ["Up to 5,000 registered products", "Bulk import & tag assignment", "Branded identity pages", "Scan history & locations", "Priority email support"],
    cta: "Choose Business",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For high volumes and integrations.",
    features: ["Unlimited products", "Secure NFC authentication (roadmap)", "Integration support", "Dedicated account manager", "Custom tag production"],
    cta: "Contact sales",
    featured: false,
  },
];

function ManufacturersPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="For manufacturers"
        title="Your products, identified and verifiable."
        description="Register your products, attach TAGVERIS tags and give every customer a direct line to the source — with insight into where your products are scanned."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="hero" size="xl">
            <Link to="/register">
              Register as manufacturer <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline-light" size="xl">
            <a href="#pricing">See plans</a>
          </Button>
        </div>
      </PageHero>

      {/* Benefits */}
      <section className="py-20 md:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="Why TAGVERIS" title="Built around how manufacturers work." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, t: "Brand protection", d: "Customers can check that a product is registered by you, at the point of sale or at home." },
              { icon: BarChart3, t: "Scan insights", d: "Understand where, when and how often products are verified." },
              { icon: Globe2, t: "Cross-border ready", d: "Designed for European markets, with a path to international expansion." },
              { icon: PackageCheck, t: "Fits your line", d: "Tags for paper, plastic, glass, leather and metal — applied by hand or machine." },
            ].map((b) => (
              <div key={b.t} className="rounded-2xl border bg-card p-6 shadow-soft">
                <b.icon className="h-7 w-7 text-teal-strong" />
                <h3 className="mt-5 text-lg font-semibold">{b.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration + bulk */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl shadow-elevated">
            <img
              src={manufacturerImage}
              alt="Production line worker applying NFC labels to product boxes"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-3">
                <ClipboardList className="h-6 w-6 text-teal-strong" />
                <p className="eyebrow text-teal-strong">Product registration</p>
              </div>
              <h2 className="mt-4 text-3xl font-semibold">Register products in minutes.</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Add products one by one or import a full catalogue. Each product gets a unique TAGVERIS ID
                and an identity page with your images, origin, materials and batch details.
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {["Single or CSV bulk import", "Images & product details", "Batch & SKU tracking", "Activate or retire anytime"].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-teal-strong" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <Boxes className="h-6 w-6 text-teal-strong" />
                <p className="eyebrow text-teal-strong">Bulk tag ordering</p>
              </div>
              <h2 className="mt-4 text-3xl font-semibold">Tags at production scale.</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Order tags in batches. Every tag is pre-registered to your account, so you can assign
                whole batches to products from the dashboard — no manual encoding.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { v: "1k+", l: "Minimum bulk order" },
                  { v: "4", l: "Tag formats" },
                  { v: "EU", l: "Shipping region" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl border bg-card p-4">
                    <p className="font-display text-2xl font-semibold text-navy">{s.v}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-20 py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Plans"
            title="Simple plans that grow with you."
            description="Indicative pricing — final plans will be confirmed at launch. Tags are ordered separately."
            align="center"
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "relative flex flex-col rounded-3xl border p-8",
                  plan.featured ? "bg-hero text-navy-foreground shadow-elevated" : "bg-card shadow-soft",
                )}
              >
                {plan.featured && (
                  <Badge variant="teal" className="absolute right-6 top-6">
                    Most popular
                  </Badge>
                )}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className={cn("mt-2 text-sm", plan.featured ? "text-navy-muted" : "text-muted-foreground")}>
                  {plan.description}
                </p>
                <p className="mt-6">
                  <span className="font-display text-4xl font-semibold">{plan.price}</span>
                  <span className={cn("ml-1 text-sm", plan.featured ? "text-navy-muted" : "text-muted-foreground")}>
                    {plan.period}
                  </span>
                </p>
                <ul className="mt-8 space-y-3 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className={cn("mt-0.5 h-4 w-4 shrink-0", plan.featured ? "text-teal" : "text-teal-strong")} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  {plan.name === "Enterprise" ? (
                    <Button asChild variant="outline" size="lg" className="w-full">
                      <a href="mailto:sales@tagveris.com">{plan.cta}</a>
                    </Button>
                  ) : (
                    <Button asChild variant={plan.featured ? "hero" : "default"} size="lg" className="w-full">
                      <Link to="/register">{plan.cta}</Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <div className="flex flex-col items-start gap-6 rounded-3xl border bg-surface p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div className="flex items-start gap-4">
              <Tags className="mt-1 h-8 w-8 text-teal-strong" />
              <div>
                <h2 className="text-2xl font-semibold">Open your manufacturer account</h2>
                <p className="mt-1 text-muted-foreground">Manufacturer registration opens with our launch — reserve your place now.</p>
              </div>
            </div>
            <Button asChild size="xl">
              <Link to="/register">
                Register as manufacturer <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
