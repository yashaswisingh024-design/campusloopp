"use client"

import { useState } from "react"
import { Sparkles, TrendingUp, ShieldCheck, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CATEGORIES, MEETUP_SPOTS, formatPrice } from "@/lib/data"

const conditions = ["New", "Like New", "Good", "Fair"]

export function CreateListingForm() {
  const [name, setName] = useState("")
  const [brand, setBrand] = useState("")
  const [condition, setCondition] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [suggestedPrice, setSuggestedPrice] = useState<number | null>(null)
  const [generating, setGenerating] = useState(false)
  const [pricing, setPricing] = useState(false)

  // Placeholder AI generation — wired to Gemini via AI SDK in a later step.
  function handleGenerate() {
    if (!name) return
    setGenerating(true)
    setTimeout(() => {
      const cond = condition || "Good"
      setDescription(
        `${brand ? brand + " " : ""}${name} in ${cond.toLowerCase()} condition. Well-maintained and fully functional, perfect for students who want quality without the full retail price. Comes ready to use — meet on campus to inspect before you buy.`,
      )
      setGenerating(false)
    }, 900)
  }

  function handleSuggestPrice() {
    if (!name) return
    setPricing(true)
    setTimeout(() => {
      const base = 1500 + name.length * 40 + (condition === "Like New" ? 600 : 0)
      setSuggestedPrice(base)
      setPrice(String(base))
      setPricing(false)
    }, 900)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Product name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dell Inspiron 15 Laptop"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="brand">Brand (optional)</Label>
            <Input id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g. Dell" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.name} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Condition</Label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="description">Description</Label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="gap-1.5"
              onClick={handleGenerate}
              disabled={!name || generating}
            >
              {generating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
              Generate with AI
            </Button>
          </div>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your item, or let Gemini write it for you."
            rows={5}
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="price">Price (₹)</Label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="gap-1.5"
              onClick={handleSuggestPrice}
              disabled={!name || pricing}
            >
              {pricing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <TrendingUp className="h-3.5 w-3.5" />}
              Suggest price
            </Button>
          </div>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0"
          />
          {suggestedPrice !== null && (
            <p className="text-xs text-primary">
              Gemini suggests around {formatPrice(suggestedPrice)} for a fair, fast sale.
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label>Preferred campus meetup</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a safe location" />
            </SelectTrigger>
            <SelectContent>
              {MEETUP_SPOTS.map((spot) => (
                <SelectItem key={spot} value={spot}>
                  {spot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" size="lg" className="mt-2 gap-2">
          <ShieldCheck className="h-4 w-4" />
          Run scam check & publish
        </Button>
      </form>

      {/* Info sidebar */}
      <aside className="flex flex-col gap-4">
        <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5" />
            <p className="font-display font-semibold">AI does the heavy lifting</p>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">•</span> Auto-writes a professional description
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span> Recommends a fair, competitive price
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span> Scans your listing for scam signals
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <Badge variant="secondary" className="gap-1">
            <ShieldCheck className="h-3 w-3" /> Verified seller
          </Badge>
          <p className="mt-3 text-sm text-muted-foreground">
            Your listing will show your verified student badge and campus, building instant trust with buyers.
          </p>
        </div>
      </aside>
    </div>
  )
}
