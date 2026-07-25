import Image from "next/image"
import { Wand2, ShieldAlert, MessagesSquare } from "lucide-react"

export function DemoShowcase() {
  return (
    <section id="demo" className="mx-auto max-w-6xl px-4 py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="brand-gradient-text mb-2 text-sm font-semibold uppercase tracking-wider">See it in action</p>
        <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Designed for how students actually trade
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass overflow-hidden rounded-3xl">
          <div className="relative aspect-[16/10] border-b border-border">
            <Image
              src="/images/demo-marketplace.png"
              alt="CampusLoop marketplace browse view with product cards and filters"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
          <div className="flex items-start gap-3 p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_oklch,var(--brand-blue)_18%,transparent)] text-[var(--brand-blue)]">
              <Wand2 className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold">Smart, AI-optimized listings</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Browse verified items with AI-written descriptions, fair-price badges, and risk scores at a glance.
              </p>
            </div>
          </div>
        </div>

        <div className="glass overflow-hidden rounded-3xl">
          <div className="relative aspect-[16/10] border-b border-border">
            <Image
              src="/images/demo-chat.png"
              alt="CampusLoop real-time student chat with AI suggestions"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
          <div className="flex items-start gap-3 p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_oklch,var(--brand-green)_18%,transparent)] text-[var(--brand-green)]">
              <MessagesSquare className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold">Real-time chat, backed by AI</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Negotiate safely with an AI seller simulator to practice, plus scam alerts that flag risky messages.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <ShieldAlert className="h-4 w-4 text-accent" />
        Every conversation and listing is protected by Gemini scam detection.
      </div>
    </section>
  )
}
