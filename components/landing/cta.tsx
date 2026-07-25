import Link from "next/link"
import { ArrowRight, Trophy, Gift, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="overflow-hidden rounded-3xl border border-primary/30 bg-primary/10 p-8 md:p-14">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/50 px-3 py-1 text-sm font-medium text-primary">
              <Trophy className="h-4 w-4" />
              Student Ambassador Program
            </div>
            <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight md:text-4xl">
              Trade more, earn more, and lead your campus
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Complete missions, invite classmates, and climb the leaderboard to earn marketplace credits, badges, and
              bragging rights.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/ambassador">
                  Join the program
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/marketplace">Start trading</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <Gift className="h-6 w-6 text-accent" />
              <p className="mt-3 font-display text-lg font-semibold">Referral rewards</p>
              <p className="mt-1 text-sm text-muted-foreground">Earn credits for every classmate you bring in.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <Trophy className="h-6 w-6 text-accent" />
              <p className="mt-3 font-display text-lg font-semibold">Leaderboard</p>
              <p className="mt-1 text-sm text-muted-foreground">Rank up with every verified sale and 5-star review.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 sm:col-span-2">
              <Users className="h-6 w-6 text-accent" />
              <p className="mt-3 font-display text-lg font-semibold">Ambassador badges</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Unlock exclusive badges from Rising Star to Campus Legend.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
