import { createFileRoute } from "@tanstack/react-router";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, Panel, StatusBadge, TableWrap, noindexHead } from "@/components/app/AppUI";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DEMO_MANUFACTURERS } from "@/lib/demo-data";

export const Route = createFileRoute("/admin/manufacturers")({
  head: () => noindexHead("Manufacturers — TAGVERIS Admin", "Manage manufacturer accounts."),
  component: AdminManufacturers,
});

function AdminManufacturers() {
  const act = (label: string) => toast.info(`${label} isn't available in the preview.`);
  return (
    <>
      <PageHeader title="Manufacturer management" description="Approve, suspend and review manufacturer accounts." />
      <Panel>
        <TableWrap>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">Products</TableHead>
                <TableHead className="text-right">Tags</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DEMO_MANUFACTURERS.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell className="font-mono text-xs">{m.country}</TableCell>
                  <TableCell>{m.plan}</TableCell>
                  <TableCell className="text-right font-mono">{m.products.toLocaleString("en-GB")}</TableCell>
                  <TableCell className="text-right font-mono">{m.tags.toLocaleString("en-GB")}</TableCell>
                  <TableCell className="font-mono text-xs">{m.joined}</TableCell>
                  <TableCell><StatusBadge status={m.status} /></TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="grid h-8 w-8 place-items-center rounded-md hover:bg-muted" aria-label={`Actions for ${m.name}`}>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => act("Viewing details")}>View details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => act("Approving")}>Approve</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => act("Suspending")} className="text-destructive">Suspend</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrap>
      </Panel>
    </>
  );
}
