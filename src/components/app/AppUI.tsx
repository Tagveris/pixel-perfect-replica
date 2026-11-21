import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PageHeader({ title, description, actions }: { title: string; description?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({ label, value, delta, icon: Icon }: { label: string; value: string; delta?: string; icon: LucideIcon }) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-soft text-teal-strong">
          <Icon className="h-[18px] w-[18px]" />
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-semibold">{value}</p>
      {delta && <p className="mt-1 text-xs text-success">{delta}</p>}
    </div>
  );
}

export function Panel({ title, action, children, className }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-2xl border bg-card shadow-soft", className)}>
      {title && (
        <div className="flex items-center justify-between gap-3 border-b px-5 py-4">
          <h2 className="font-display text-base font-semibold">{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

const STATUS_VARIANT: Record<string, "success" | "warning" | "danger" | "muted" | "teal"> = {
  active: "success",
  verified: "success",
  assigned: "teal",
  draft: "muted",
  unassigned: "muted",
  pending: "warning",
  inactive: "warning",
  unknown: "danger",
  suspended: "danger",
  deactivated: "danger",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant={STATUS_VARIANT[status] ?? "muted"} className="capitalize">
      {status}
    </Badge>
  );
}

/** Lightweight bar chart for demo trends (no chart library needed). */
export function MiniBars({ values, label }: { values: number[]; label: string }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex h-44 items-end gap-1.5" role="img" aria-label={label}>
      {values.map((v, i) => (
        <div key={i} className="group flex h-full flex-1 items-end" title={`${v}`}>
          <div
            className={cn(
              "w-full rounded-t-md transition-colors",
              i === values.length - 1 ? "bg-gradient-teal" : "bg-navy/80 group-hover:bg-navy",
            )}
            style={{ height: `${(v / max) * 100}%` }}
          />
        </div>
      ))}
    </div>
  );
}

export function ProductThumb({ className }: { className?: string }) {
  return (
    <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-surface ring-1 ring-border", className)}>
      <span className="h-4 w-4 rounded-sm border-2 border-navy/40" />
    </span>
  );
}

export function TableWrap({ children }: { children: ReactNode }) {
  return <div className="overflow-x-auto">{children}</div>;
}

export function noindexHead(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  };
}
