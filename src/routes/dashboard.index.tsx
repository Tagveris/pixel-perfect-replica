import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Package, PlusCircle, ScanLine, Tags } from "lucide-react";

import { MiniBars, PageHeader, Panel, ProductThumb, StatCard, StatusBadge, noindexHead } from "@/components/app/AppUI";
import { Button } from "@/components/ui/button";
import { DEMO_PRODUCTS, DEMO_SCANS, DEMO_SCAN_TREND, DEMO_TAGS } from "@/lib/demo-data";

export const Route = createFileRoute("/dashboard/")({
  head: () => noindexHead("Overview — TAGVERIS Dashboard", "Overview of products, tags and verification activity."),
  component: DashboardOverview,
});

function DashboardOverview() {
  const totalScans = DEMO_SCAN_TREND.reduce((a, b) => a + b, 0);
  const verified = DEMO_SCANS.filter((s) => s.result === "verified").length;
  return (
    <>
      <PageHeader
        title="Good morning, Inês"
        description="Here's what's happening with your products."
        actions={
          <Button asChild>
            <Link to="/dashboard/products/new">
              <PlusCircle /> Add product
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Registered products" value={String(DEMO_PRODUCTS.length)} delta="+2 this month" icon={Package} />
        <StatCard label="Assigned tags" value={String(DEMO_TAGS.filter((t) => t.status === "assigned").length)} delta={`${DEMO_TAGS.filter((t) => t.status === "unassigned").length} available`} icon={Tags} />
        <StatCard label="Scans (14 days)" value={String(totalScans)} delta="+18% vs previous" icon={ScanLine} />
        <StatCard label="Verified scans" value={`${Math.round((verified / DEMO_SCANS.length) * 100)}%`} icon={BadgeCheck} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Panel title="Verification scans — last 14 days">
          <div className="p-5">
            <MiniBars values={DEMO_SCAN_TREND} label="Scans per day over the last 14 days" />
            <div className="mt-3 flex justify-between font-mono text-[10px] text-muted-foreground">
              <span>7 Nov</span>
              <span>Today</span>
            </div>
          </div>
        </Panel>

        <Panel
          title="Recent scans"
          action={
            <Link to="/dashboard/scans" className="text-xs font-medium text-teal-strong hover:underline">
              View all
            </Link>
          }
        >
          <ul className="divide-y">
            {DEMO_SCANS.slice(0, 5).map((s) => {
              const p = DEMO_PRODUCTS.find((x) => x.id === s.productId);
              return (
                <li key={s.id} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{p?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.location} · {s.method} · {s.at.slice(11)}
                    </p>
                  </div>
                  <StatusBadge status={s.result} />
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>

      <Panel
        className="mt-6"
        title="Top products"
        action={
          <Link to="/dashboard/products" className="inline-flex items-center gap-1 text-xs font-medium text-teal-strong hover:underline">
            All products <ArrowRight className="h-3 w-3" />
          </Link>
        }
      >
        <ul className="divide-y">
          {[...DEMO_PRODUCTS].sort((a, b) => b.scans - a.scans).slice(0, 4).map((p) => (
            <li key={p.id}>
              <Link
                to="/dashboard/products/$productId"
                params={{ productId: p.id }}
                className="flex items-center gap-4 px-5 py-3 hover:bg-muted/50"
              >
                <ProductThumb />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">{p.id}</p>
                </div>
                <span className="hidden font-mono text-sm sm:block">{p.scans} scans</span>
                <StatusBadge status={p.status} />
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
