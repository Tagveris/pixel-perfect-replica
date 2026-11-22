import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, Panel, StatusBadge, TableWrap, noindexHead } from "@/components/app/AppUI";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DEMO_PRODUCTS, DEMO_SCANS } from "@/lib/demo-data";

export const Route = createFileRoute("/dashboard/scans")({
  head: () => noindexHead("Scan History — TAGVERIS Dashboard", "Verification scans of your products."),
  component: ScansPage,
});

function ScansPage() {
  return (
    <>
      <PageHeader title="Verification scan history" description="Every time a customer taps or scans one of your products." />
      <Panel>
        <TableWrap>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DEMO_SCANS.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="whitespace-nowrap font-mono text-xs">{s.at}</TableCell>
                  <TableCell>
                    <p className="font-medium">{DEMO_PRODUCTS.find((p) => p.id === s.productId)?.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">{s.productId}</p>
                  </TableCell>
                  <TableCell>{s.method}</TableCell>
                  <TableCell>{s.location}</TableCell>
                  <TableCell>{s.device}</TableCell>
                  <TableCell><StatusBadge status={s.result} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrap>
      </Panel>
    </>
  );
}
