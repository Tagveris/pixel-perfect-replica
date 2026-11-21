import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusCircle, Search } from "lucide-react";

import { PageHeader, Panel, ProductThumb, StatusBadge, TableWrap, noindexHead } from "@/components/app/AppUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DEMO_PRODUCTS, type ProductStatus } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/products/")({
  head: () => noindexHead("Products — TAGVERIS Dashboard", "Your registered products and their tags."),
  component: ProductsPage,
});

const FILTERS: Array<"all" | ProductStatus> = ["all", "active", "draft", "inactive"];

function ProductsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<(typeof FILTERS)[number]>("all");
  const rows = useMemo(
    () =>
      DEMO_PRODUCTS.filter(
        (p) =>
          (status === "all" || p.status === status) &&
          `${p.name} ${p.sku} ${p.id}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [q, status],
  );

  return (
    <>
      <PageHeader
        title="Registered products"
        description={`${DEMO_PRODUCTS.length} products in your catalogue`}
        actions={
          <Button asChild>
            <Link to="/dashboard/products/new">
              <PlusCircle /> Add product
            </Link>
          </Button>
        }
      />
      <Panel>
        <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, SKU or ID" className="pl-9" aria-label="Search products" />
          </div>
          <div className="inline-flex rounded-lg border bg-surface p-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setStatus(f)}
                aria-pressed={status === f}
                className={cn(
                  "rounded-md px-3 py-1 text-sm font-medium capitalize",
                  status === f ? "bg-card shadow-sm" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <TableWrap>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Product ID</TableHead>
                <TableHead>Tag</TableHead>
                <TableHead className="text-right">Scans</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <Link to="/dashboard/products/$productId" params={{ productId: p.id }} className="flex items-center gap-3 hover:underline">
                      <ProductThumb />
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.sku} · {p.category}</p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{p.id}</TableCell>
                  <TableCell>
                    {p.tagId ? (
                      <span className="font-mono text-xs">{p.tagId}</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">Not assigned</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-mono">{p.scans}</TableCell>
                  <TableCell><StatusBadge status={p.status} /></TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                    No products match your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableWrap>
      </Panel>
    </>
  );
}
