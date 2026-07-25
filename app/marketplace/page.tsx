import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MarketplaceBrowser } from "@/components/marketplace/browser"

export default function MarketplacePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <MarketplaceBrowser />
      </main>
      <SiteFooter />
    </div>
  )
}
