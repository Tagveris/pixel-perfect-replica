import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, ScanLine } from "lucide-react";

import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";

const NAV = [
  { to: "/solutions", label: "Solutions" },
  { to: "/shop", label: "Shop" },
  { to: "/manufacturers", label: "For Manufacturers" },
  { to: "/verify", label: "Verify Product" },
] as const;

export function SiteHeader() {
  const { itemCount, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
            <Link to="/login">Log in</Link>
          </Button>
          <button
            onClick={() => setOpen(true)}
            className="relative grid h-9 w-9 place-items-center rounded-md text-foreground hover:bg-muted"
            aria-label={`Open cart, ${itemCount} items`}
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-teal px-1 font-mono text-[10px] font-semibold text-teal-foreground">
                {itemCount}
              </span>
            )}
          </button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/register">Register products</Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="grid h-9 w-9 place-items-center rounded-md hover:bg-muted lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-full flex-col sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="pt-2">
                <Logo size="sm" />
              </div>
              <nav aria-label="Mobile" className="mt-6 flex flex-col">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="border-b py-4 font-display text-lg font-medium"
                    activeProps={{ className: "text-teal-strong" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 pb-4">
                <Button asChild variant="outline" size="lg" onClick={() => setMobileOpen(false)}>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild size="lg" onClick={() => setMobileOpen(false)}>
                  <Link to="/register">Register products</Link>
                </Button>
                <Button asChild variant="hero" size="lg" onClick={() => setMobileOpen(false)}>
                  <Link to="/verify">
                    <ScanLine /> Verify a product
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
