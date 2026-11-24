/**
 * TAGVERIS branded merchandise section.
 *
 * Self-contained: no external libraries, no image files — illustrations are
 * inline SVG. Meant to sit at the bottom of the home page, just before
 * </SiteLayout>.
 *
 * Colours use the real TAGVERIS tokens from styles.css:
 *   navy / navy-deep / navy-foreground / navy-muted / teal / teal-strong /
 *   teal-foreground / surface
 */

import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { MERCH_ITEMS, merchMailto, type MerchItem } from "@/lib/merch";

function MerchIllustration({ variant }: { variant: MerchItem["illustration"] }) {
  if (variant === "keychain") {
    return (
      <svg viewBox="0 0 160 120" className="h-full w-full" role="img" aria-label="NFC keychain">
        <rect x="0" y="0" width="160" height="120" fill="var(--surface)" />
        <circle cx="46" cy="34" r="12" fill="none" stroke="var(--navy)" strokeWidth="4" opacity="0.35" />
        <rect x="52" y="44" width="66" height="56" rx="10" fill="var(--navy)" />
        <rect x="62" y="56" width="46" height="10" rx="5" fill="var(--navy-foreground)" opacity="0.9" />
        <rect x="62" y="72" width="30" height="6" rx="3" fill="var(--navy-foreground)" opacity="0.45" />
        <circle cx="104" cy="86" r="6" fill="none" stroke="var(--teal)" strokeWidth="2" />
        <path
          d="M104 80v-4M110 86h4M104 92v4M98 86h-4"
          stroke="var(--teal)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (variant === "pen") {
    return (
      <svg viewBox="0 0 160 120" className="h-full w-full" role="img" aria-label="TAGVERIS pen">
        <rect x="0" y="0" width="160" height="120" fill="var(--surface)" />
        <g transform="rotate(-32 80 60)">
          <rect x="34" y="52" width="82" height="16" rx="8" fill="var(--navy)" />
          <path d="M116 52l14 8-14 8z" fill="var(--teal-strong)" />
          <rect x="46" y="56" width="26" height="8" rx="4" fill="var(--navy-foreground)" opacity="0.85" />
          <rect x="34" y="52" width="10" height="16" rx="5" fill="var(--navy-deep)" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" role="img" aria-label="Branded QR card">
      <rect x="0" y="0" width="160" height="120" fill="var(--surface)" />
      <rect x="40" y="28" width="80" height="64" rx="8" fill="#ffffff" stroke="var(--navy)" strokeWidth="1.5" opacity="0.95" />
      <rect x="52" y="40" width="26" height="26" rx="3" fill="var(--navy)" />
      <rect x="58" y="46" width="14" height="14" rx="2" fill="#ffffff" />
      <rect x="86" y="40" width="22" height="5" rx="2.5" fill="var(--teal-strong)" />
      <rect x="86" y="50" width="16" height="5" rx="2.5" fill="var(--navy)" opacity="0.25" />
      <rect x="52" y="74" width="56" height="5" rx="2.5" fill="var(--navy)" opacity="0.15" />
    </svg>
  );
}

export function MerchSection() {
  return (
    <section aria-label="TAGVERIS branded merchandise" className="border-t border-navy/10 bg-surface">
      <div className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="TAGVERIS merchandise"
          title="Branded essentials"
          description="A few examples of TAGVERIS branded merchandise we use to represent the brand — at meetings, trade fairs and with partners. This is brand representation, not a separate trading activity."
          className="animate-fade-up"
        />

        {/* Cards */}
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MERCH_ITEMS.map((item) => (
            <li
              key={item.id}
              className="flex flex-col overflow-hidden rounded-xl border border-navy/10 bg-white transition-colors hover:border-navy/20"
            >
              <div className="aspect-[4/3] w-full overflow-hidden border-b border-navy/5">
                <MerchIllustration variant={item.illustration} />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-base font-semibold text-navy">{item.name}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-navy/40">
                  {item.tag}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/70">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-10 flex flex-col gap-4 rounded-xl border border-navy/10 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-sm font-semibold text-navy">
              Interested in these items?
            </p>
            <p className="mt-1 text-sm text-navy/70">
              These are examples of brand representation. There is no online cart, no payment
              and no confirmed product offering at this stage — for questions, contact us by
              email.
            </p>
          </div>
          <Button asChild variant="hero" size="xl" className="shrink-0">
            <a href={merchMailto()}>
              Write an email
              <ArrowRight />
            </a>
          </Button>
        </div>

        {/* Honest note about mailto */}
        <p className="mt-4 text-xs leading-relaxed text-navy/40">
          This button opens your own email application with a prepared message. It is not a
          form that sends mail from the website.
        </p>
      </div>
    </section>
  );
}

export default MerchSection;
