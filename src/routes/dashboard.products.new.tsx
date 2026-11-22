import { useState, type ChangeEvent, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ImagePlus, X } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, Panel, noindexHead } from "@/components/app/AppUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DEMO_TAGS } from "@/lib/demo-data";

export const Route = createFileRoute("/dashboard/products/new")({
  head: () => noindexHead("Add Product — TAGVERIS Dashboard", "Register a new product and assign a tag."),
  component: NewProductPage,
});

function NewProductPage() {
  const [images, setImages] = useState<string[]>([]);
  const freeTags = DEMO_TAGS.filter((t) => t.status === "unassigned");

  function onFiles(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, 6 - images.length);
    setImages((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
    e.target.value = "";
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    toast.info("Product not saved", { description: "Saving products will work once the database is connected." });
  }

  return (
    <>
      <PageHeader
        title="Add new product"
        description="Create a digital identity for a product and link it to a tag."
        actions={
          <Button asChild variant="outline">
            <Link to="/dashboard/products">Cancel</Link>
          </Button>
        }
      />
      <form onSubmit={onSubmit} className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Panel title="Product details">
            <div className="grid gap-5 p-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="name">Product name</Label>
                <Input id="name" required placeholder="e.g. Weekender Travel Bag — Cognac" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" placeholder="HC-WKD-COG" className="font-mono" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="Bags" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="origin">Country of origin</Label>
                <Input id="origin" placeholder="Portugal" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batch">Batch / lot</Label>
                <Input id="batch" placeholder="HC-2026-11-A" className="font-mono" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" rows={4} placeholder="Materials, care instructions, warranty…" />
              </div>
            </div>
          </Panel>

          <Panel title="Product images">
            <div className="p-5">
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {images.map((src, i) => (
                  <div key={src} className="relative aspect-square overflow-hidden rounded-lg border">
                    <img src={src} alt={`Product image ${i + 1}`} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImages((prev) => prev.filter((x) => x !== src))}
                      className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-background/90 shadow"
                      aria-label="Remove image"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                {images.length < 6 && (
                  <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed text-muted-foreground hover:border-teal-strong hover:text-teal-strong">
                    <ImagePlus className="h-5 w-5" />
                    <span className="text-xs">Add</span>
                    <input type="file" accept="image/*" multiple className="sr-only" onChange={onFiles} />
                  </label>
                )}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Up to 6 images. Previews stay in your browser and are not uploaded.</p>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Tag assignment">
            <div className="space-y-5 p-5">
              <div className="space-y-2">
                <Label htmlFor="tag-type">Tag type</Label>
                <Select defaultValue="NFC">
                  <SelectTrigger id="tag-type"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NFC">NFC</SelectItem>
                    <SelectItem value="QR">QR</SelectItem>
                    <SelectItem value="Secure NFC">Secure NFC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tag">Assign tag</Label>
                <Select>
                  <SelectTrigger id="tag"><SelectValue placeholder="Select an available tag" /></SelectTrigger>
                  <SelectContent>
                    {freeTags.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        <span className="font-mono">{t.id}</span> · {t.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">{freeTags.length} unassigned tags in your account.</p>
              </div>
            </div>
          </Panel>
          <Panel title="Publishing">
            <div className="space-y-3 p-5">
              <Button type="submit" size="lg" className="w-full">Register product</Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => toast.info("Draft not saved", { description: "Drafts will be saved once the database is connected." })}
              >
                Save as draft
              </Button>
            </div>
          </Panel>
        </div>
      </form>
    </>
  );
}
