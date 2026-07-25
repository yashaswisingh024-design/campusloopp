import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CreateListingForm } from "@/components/sell/create-listing-form"

export default function SellPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-3xl font-bold tracking-tight">List an item</h1>
          <p className="text-muted-foreground">
            Add your item in seconds — Gemini writes the description, suggests a price, and checks for scams.
          </p>
        </div>
        <div className="mt-8">
          <CreateListingForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
