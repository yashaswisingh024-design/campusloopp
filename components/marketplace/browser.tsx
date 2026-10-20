"use client"

import { useMemo, useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
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
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-16">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/[.08] bg-[linear-gradient(120deg,rgba(105,76,207,.17),rgba(25,31,55,.52)_52%,rgba(31,129,142,.11))] px-6 py-9 sm:px-10 sm:py-12">
        <div aria-hidden className="absolute -right-12 -top-24 size-72 rounded-full bg-violet-500/10 blur-[90px]" />
        <div className="relative max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-violet-200"><span className="size-1.5 rounded-full bg-emerald-300" /> Preview marketplace</p>
          <h1 className="font-display text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">Campus finds,<br className="hidden sm:block" /> one good loop.</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">Explore a sample collection of useful student essentials. Search, filter, and sort the preview to see what fits.</p>
        </div>
      </div>

      <p className="mt-5 rounded-xl border border-amber-300/15 bg-amber-200/[.035] px-4 py-3 text-sm text-slate-400">
        These are example listings for design review. Live listing storage and student seller accounts are not connected.
      </p>

      {/* Smart search */}
      <div className="mt-7 rounded-2xl border border-white/[.08] bg-white/[.025] p-4 shadow-xl shadow-black/10 backdrop-blur-xl sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <label className="sr-only" htmlFor="market-search">Search sample listings</label>
            <Input
              id="market-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try: cheap engineering drawing kit near hostel"
              className="pl-9"
            />
          </div>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          Search matches listing titles, descriptions, and categories.
        </p>
      </div>

      {/* Category filters */}
      <div className="mt-6 flex flex-wrap items-center gap-2" aria-label="Filter by category">
        <button
          onClick={() => setActiveCategory("All")}
          aria-pressed={activeCategory === "All"}
          className={chipClass(activeCategory === "All")}
        >
          All items
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            aria-pressed={activeCategory === cat.name}
            className={chipClass(activeCategory === cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Sort + count */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          <span className="font-semibold text-foreground">{results.length}</span> items available
        </p>
        <div className="flex flex-wrap items-center gap-1 rounded-xl border border-white/[.07] bg-white/[.025] p-1">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          {sortOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSort(opt.key)}
              aria-pressed={sort === opt.key}
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
          {results.map((listing, index) => (
            <ListingCard key={listing.id} listing={listing} index={index} />
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
    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200 hover:-translate-y-px " +
    (active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground")
  )
}
