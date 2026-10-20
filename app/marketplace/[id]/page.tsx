
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, MapPin, Repeat, MessageSquare, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getListing, formatPrice } from "@/lib/data"

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const listing = getListing(id)

  if (!listing) {
    notFound()
  }

  const discount = listing.originalPrice
    ? Math.round((1 - listing.price / listing.originalPrice) * 100)
    : 0

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to marketplace
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          {/* Listing image */}
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-muted">
            <Image
              src={listing.image || "/placeholder.svg"}
              alt={listing.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />

            {discount > 0 && (
              <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1.5 text-sm font-bold text-primary-foreground">
                -{discount}%
              </div>
            )}
          </div>

          {/* Listing details */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{listing.category}</Badge>
              <Badge variant="secondary">{listing.condition}</Badge>

              {listing.swappable && (
                <Badge className="gap-1 bg-accent text-accent-foreground">
                  <Repeat className="h-3 w-3" />
                  Open to swap
                </Badge>
              )}
            </div>

            <h1 className="text-balance font-display text-2xl font-bold leading-tight md:text-3xl">
              {listing.title}
            </h1>

            <div className="flex items-end gap-3">
              <span className="font-display text-3xl font-bold text-foreground">
                {formatPrice(listing.price)}
              </span>

              {listing.originalPrice && (
                <span className="pb-1 text-muted-foreground line-through">
                  {formatPrice(listing.originalPrice)}
                </span>
              )}
            </div>

            <div className="rounded-xl border border-amber-400/25 bg-amber-300/5 px-4 py-3 text-sm text-muted-foreground">
              Example item only — seller and availability details are illustrative.
            </div>

            <p className="leading-relaxed text-muted-foreground">
              {listing.description}
            </p>

            <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                Preferred meetup:
              </span>
              <span className="font-medium text-foreground">
                {listing.meetup}
              </span>
            </div>

            <Separator />

            {/* Example seller details are not connected to user accounts. */}
            <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary">
                  {listing.seller.initials}
                </span>

                <div>
                  <p className="flex items-center gap-1.5 font-medium">
                    Example seller
                  </p>
                  <p className="text-xs text-muted-foreground">Sample profile</p>
                </div>
              </div>

              <div className="text-right text-sm">
                <p className="text-xs text-muted-foreground">Preview</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="flex-1 gap-2" onClick={() => { window.location.href = "/messages" }}>
                <Link href="/messages">
                  <MessageSquare className="h-4 w-4" />
                  Message seller
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="flex-1 gap-2" disabled>
                <CheckCircle2 className="h-4 w-4" />
                Reserve item
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Preview item only. Messaging and reservations are unavailable until marketplace services are connected.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
