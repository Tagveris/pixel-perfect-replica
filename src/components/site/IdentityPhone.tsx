import { BadgeCheck, Factory, MapPin, Nfc } from "lucide-react";

import { LogoSymbol } from "@/components/site/Logo";
import { cn } from "@/lib/utils";

/** Stylised smartphone showing what a consumer sees after scanning a TAGVERIS tag. */
export function IdentityPhone({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-[260px] rounded-[2.4rem] border border-navy-foreground/15 bg-navy-deep p-2.5 shadow-elevated",
        className,
      )}
      aria-label="Example of a TAGVERIS digital product identity page"
      role="img"
    >
      <div className="overflow-hidden rounded-[1.9rem] bg-background">
        <div className="flex items-center justify-between px-5 pb-2 pt-4">
          <LogoSymbol className="h-6 w-6" />
          <span className="font-mono text-[10px] text-muted-foreground">tagveris.com/id</span>
        </div>
        <div className="mx-4 rounded-2xl bg-success-soft p-4">
          <div className="flex items-center gap-2 text-success">
            <BadgeCheck className="h-5 w-5" />
            <span className="text-sm font-semibold">Registered product</span>
          </div>
          <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
            This product is registered by its manufacturer on TAGVERIS.
          </p>
        </div>
        <div className="space-y-3 px-5 py-4">
          <div>
            <p className="font-display text-base font-semibold leading-tight">Weekender Travel Bag</p>
            <p className="text-xs text-muted-foreground">Cognac · Full-grain leather</p>
          </div>
          <dl className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Factory className="h-3.5 w-3.5 text-teal-strong" />
              <dt className="sr-only">Manufacturer</dt>
              <dd>Halden & Co. Leatherworks</dd>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-teal-strong" />
              <dt className="sr-only">Origin</dt>
              <dd>Made in Portugal</dd>
            </div>
            <div className="flex items-center gap-2">
              <Nfc className="h-3.5 w-3.5 text-teal-strong" />
              <dt className="sr-only">Tag</dt>
              <dd>Secure NFC tag</dd>
            </div>
          </dl>
          <div className="rounded-lg border bg-surface px-3 py-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Product ID</p>
            <p className="font-mono text-sm font-medium">TGV-7F3K-29QX</p>
          </div>
        </div>
        <div className="h-5" />
      </div>
    </div>
  );
}
