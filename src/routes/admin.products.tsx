import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, Panel, ProductThumb, StatusBadge, TableWrap, noindexHead } from "@/components/app/AppUI";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DEMO_MANUFACTURER, DEMO_PRODUCTS } from "@/lib/demo-data";

export const Route = createFileRoute("/admin/products")({
  head: () => noindexHead("Products — TAGVERIS Admin", "All registered products across manufacturers."),
  component: AdminProducts,
});

const EXTRA = [
  { id: "TGV-4B8M-61ZD", name: "Studio Headphones H2", manufacturer: "Nordlys Audio AB", tagType: "NFC", status: "inactive", scans: 1290 },
  { id: "TGV-6T9W-30KC", name: "Reserva Tinto 2021", manufacturer: "Vinhos Serra Alta", tagType: "QR", status: "active", scans: 3412 },
  { id: "TGV-1Z5Q-88HN", name: "Automatik 39 mm", manufacturer: "Kessler Uhrenmanufaktur", tagType: "Secure NFC", status: "active", scans: 702 },
];

function AdminProducts() {
  const rows = [
    ...DEMO_PRODUCTS.map((p) => ({ id: p.id, name: p.name, manufacturer: DEMO_MANUFACTURER.name, tagType: p.tagType, status: p.status, scans: p.scans })),
    ...EXTRA,
  ];
  return (
    <>
      <PageHeader title="Product management" description="Every product registered on the platform." />
      <Panel>
        <TableWrap>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Tag</TableHead>
                <TableHead className="text-right">Scans</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <ProductThumb />
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="font-mono text-xs text-muted-foreground">{p.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{p.manufacturer}</TableCell>
                  <TableCell>{p.tagType}</TableCell>
                  <TableCell className="text-right font-mono">{p.scans.toLocaleString("en-GB")}</TableCell>
                  <TableCell><StatusBadge status={p.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrap>
      </Panel>
    </>
  );
}
