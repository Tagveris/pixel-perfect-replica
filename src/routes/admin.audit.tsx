import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

import { PageHeader, Panel, TableWrap, noindexHead } from "@/components/app/AppUI";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DEMO_AUDIT } from "@/lib/demo-data";

export const Route = createFileRoute("/admin/audit")({
  head: () => noindexHead("Audit Log — TAGVERIS Admin", "Chronological record of administrative actions."),
  component: AdminAudit,
});

function AdminAudit() {
  const [q, setQ] = useState("");
  const rows = DEMO_AUDIT.filter((e) => `${e.actor} ${e.action} ${e.target}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHeader title="Audit log" description="Every administrative change, who made it and when." />
      <Panel>
        <div className="border-b p-4">
          <div className="relative max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by actor, action or target" className="pl-9" aria-label="Filter audit log" />
          </div>
        </div>
        <TableWrap>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>IP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((e) => (
                <TableRow key={e.at + e.action}>
                  <TableCell className="whitespace-nowrap font-mono text-xs">{e.at}</TableCell>
                  <TableCell>{e.actor}</TableCell>
                  <TableCell><span className="rounded bg-teal-soft px-1.5 py-0.5 font-mono text-xs text-teal-strong">{e.action}</span></TableCell>
                  <TableCell>{e.target}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{e.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrap>
      </Panel>
    </>
  );
}
