import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { ExternalLink, Menu } from "lucide-react";

import { BRAND_WORDMARK_URL, LogoSymbol } from "@/components/site/Logo";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export type AppNavItem = { to: string; label: string; icon: LucideIcon; exact?: boolean };

type AppShellProps = {
  area: string;
  account: { name: string; detail: string };
  nav: AppNavItem[];
  notice: ReactNode;
  children: ReactNode;
};

function SidebarContent({
  area,
  account,
  nav,
  onNavigate,
}: Omit<AppShellProps, "children" | "notice"> & { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="px-5 py-5">
        <Link to="/" className="inline-flex items-center gap-2.5 rounded-lg bg-background px-2.5 py-1.5" onClick={onNavigate}>
          <LogoSymbol className="h-6 w-6" />
          <img src={BRAND_WORDMARK_URL} alt="TAGVERIS" className="h-3 w-auto" />
        </Link>
      </div>
      <p className="eyebrow px-6 pb-2 pt-3 text-sidebar-foreground/50">{area}</p>
      <nav className="flex-1 space-y-0.5 px-3" aria-label={`${area} navigation`}>
        {nav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            activeOptions={{ exact: item.exact ?? false }}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground [&_svg]:text-sidebar-primary" }}
          >
            <item.icon className="h-[18px] w-[18px]" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="m-3 rounded-xl border border-sidebar-border bg-sidebar-accent/60 p-4">
        <p className="text-sm font-semibold text-sidebar-accent-foreground">{account.name}</p>
        <p className="text-xs text-sidebar-foreground/60">{account.detail}</p>
        <Link to="/" className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-sidebar-primary hover:underline">
          Back to website <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

/** Shared layout for the manufacturer and admin dashboards. */
export function AppShell({ area, account, nav, notice, children }: AppShellProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-surface lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="sticky top-0 hidden h-screen lg:block">
        <SidebarContent area={area} account={account} nav={nav} />
      </aside>

      <div className="flex min-w-0 flex-col">
        <div className="flex items-center gap-3 border-b bg-background px-4 py-3 lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="grid h-9 w-9 place-items-center rounded-md hover:bg-muted" aria-label="Open navigation">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] border-0 p-0">
              <SheetTitle className="sr-only">{area} navigation</SheetTitle>
              <SidebarContent area={area} account={account} nav={nav} onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <LogoSymbol className="h-7 w-7" />
          <span className="font-display text-sm font-semibold">{area}</span>
        </div>

        <div className="border-b border-dashed border-warning/50 bg-warning-soft px-4 py-2 text-center text-xs text-foreground md:px-8">
          <span className="mr-2 rounded bg-warning px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
            Demo data
          </span>
          {notice}
        </div>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
