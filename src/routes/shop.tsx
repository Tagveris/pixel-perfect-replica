import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Minus, Plus, ShoppingBag, Truck, Package, Headset } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { CATALOG, formatEuro, type CatalogProduct } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop NFC stickers, labels, QR labels & secure tags | TAGVERIS" },
      {
        name: "description",
        content: "NFC stickers, NFC product labels, QR identity labels and secure NFC tags for product identification.",
      },
      { property: "og:title", content: "TAGVERIS Shop — NFC & QR tags" },
      { property: "og:description", content: "Tags and labels that connect your products to the TAGVERIS platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

const FILTERS = ["All", "NFC", "QR", "Secure NFC"] as const;

function ShopPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const products = filter === "All" ? CATALOG : CATALOG.filter((p) => p.category === filter);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Shop"
        title="Tags & labels for every product."
        description="Every tag ships with a unique ID, ready to link to your products in the TAGVERIS dashboard."
      />

      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div role="tablist" aria-label="Filter products" className="inline-flex rounded-lg border bg-surface p-1">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                    filter === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Prices are indicative placeholders, excl. VAT. Online payment is not active yet.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-16 grid gap-6 rounded-3xl border bg-surface p-8 md:grid-cols-3">
            {[
              { icon: Package, t: "Bulk & custom orders", d: "Volumes from 1,000 to 1,000,000+ with custom printing." },
              { icon: Truck, t: "EU-wide shipping", d: "Shipped from Europe to manufacturers across the EU." },
              { icon: Headset, t: "Setup support", d: "Help choosing the right tag for your material and process." },
            ].map((f) => (
              <div key={f.t} className="flex gap-4">
                <f.icon className="mt-0.5 h-6 w-6 shrink-0 text-teal-strong" />
                <div>
                  <p className="font-semibold">{f.t}</p>
                  <p className="text-sm text-muted-foreground">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function ProductCard({ product }: { product: CatalogProduct }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-soft transition-shadow hover:shadow-elevated">
      <div className="relative overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        {product.badge && <Badge className="absolute left-3 top-3">{product.badge}</Badge>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-teal-strong">{product.category}</p>
        <h2 className="mt-2 text-lg font-semibold leading-tight">{product.name}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        <ul className="mt-4 space-y-1.5 text-sm">
          {product.specs.map((s) => (
            <li key={s} className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-teal-strong" /> {s}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-xl font-semibold">{formatEuro(product.priceCents)}</p>
              <p className="text-xs text-muted-foreground">{product.unit}</p>
            </div>
            <div className="flex items-center rounded-md border">
              <button
                className="grid h-8 w-8 place-items-center hover:bg-muted"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label={`Decrease quantity of ${product.name}`}
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-7 text-center font-mono text-sm">{qty}</span>
              <button
                className="grid h-8 w-8 place-items-center hover:bg-muted"
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                aria-label={`Increase quantity of ${product.name}`}
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <Button
            className="mt-4 w-full"
            onClick={() => {
              add(product.id, qty);
              setQty(1);
            }}
          >
            <ShoppingBag /> Add to cart
          </Button>
        </div>
      </div>
    </article>
  );
}
