import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, Panel, StatusBadge, TableWrap, noindexHead } from "@/components/app/AppUI";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DEMO_MANUFACTURER, DEMO_SCANS } from "@/lib/demo-data";

export const Route = createFileRoute("/admin/activity")({
  head: () => noindexHead("Verification Activity — TAGVERIS Admin", "Platform-wide verification scans."),
  component: AdminActivity,
});

const COUNTRIES = [
  { c: "Germany", v: 31 },
  { c: "Portugal", v: 22 },
  { c: "France", v: 17 },
  { c: "Italy", v: 12 },
  { c: "Netherlands", v: 10 },
  { c: "Other", v: 8 },
];

function AdminActivity() {
  return (
    <>
      <PageHeader title="Verification activity" description="Scans across all manufacturers." />
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Panel title="Latest scans">
          <TableWrap>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DEMO_SCANS.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="whitespace-nowrap font-mono text-xs">{s.at}</TableCell>
                    <TableCell className="font-mono text-xs">{s.productId}</TableCell>
                    <TableCell>{DEMO_MANUFACTURER.name}</TableCell>
                    <TableCell>{s.location}</TableCell>
                    <TableCell><StatusBadge status={s.result} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrap>
        </Panel>
        <Panel title="Scans by country (%)">
          <ul className="space-y-4 p-5">
            {COUNTRIES.map((x) => (
              <li key={x.c}>
                <div className="flex justify-between text-sm">
                  <span>{x.c}</span>
                  <span className="font-mono">{x.v}%</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-gradient-teal" style={{ width: `${x.v * 3}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
