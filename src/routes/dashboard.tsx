import { createFileRoute, Outlet } from "@tanstack/react-router";
import { History, LayoutDashboard, Package, PlusCircle, Settings, Tags } from "lucide-react";

import { AppShell, type AppNavItem } from "@/components/app/AppShell";
import { noindexHead } from "@/components/app/AppUI";
import { DEMO_MANUFACTURER } from "@/lib/demo-data";

export const Route = createFileRoute("/dashboard")({
  head: () => noindexHead("Manufacturer Dashboard — TAGVERIS", "Manage registered products, NFC/QR tags and verification history."),
  component: DashboardLayout,
});

const NAV: AppNavItem[] = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/products", label: "Products", icon: Package, exact: true },
  { to: "/dashboard/products/new", label: "Add product", icon: PlusCircle },
  { to: "/dashboard/tags", label: "Tags", icon: Tags },
  { to: "/dashboard/scans", label: "Scan history", icon: History },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

function DashboardLayout() {
  return (
    <AppShell
      area="Manufacturer"
      account={{ name: DEMO_MANUFACTURER.name, detail: `${DEMO_MANUFACTURER.plan} plan · Demo account` }}
      nav={NAV}
      notice="This dashboard shows example data. Changes are not saved until the database is connected."
    >
      <Outlet />
    </AppShell>
  );
}
