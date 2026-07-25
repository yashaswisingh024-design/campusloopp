import Link from "next/link"
import { Construction } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-4 px-4 py-20 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
          <Construction className="h-7 w-7" />
        </span>
        <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
        <p className="max-w-md text-pretty text-muted-foreground">{description}</p>
        <Button asChild className="mt-2">
          <Link href="/marketplace">Explore the marketplace</Link>
        </Button>
      </main>
      <SiteFooter />
    </div>
  )
}
