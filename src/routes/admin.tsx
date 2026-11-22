import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Activity, Building2, LayoutDashboard, Package, ScrollText, Tags } from "lucide-react";

import { AppShell, type AppNavItem } from "@/components/app/AppShell";
import { noindexHead } from "@/components/app/AppUI";

export const Route = createFileRoute("/admin")({
  head: () => noindexHead("Admin — TAGVERIS", "TAGVERIS platform administration."),
  component: AdminLayout,
});

const NAV: AppNavItem[] = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/manufacturers", label: "Manufacturers", icon: Building2 },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/tags", label: "Tag inventory", icon: Tags },
  { to: "/admin/activity", label: "Verification activity", icon: Activity },
  { to: "/admin/audit", label: "Audit log", icon: ScrollText },
];

function AdminLayout() {
  return (
    <AppShell
      area="Admin"
      account={{ name: "TAGVERIS Operations", detail: "Admin preview · access control pending" }}
      nav={NAV}
      notice="Admin preview with example data. Admin-only access will be added before launch."
    >
      <Outlet />
    </AppShell>
  );
}
