import Link from "next/link"
import { ArrowRight, Repeat2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="overflow-hidden rounded-3xl border border-primary/30 bg-primary/10 p-8 md:p-14">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/50 px-3 py-1 text-sm font-medium text-primary">
              <Repeat2 className="h-4 w-4" />
              CampusLoop
            </div>
            <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight md:text-4xl">
              Ready to see what could find a new home?
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Explore the preview marketplace or come back when listing and messaging services are connected.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 gap-2" href="/marketplace">
                  Explore sample listings
                  <ArrowRight className="h-4 w-4" />
                </Link>
              <Link className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8" href="/sell">See the listing flow</Link>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <p className="text-sm font-medium text-primary">The next step</p>
            <h3 className="mt-3 font-display text-2xl font-semibold">Connect the campus community.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Live listings, secure conversations, and referral tracking need persistent services behind the experience.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
