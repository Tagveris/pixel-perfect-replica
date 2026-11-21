import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { AuthShell } from "@/components/site/AuthShell";
import { DemoNotice } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register as a Manufacturer — TAGVERIS" },
      { name: "description", content: "Create a TAGVERIS manufacturer account to register products and assign NFC and QR tags." },
      { property: "og:title", content: "Register your company on TAGVERIS" },
      { property: "og:description", content: "Manufacturer account registration for TAGVERIS product identity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RegisterPage,
});

const COUNTRIES = ["Austria", "Belgium", "Denmark", "Finland", "France", "Germany", "Ireland", "Italy", "Netherlands", "Poland", "Portugal", "Spain", "Sweden", "Other"];
const VOLUMES = ["Under 1,000 products / year", "1,000 – 10,000", "10,000 – 100,000", "100,000+"];

function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [agreed, setAgreed] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    if (!agreed) {
      toast.error("Please accept the terms to continue.");
      return;
    }
    toast.info("Registration isn't open yet", {
      description: "Your details were not sent or stored. Manufacturer accounts open at launch.",
    });
  }

  return (
    <AuthShell
      title="Register as a manufacturer"
      subtitle={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-foreground underline underline-offset-4">Log in</Link>
        </>
      }
    >
      <ol className="mb-8 flex items-center gap-3 text-sm">
        {["Company", "Account"].map((label, i) => {
          const n = (i + 1) as 1 | 2;
          const done = step > n;
          return (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full font-mono text-xs",
                  step === n && "bg-navy text-navy-foreground",
                  done && "bg-teal text-teal-foreground",
                  step < n && "bg-muted text-muted-foreground",
                )}
              >
                {done ? <CheckCircle2 className="h-4 w-4" /> : n}
              </span>
              <span className={cn("font-medium", step < n && "text-muted-foreground")}>{label}</span>
              {i === 0 && <span className="h-px flex-1 bg-border" />}
            </li>
          );
        })}
      </ol>

      <form onSubmit={onSubmit} className="space-y-5">
        {step === 1 ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="company">Company name</Label>
              <Input id="company" required autoComplete="organization" placeholder="Halden & Co. Leatherworks" className="h-11" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select required>
                  <SelectTrigger id="country" className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vat">VAT number</Label>
                <Input id="vat" placeholder="EU VAT ID" className="h-11 font-mono" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" type="url" placeholder="https://" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="volume">Expected annual product volume</Label>
              <Select>
                <SelectTrigger id="volume" className="h-11"><SelectValue placeholder="Select a range" /></SelectTrigger>
                <SelectContent>
                  {VOLUMES.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" size="xl" className="w-full">Continue</Button>
          </>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first">First name</Label>
                <Input id="first" required autoComplete="given-name" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last">Last name</Label>
                <Input id="last" required autoComplete="family-name" className="h-11" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-email">Work email</Label>
              <Input id="reg-email" type="email" required autoComplete="email" placeholder="you@company.eu" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-password">Password</Label>
              <Input id="reg-password" type="password" required minLength={10} autoComplete="new-password" className="h-11" />
              <p className="text-xs text-muted-foreground">At least 10 characters.</p>
            </div>
            <label className="flex items-start gap-3 text-sm">
              <Checkbox checked={agreed} onCheckedChange={(v) => setAgreed(v === true)} className="mt-0.5" />
              <span className="text-muted-foreground">
                I agree to the TAGVERIS terms of service and privacy policy, and confirm I represent this company.
              </span>
            </label>
            <div className="flex gap-3">
              <Button type="button" variant="outline" size="xl" onClick={() => setStep(1)}>Back</Button>
              <Button type="submit" size="xl" className="flex-1">Create account</Button>
            </div>
          </>
        )}
      </form>

      <DemoNotice className="mt-8">
        Registration is a design preview — nothing you enter is sent or stored yet.
      </DemoNotice>
    </AuthShell>
  );
}
