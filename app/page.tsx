import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/landing/hero"
import { StatsBar } from "@/components/landing/stats-bar"
import { AiShowcase } from "@/components/landing/ai-showcase"
import { FeaturedListings } from "@/components/landing/featured-listings"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Cta } from "@/components/landing/cta"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <AiShowcase />
        <FeaturedListings />
        <HowItWorks />
        <Cta />
      </main>
      <SiteFooter />
    </div>
  )
}
