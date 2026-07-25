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
          <p className="font-medium text-primary">Fresh on campus</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">Trending listings</h2>
        </div>
        <Button asChild variant="outline" className="gap-2">
          <Link href="/marketplace">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  )
}
