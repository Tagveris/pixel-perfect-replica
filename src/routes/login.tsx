import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { AuthShell } from "@/components/site/AuthShell";
import { DemoNotice } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — TAGVERIS manufacturer account" },
      { name: "description", content: "Log in to your TAGVERIS manufacturer account to manage products, tags and verifications." },
      { property: "og:title", content: "Log in to TAGVERIS" },
      { property: "og:description", content: "Access your TAGVERIS manufacturer dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    toast.info("Sign-in isn't available yet", {
      description: "Manufacturer accounts open at launch. You can explore the dashboard preview meanwhile.",
    });
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle={
        <>
          New to TAGVERIS?{" "}
          <Link to="/register" className="font-medium text-foreground underline underline-offset-4">
            Create a manufacturer account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.eu" className="h-11" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <button
              type="button"
              className="text-xs font-medium text-muted-foreground hover:text-foreground"
              onClick={() => toast.info("Password reset will be available when accounts open.")}
            >
              Forgot password?
            </button>
          </div>
          <Input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="h-11" />
        </div>
        <Button type="submit" size="xl" className="w-full">Log in</Button>
      </form>

      <DemoNotice className="mt-8">
        Accounts are not connected yet — no sign-in takes place.{" "}
        <Link to="/dashboard" className="font-medium underline underline-offset-2">Open the dashboard preview</Link>{" "}
        or the{" "}
        <Link to="/admin" className="font-medium underline underline-offset-2">admin preview</Link>.
      </DemoNotice>
    </AuthShell>
  );
}
