import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";

import { PageHeader, Panel, StatCard, StatusBadge, TableWrap, noindexHead } from "@/components/app/AppUI";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DEMO_PRODUCTS, DEMO_TAGS } from "@/lib/demo-data";
import { Nfc, QrCode, Tags } from "lucide-react";

export const Route = createFileRoute("/dashboard/tags")({
  head: () => noindexHead("Tags — TAGVERIS Dashboard", "NFC and QR tags in your account and their assigned products."),
  component: TagsPage,
});

function TagsPage() {
  return (
    <>
      <PageHeader
        title="NFC & QR tags"
        description="Tags registered to your account and the products they're linked to."
        actions={
          <Button asChild variant="outline">
            <Link to="/shop"><ShoppingBag /> Order tags</Link>
          </Button>
        }
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total tags" value={String(DEMO_TAGS.length)} icon={Tags} />
        <StatCard label="NFC / Secure NFC" value={String(DEMO_TAGS.filter((t) => t.type !== "QR").length)} icon={Nfc} />
        <StatCard label="QR" value={String(DEMO_TAGS.filter((t) => t.type === "QR").length)} icon={QrCode} />
      </div>
      <Panel>
        <TableWrap>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tag ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Assigned product</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DEMO_TAGS.map((t) => {
                const p = DEMO_PRODUCTS.find((x) => x.id === t.productId);
                return (
                  <TableRow key={t.id}>
                    <TableCell className="font-mono text-xs">{t.id}</TableCell>
                    <TableCell>{t.type}</TableCell>
                    <TableCell className="font-mono text-xs">{t.batch}</TableCell>
                    <TableCell>
                      {p ? (
                        <Link to="/dashboard/products/$productId" params={{ productId: p.id }} className="hover:underline">{p.name}</Link>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell><StatusBadge status={t.status} /></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableWrap>
      </Panel>
    </>
  );
}
