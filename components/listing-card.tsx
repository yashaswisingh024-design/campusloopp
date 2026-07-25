import Link from "next/link"
import Image from "next/image"
import { MapPin, ShieldCheck, Repeat, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { type Listing, formatPrice } from "@/lib/data"

export function ListingCard({ listing }: { listing: Listing }) {
  const discount = listing.originalPrice
    ? Math.round((1 - listing.price / listing.originalPrice) * 100)
    : 0

  return (
    <Link
      href={`/marketplace/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={listing.image || "/placeholder.svg"}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-1.5">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur">
            {listing.condition}
          </Badge>
          {listing.swappable && (
            <Badge className="gap-1 bg-accent text-accent-foreground">
              <Repeat className="h-3 w-3" /> Swap
            </Badge>
          )}
        </div>
        {discount > 0 && (
          <div className="absolute right-3 top-3 rounded-full bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">
            -{discount}%
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="rounded bg-secondary px-1.5 py-0.5 font-medium text-secondary-foreground">
            {listing.category}
          </span>
          <span aria-hidden>·</span>
          <span>{listing.postedAt}</span>
        </div>

        <h3 className="line-clamp-2 font-medium leading-snug text-card-foreground">{listing.title}</h3>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <p className="font-display text-lg font-bold text-foreground">{formatPrice(listing.price)}</p>
            {listing.originalPrice && (
              <p className="text-xs text-muted-foreground line-through">{formatPrice(listing.originalPrice)}</p>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {listing.meetup}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border/60 pt-3 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary">
              {listing.seller.initials}
            </span>
            {listing.seller.name.split(" ")[0]}
            {listing.seller.verified && <ShieldCheck className="h-3.5 w-3.5 text-primary" />}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            {listing.seller.rating}
          </span>
        </div>
      </div>
    </Link>
  )
}
