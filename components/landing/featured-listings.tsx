import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ListingCard } from "@/components/listing-card"
import { LISTINGS } from "@/lib/data"

export function FeaturedListings() {
  const featured = LISTINGS.slice(0, 4)

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-medium text-primary">Marketplace preview</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">A few things students use</h2>
        </div>
        <Link className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2" href="/marketplace">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">Example items for the preview. Live student listings are not connected yet.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((listing, index) => (
          <ListingCard key={listing.id} listing={listing} index={index} />
        ))}
      </div>
    </section>
  )
}
