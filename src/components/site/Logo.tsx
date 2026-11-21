import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

// Served from /public so the logo works on any host (not only Lovable's asset CDN).
const symbol = { url: "/brand/tagveris-symbol.png" };
const wordmark = { url: "/brand/tagveris-wordmark.png" };

type LogoProps = { className?: string; size?: "sm" | "md" | "lg"; linked?: boolean };

const sizes = {
  sm: { symbol: "h-7 w-7", word: "h-3.5" },
  md: { symbol: "h-9 w-9", word: "h-[18px]" },
  lg: { symbol: "h-12 w-12", word: "h-6" },
};

/** Official TAGVERIS logo (symbol + wordmark), original colours preserved. */
export function Logo({ className, size = "md", linked = true }: LogoProps) {
  const s = sizes[size];
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img src={symbol.url} alt="" aria-hidden className={cn(s.symbol, "object-contain")} />
      <img src={wordmark.url} alt="TAGVERIS" className={cn(s.word, "w-auto object-contain")} />
    </span>
  );
  if (!linked) return content;
  return (
    <Link to="/" aria-label="TAGVERIS home" className="inline-flex rounded-md focus-visible:ring-2 focus-visible:ring-ring">
      {content}
    </Link>
  );
}

export function LogoSymbol({ className }: { className?: string }) {
  return <img src={symbol.url} alt="TAGVERIS" className={cn("object-contain", className)} />;
}
