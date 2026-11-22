import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Package, ScanLine, Tags } from "lucide-react";

import { MiniBars, PageHeader, Panel, StatCard, noindexHead } from "@/components/app/AppUI";
import { DEMO_AUDIT, DEMO_INVENTORY, DEMO_MANUFACTURERS, DEMO_SCAN_TREND } from "@/lib/demo-data";

export const Route = createFileRoute("/admin/")({
  head: () => noindexHead("Admin Overview — TAGVERIS", "Platform-wide manufacturers, products, tags and activity."),
  component: AdminOverview,
});

const fmt = (n: number) => n.toLocaleString("en-GB");

function AdminOverview() {
  const products = DEMO_MANUFACTURERS.reduce((a, m) => a + m.products, 0);
  const available = DEMO_INVENTORY.reduce((a, b) => a + b.available, 0);
  return (
    <>
      <PageHeader title="Platform overview" description="All manufacturers, products and tags across TAGVERIS." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Manufacturers" value={String(DEMO_MANUFACTURERS.length)} delta="1 pending approval" icon={Building2} />
        <StatCard label="Registered products" value={fmt(products)} icon={Package} />
        <StatCard label="Tags in stock" value={fmt(available)} icon={Tags} />
        <StatCard label="Scans (14 days)" value={fmt(DEMO_SCAN_TREND.reduce((a, b) => a + b, 0) * 12)} icon={ScanLine} />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Panel title="Platform verifications — last 14 days">
          <div className="p-5">
            <MiniBars values={DEMO_SCAN_TREND.map((v) => v * 12)} label="Platform scans per day over 14 days" />
          </div>
        </Panel>
        <Panel title="Recent audit events" action={<Link to="/admin/audit" className="text-xs font-medium text-teal-strong hover:underline">View log</Link>}>
          <ul className="divide-y">
            {DEMO_AUDIT.slice(0, 5).map((e) => (
              <li key={e.at + e.action} className="px-5 py-3">
                <p className="font-mono text-xs text-teal-strong">{e.action}</p>
                <p className="text-sm">{e.target}</p>
                <p className="text-xs text-muted-foreground">{e.actor} · {e.at}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
