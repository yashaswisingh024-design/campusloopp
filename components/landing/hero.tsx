import Link from "next/link"
import Image from "next/image"
import { ShieldCheck, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Powered by Google Gemini AI
          </div>

          <h1 className="text-balance font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            Buy. Sell. Swap. <span className="text-primary">Repeat.</span>
          </h1>

          <p className="max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            The AI-powered, trust-first marketplace built exclusively for verified college communities. Trade
            textbooks, electronics, and hostel essentials safely — right on your campus.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/marketplace">
                Browse the marketplace
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/sell">List an item with AI</Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Verified students only
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              AI scam detection
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Safe campus meetups
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-2xl shadow-primary/10">
            <Image
              src="/images/hero-campus.png"
              alt="College students safely exchanging items on campus"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-card p-4 shadow-xl sm:block">
            <p className="text-xs text-muted-foreground">Avg. saved per trade</p>
            <p className="font-display text-2xl font-bold text-primary">₹3,200</p>
          </div>
          <div className="absolute -right-4 top-6 hidden items-center gap-2 rounded-2xl border border-border bg-card p-3 shadow-xl sm:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Listing verified</p>
              <p className="text-sm font-semibold">Low risk</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
