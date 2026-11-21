import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  BadgeCheck,
  Calendar,
  Factory,
  Hash,
  Layers,
  MapPin,
  Nfc,
  QrCode,
  ScanLine,
  Search,
  SearchX,
  Camera,
} from "lucide-react";

import { DemoNotice } from "@/components/site/PageHero";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEMO_IDS, lookupDemoProduct, type VerificationResult, type VerifiedProduct } from "@/lib/verify";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/verify")({
  validateSearch: (search: Record<string, unknown>): { id?: string } => ({
    id: typeof search.id === "string" && search.id.length > 0 ? search.id : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Verify a Product — TAGVERIS" },
      {
        name: "description",
        content: "Check a product's TAGVERIS digital identity by scanning its QR code, tapping its NFC tag or entering its product ID.",
      },
      { property: "og:title", content: "Verify a product with TAGVERIS" },
      { property: "og:description", content: "Scan, tap or enter a product ID to view its digital identity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: VerifyPage,
});

function VerifyPage() {
  const { id } = Route.useSearch();
  const navigate = useNavigate({ from: "/verify" });
  const [value, setValue] = useState(id ?? "");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!id) {
      setResult(null);
      return;
    }
    setValue(id);
    setChecking(true);
    const t = setTimeout(() => {
      setResult(lookupDemoProduct(id));
      setChecking(false);
    }, 450);
    return () => clearTimeout(t);
  }, [id]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    navigate({ search: { id: value.trim() } });
  }

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-hero pb-28 pt-16 text-navy-foreground md:pt-24">
        <div className="absolute inset-0 bg-grid-light" aria-hidden />
        <div className="container-page relative text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-navy-foreground/15 bg-navy-foreground/5">
            <ScanLine className="h-8 w-8 text-teal" />
          </div>
          <h1 className="mt-6 text-4xl font-semibold md:text-5xl">Verify a product</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-navy-muted">
            Tap the NFC tag or scan the QR code on the product with your phone — or enter the product ID below.
          </p>
        </div>
      </section>

      <section className="relative -mt-20 pb-20">
        <div className="container-page max-w-3xl">
          <div className="rounded-3xl border bg-card p-6 shadow-elevated md:p-8">
            <form onSubmit={onSubmit} className="space-y-3">
              <Label htmlFor="product-id" className="text-sm font-medium">
                Product ID
              </Label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Hash className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="product-id"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="TGV-XXXX-XXXX"
                    autoComplete="off"
                    spellCheck={false}
                    className="h-12 pl-10 font-mono text-base uppercase tracking-wider"
                    aria-describedby="product-id-help"
                  />
                </div>
                <Button type="submit" size="xl" disabled={checking}>
                  <Search /> {checking ? "Checking…" : "Verify"}
                </Button>
              </div>
              <p id="product-id-help" className="text-xs text-muted-foreground">
                The ID is printed below the QR code or NFC symbol on the label.
              </p>
            </form>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-dashed p-4">
                <Camera className="h-5 w-5 text-teal-strong" />
                <div>
                  <p className="text-sm font-medium">Scan QR code</p>
                  <p className="text-xs text-muted-foreground">Open your phone camera and point it at the code.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-dashed p-4">
                <Nfc className="h-5 w-5 text-teal-strong" />
                <div>
                  <p className="text-sm font-medium">Tap NFC tag</p>
                  <p className="text-xs text-muted-foreground">Hold the top of your phone near the tag.</p>
                </div>
              </div>
            </div>

            <DemoNotice className="mt-6">
              The verification database is not connected yet. Results below are a preview of the interface. Try{" "}
              {[DEMO_IDS.registered, DEMO_IDS.inactive, DEMO_IDS.notFound].map((demoId, i) => (
                <span key={demoId}>
                  <button
                    type="button"
                    onClick={() => navigate({ search: { id: demoId } })}
                    className="font-mono font-medium underline underline-offset-2 hover:text-teal-strong"
                  >
                    {demoId}
                  </button>
                  {i < 2 ? ", " : "."}
                </span>
              ))}
            </DemoNotice>
          </div>

          <div aria-live="polite" className="mt-8">
            {checking && <ScanningState />}
            {!checking && result && <ResultCard result={result} />}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function ScanningState() {
  return (
    <div className="flex items-center gap-4 rounded-3xl border bg-card p-6">
      <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-teal-soft">
        <div className="absolute inset-x-0 top-0 h-1/2 animate-scan-line border-b-2 border-teal-strong" />
        <QrCode className="absolute inset-0 m-auto h-6 w-6 text-teal-strong" />
      </div>
      <p className="text-sm text-muted-foreground">Looking up product identity…</p>
    </div>
  );
}

