import type { FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageHeader, Panel, TableWrap, noindexHead } from "@/components/app/AppUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DEMO_INVENTORY, DEMO_MANUFACTURERS } from "@/lib/demo-data";

export const Route = createFileRoute("/admin/tags")({
  head: () => noindexHead("Tag Inventory — TAGVERIS Admin", "NFC/QR tag batches and assignment to manufacturers."),
  component: AdminTags,
});

const fmt = (n: number) => n.toLocaleString("en-GB");

function AdminTags() {
  function assign(e: FormEvent) {
    e.preventDefault();
    toast.info("Assignment not saved", { description: "Tag assignment will work once the database is connected." });
  }
  return (
    <>
      <PageHeader title="NFC/QR tag inventory" description="Track tag batches and assign them to manufacturers." />
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Panel title="Batches">
          <TableWrap>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="min-w-[180px]">Usage</TableHead>
                  <TableHead className="text-right">Available</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DEMO_INVENTORY.map((b) => {
                  const pct = Math.round((b.assigned / b.total) * 100);
                  return (
                    <TableRow key={b.batch}>
                      <TableCell>
                        <p className="font-mono text-xs font-medium">{b.batch}</p>
                        <p className="text-xs text-muted-foreground">Received {b.received}</p>
                      </TableCell>
                      <TableCell>
                        <p>{b.type}</p>
                        <p className="text-xs text-muted-foreground">{b.chip}</p>
                      </TableCell>
                      <TableCell>
                        <Progress value={pct} className="h-2" aria-label={`${pct}% assigned`} />
                        <p className="mt-1 text-xs text-muted-foreground">{fmt(b.assigned)} / {fmt(b.total)} assigned</p>
                      </TableCell>
                      <TableCell className={`text-right font-mono ${b.available < 100 ? "text-destructive" : ""}`}>
                        {fmt(b.available)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableWrap>
        </Panel>
        <Panel title="Assign tags to manufacturer">
          <form onSubmit={assign} className="space-y-5 p-5">
            <div className="space-y-2">
              <Label htmlFor="a-batch">Batch</Label>
              <Select>
                <SelectTrigger id="a-batch"><SelectValue placeholder="Select batch" /></SelectTrigger>
                <SelectContent>
                  {DEMO_INVENTORY.map((b) => (
                    <SelectItem key={b.batch} value={b.batch}>{b.batch} · {b.type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="a-mfr">Manufacturer</Label>
              <Select>
                <SelectTrigger id="a-mfr"><SelectValue placeholder="Select manufacturer" /></SelectTrigger>
                <SelectContent>
                  {DEMO_MANUFACTURERS.filter((m) => m.status === "active").map((m) => (
                    <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="a-qty">Quantity</Label>
              <Input id="a-qty" type="number" min={1} defaultValue={100} className="font-mono" />
            </div>
            <Button type="submit" className="w-full">Assign tags</Button>
          </form>
        </Panel>
      </div>
    </>
  );
}
