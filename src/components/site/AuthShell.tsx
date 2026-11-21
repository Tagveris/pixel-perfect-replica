import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { BadgeCheck, ShieldCheck, Tags } from "lucide-react";

import { Logo, LogoSymbol } from "@/components/site/Logo";

export function AuthShell({ children, title, subtitle }: { children: ReactNode; title: string; subtitle: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      <aside className="relative hidden overflow-hidden bg-hero p-12 text-navy-foreground lg:flex lg:flex-col">
        <div className="absolute inset-0 bg-grid-light" aria-hidden />
        <Link to="/" className="relative inline-flex w-fit items-center gap-3 rounded-xl bg-background px-4 py-2.5">
          <Logo size="sm" linked={false} />
        </Link>
        <div className="relative my-auto max-w-md">
          <LogoSymbol className="h-20 w-20 rounded-2xl bg-background p-2" />
          <h2 className="mt-8 text-4xl font-semibold leading-tight">The identity layer for physical products.</h2>
          <ul className="mt-10 space-y-5">
            {[
              { icon: Tags, t: "Register products and assign NFC & QR tags" },
              { icon: BadgeCheck, t: "Give customers instant product verification" },
              { icon: ShieldCheck, t: "Track scans across European markets" },
            ].map((f) => (
              <li key={f.t} className="flex items-center gap-4 text-navy-muted">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-navy-foreground/15 bg-navy-foreground/5">
                  <f.icon className="h-5 w-5 text-teal" />
                </span>
                {f.t}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative font-mono text-xs text-navy-muted">tagveris.com · tagveris.eu</p>
      </aside>

      <main className="flex flex-col px-5 py-8 sm:px-10 lg:px-16">
        <div className="lg:hidden">
          <Logo size="sm" />
        </div>
        <div className="mx-auto my-auto w-full max-w-md py-10">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">← Back to tagveris.com</Link>
        </p>
      </main>
    </div>
  );
}