function ResultCard({ result }: { result: VerificationResult }) {
  if (result.status === "invalid") {
    return (
      <StatusShell tone="warning" icon={AlertTriangle} title="That doesn't look like a product ID" demo>
        <p>
          TAGVERIS product IDs look like <span className="font-mono">TGV-XXXX-XXXX</span>. Please check the label and try again.
        </p>
      </StatusShell>
    );
  }
  if (result.status === "not_found") {
    return (
      <StatusShell tone="danger" icon={SearchX} title="Product not found" demo>
        <p>
          No registered product matches <span className="font-mono font-medium">{result.query}</span>. Check the ID for typos.
          If it is correct, the product may not be registered on TAGVERIS — contact the seller or manufacturer.
        </p>
      </StatusShell>
    );
  }
  if (result.status === "inactive") {
    return (
      <StatusShell tone="warning" icon={AlertTriangle} title="Inactive product identity" demo>
        <p>
          This ID exists but is no longer active ({result.reason.toLowerCase()}). This can happen when a product line is
          retired. If you just bought this item, contact the manufacturer.
        </p>
        <ProductDetails product={result.product} />
      </StatusShell>
    );
  }
  return (
    <StatusShell tone="success" icon={BadgeCheck} title="Registered product" demo>
      <p>This product is registered on TAGVERIS by its manufacturer.</p>
      <ProductDetails product={result.product} />
    </StatusShell>
  );
}

const tones = {
  success: { wrap: "border-success/30", head: "bg-success-soft text-success" },
  warning: { wrap: "border-warning/40", head: "bg-warning-soft text-warning" },
  danger: { wrap: "border-destructive/30", head: "bg-danger-soft text-destructive" },
};

function StatusShell({
  tone,
  icon: Icon,
  title,
  demo,
  children,
}: {
  tone: keyof typeof tones;
  icon: typeof BadgeCheck;
  title: string;
  demo?: boolean;
  children: React.ReactNode;
}) {
  const t = tones[tone];
  return (
    <div className={cn("animate-fade-up overflow-hidden rounded-3xl border-2 bg-card", t.wrap)}>
      <div className={cn("flex items-center justify-between gap-3 px-6 py-4", t.head)}>
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6" />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        {demo && (
          <span className="rounded border border-current/30 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider">
            Demo result
          </span>
        )}
      </div>
      <div className="space-y-6 p-6 text-muted-foreground">{children}</div>
    </div>
  );
}

function ProductDetails({ product }: { product: VerifiedProduct }) {
  const rows = [
    { icon: Factory, label: "Manufacturer", value: product.manufacturer },
    { icon: MapPin, label: "Country of origin", value: product.country },
    { icon: Layers, label: "Batch", value: product.batch },
    { icon: Calendar, label: "Registered", value: product.registeredOn },
    { icon: Nfc, label: "Tag type", value: product.tagType },
    { icon: Hash, label: "Product ID", value: product.id },
  ];
  return (
    <div className="rounded-2xl border bg-surface p-5 text-foreground">
      <p className="eyebrow text-muted-foreground">{product.category}</p>
      <h3 className="mt-1 text-xl font-semibold">{product.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.label} className="flex items-start gap-3">
            <r.icon className="mt-0.5 h-4 w-4 text-teal-strong" />
            <div>
              <dt className="text-xs text-muted-foreground">{r.label}</dt>
              <dd className={cn("text-sm font-medium", r.label === "Product ID" && "font-mono")}>{r.value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
