import type { FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageHeader, Panel, noindexHead } from "@/components/app/AppUI";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DEMO_MANUFACTURER } from "@/lib/demo-data";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => noindexHead("Account Settings — TAGVERIS Dashboard", "Company profile, notifications and plan."),
  component: SettingsPage,
});

function SettingsPage() {
  function save(e: FormEvent) {
    e.preventDefault();
    toast.info("Settings not saved", { description: "Account settings will be saved once accounts are connected." });
  }
  return (
    <>
      <PageHeader title="Account settings" description="Manage your company profile, notifications and plan." />
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Panel title="Company profile">
          <form onSubmit={save} className="grid gap-5 p-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="s-company">Company name</Label>
              <Input id="s-company" defaultValue={DEMO_MANUFACTURER.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-contact">Contact person</Label>
              <Input id="s-contact" defaultValue={DEMO_MANUFACTURER.contact} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-email">Email</Label>
              <Input id="s-email" type="email" defaultValue={DEMO_MANUFACTURER.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-country">Country</Label>
              <Input id="s-country" defaultValue={DEMO_MANUFACTURER.country} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-vat">VAT number</Label>
              <Input id="s-vat" defaultValue={DEMO_MANUFACTURER.vat} className="font-mono" />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </Panel>
        <div className="space-y-6">
          <Panel title="Plan">
            <div className="p-5">
              <div className="flex items-center justify-between">
                <p className="font-display text-xl font-semibold">{DEMO_MANUFACTURER.plan}</p>
                <Badge variant="teal">Current</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Up to 5,000 registered products.</p>
              <Button asChild variant="outline" className="mt-4 w-full">
                <Link to="/manufacturers" hash="pricing">Compare plans</Link>
              </Button>
            </div>
          </Panel>
          <Panel title="Notifications">
            <ul className="divide-y">
              {[
                ["Weekly scan report", true],
                ["Inactive product scanned", true],
                ["Low tag inventory", false],
              ].map(([label, on]) => (
                <li key={String(label)} className="flex items-center justify-between px-5 py-4">
                  <Label htmlFor={`n-${label}`} className="font-normal">{label}</Label>
                  <Switch id={`n-${label}`} defaultChecked={Boolean(on)} />
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  );
}
