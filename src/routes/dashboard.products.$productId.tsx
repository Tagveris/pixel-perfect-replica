import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, ImageIcon, Pencil } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, Panel, StatusBadge, TableWrap, noindexHead } from "@/components/app/AppUI";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DEMO_PRODUCTS, DEMO_SCANS, DEMO_TAGS } from "@/lib/demo-data";

export const Route = createFileRoute("/dashboard/products/$productId")({
  loader: ({ params }) => {
    const product = DEMO_PRODUCTS.find((p) => p.id === params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) =>
    noindexHead(
      loaderData ? `${loaderData.product.name} — TAGVERIS Dashboard` : "Product — TAGVERIS Dashboard",
      "Product details, assigned tag and verification history.",
    ),
  notFoundComponent: () => (
    <div className="py-20 text-center">
      <p className="text-lg font-semibold">Product not found</p>
      <Link to="/dashboard/products" className="mt-2 inline-block text-sm text-teal-strong hover:underline">Back to products</Link>
    </div>
  ),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { product } = Route.useLoaderData();
  const tag = DEMO_TAGS.find((t) => t.id === product.tagId);
  const scans = DEMO_SCANS.filter((s) => s.productId === product.id);

  return (
    <>
      <Link to="/dashboard/products" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Products
      </Link>
      <PageHeader
        title={product.name}
        description={<span className="font-mono text-sm">{product.id}</span>}
        actions={
          <>
            <Button asChild variant="outline">
              <Link to="/verify" search={{ id: product.id }}>
                Public page <ExternalLink />
              </Link>
            </Button>
            <Button onClick={() => toast.info("Editing will be available once the database is connected.")}>
              <Pencil /> Edit
            </Button>
          </>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Panel title="Details">
            <dl className="grid gap-5 p-5 sm:grid-cols-2">
              {[
                ["Status", <StatusBadge key="s" status={product.status} />],
                ["SKU", <span key="k" className="font-mono">{product.sku}</span>],
                ["Category", product.category],
                ["Registered", product.createdAt],
                ["Total scans", <span key="c" className="font-mono">{product.scans}</span>],
                ["Tag type", product.tagType],
              ].map(([label, value]) => (
                <div key={String(label)}>
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="mt-1 text-sm font-medium">{value}</dd>
                </div>
              ))}
              <div className="sm:col-span-2">
                <dt className="text-xs text-muted-foreground">Description</dt>
                <dd className="mt-1 text-sm">{product.description}</dd>
              </div>
            </dl>
          </Panel>
          <Panel title="Verification history">
            <TableWrap>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scans.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-mono text-xs">{s.at}</TableCell>
                      <TableCell>{s.method}</TableCell>
                      <TableCell>{s.location}</TableCell>
                      <TableCell><StatusBadge status={s.result} /></TableCell>
                    </TableRow>
                  ))}
                  {scans.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">No scans yet.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableWrap>
          </Panel>
        </div>
        <div className="space-y-6">
          <Panel title="Images">
            <div className="grid grid-cols-3 gap-3 p-5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="grid aspect-square place-items-center rounded-lg border border-dashed bg-surface text-muted-foreground">
                  <ImageIcon className="h-5 w-5" />
                </div>
              ))}
            </div>
            <p className="px-5 pb-5 text-xs text-muted-foreground">No images uploaded for this demo product.</p>
          </Panel>
          <Panel title="Assigned tag">
            <div className="p-5">
              {tag ? (
                <div className="rounded-xl border bg-surface p-4">
                  <p className="font-mono text-sm font-medium">{tag.id}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{tag.type} · Batch {tag.batch}</p>
                  <div className="mt-3"><StatusBadge status={tag.status} /></div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No tag assigned yet.</p>
              )}
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
