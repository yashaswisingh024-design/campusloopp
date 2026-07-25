"use client"

import { useMemo, useState } from "react"
import { Search, Sparkles, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ListingCard } from "@/components/listing-card"
import { CATEGORIES, LISTINGS, type Category } from "@/lib/data"

type SortKey = "recent" | "price-low" | "price-high"

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "recent", label: "Most recent" },
  { key: "price-low", label: "Price: Low to High" },
  { key: "price-high", label: "Price: High to Low" },
]

export function MarketplaceBrowser() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All")
  const [sort, setSort] = useState<SortKey>("recent")

  const results = useMemo(() => {
    let items = LISTINGS.filter((l) => {
      const matchesCategory = activeCategory === "All" || l.category === activeCategory
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })

    if (sort === "price-low") items = [...items].sort((a, b) => a.price - b.price)
    if (sort === "price-high") items = [...items].sort((a, b) => b.price - a.price)
    return items
  }, [query, activeCategory, sort])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-bold tracking-tight">Campus Marketplace</h1>
        <p className="text-muted-foreground">Verified listings from students at IIT Delhi.</p>
      </div>

      {/* Smart search */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try: cheap engineering drawing kit near hostel"
              className="pl-9"
            />
          </div>
          <Button className="gap-2">
            <Sparkles className="h-4 w-4" />
            Smart Search
          </Button>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Search naturally — AI understands price ranges, categories, and locations.
        </p>
      </div>

      {/* Category filters */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveCategory("All")}
          className={chipClass(activeCategory === "All")}
        >
          All items
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={chipClass(activeCategory === cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Sort + count */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{results.length}</span> items available
        </p>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          {sortOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSort(opt.key)}
              className={
                "rounded-lg px-2.5 py-1 text-xs font-medium transition-colors " +
                (sort === opt.key
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-16 text-center">
          <Badge variant="secondary">No matches</Badge>
          <p className="text-muted-foreground">Try a different search or category.</p>
        </div>
      )}
    </div>
  )
}

function chipClass(active: boolean) {
  return (
    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors " +
    (active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground")
  )
}
