import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { to: "/solutions", label: "Solutions" },
      { to: "/verify", label: "Verify a product" },
      { to: "/manufacturers", label: "For manufacturers" },
    ],
  },
  {
    title: "Products",
    links: [
      { to: "/shop", label: "NFC stickers & labels" },
      { to: "/shop", label: "QR identity labels" },
      { to: "/shop", label: "Secure NFC tags" },
    ],
  },
  {
    title: "Account",
    links: [
      { to: "/login", label: "Log in" },
      { to: "/register", label: "Register as manufacturer" },
      { to: "/dashboard", label: "Dashboard preview" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto">
      {/* CTA band */}
      <section className="relative overflow-hidden bg-hero text-navy-foreground">
        <div className="absolute inset-0 bg-grid-light opacity-60" aria-hidden />
        <div className="container-page relative flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
          <div className="max-w-xl">
            <p className="eyebrow text-teal">Get started</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Give every product a verifiable digital identity.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/register">
                Register your products <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline-light" size="xl">
              <a href="mailto:sales@tagveris.com">Talk to sales</a>
            </Button>
          </div>
        </div>
      </section>

      <div className="border-t bg-surface">
        <div className="container-page grid gap-12 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              European product identity and authentication technology. NFC and QR tags connected to
              a unique digital identity for every product.
            </p>
            <p className="mt-4 font-mono text-xs text-muted-foreground">tagveris.com · tagveris.eu</p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="eyebrow text-muted-foreground">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-foreground/80 hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="container-page flex flex-col gap-3 border-t py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TAGVERIS. All rights reserved.</p>
          <p>Built in Europe · GDPR-conscious by design</p>
        </div>
      </div>
    </footer>
  );
}
