import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/** Navy header band used at the top of inner marketing pages. */
export function PageHero({ eyebrow, title, description, children, className }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden bg-hero text-navy-foreground", className)}>
      <div className="absolute inset-0 bg-grid-light" aria-hidden />
      <div className="container-page relative py-16 md:py-24">
        <div className="max-w-3xl animate-fade-up">
          <p className="eyebrow text-teal">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] md:text-5xl lg:text-6xl">{title}</h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-muted">{description}</p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow text-teal-strong">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</p>}
    </div>
  );
}

export function DemoNotice({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-lg border border-dashed border-warning/50 bg-warning-soft px-4 py-3 text-sm text-foreground",
        className,
      )}
    >
      <span className="mt-0.5 rounded bg-warning px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
        Demo
      </span>
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}
