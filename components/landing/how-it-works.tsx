import { MailCheck, Search, SlidersHorizontal, MessageCircle, MapPin, Handshake } from "lucide-react"

const steps = [
  { icon: MailCheck, title: "Join", desc: "Create an account with your college email. Domain matching is not official student verification." },
  { icon: Search, title: "Explore", desc: "Browse sample campus items using title search, categories, and price sorting." },
  { icon: SlidersHorizontal, title: "Choose", desc: "Compare item details and decide what fits your needs." },
  { icon: MessageCircle, title: "Connect", desc: "Messaging is planned, but isn't connected in this build yet." },
  { icon: MapPin, title: "Meet", desc: "If arranging an exchange independently, choose a public place and inspect the item." },
  { icon: Handshake, title: "Pass it on", desc: "Listing and transaction services are still being connected." },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brand-purple)] opacity-[0.07] blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="brand-gradient-text mb-2 text-sm font-semibold uppercase tracking-wider">How it works</p>
          <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
            A campus exchange starts with a good find
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="glass relative rounded-2xl p-6">
              <span className="brand-gradient-text absolute right-5 top-4 font-display text-3xl font-bold opacity-40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1.5 font-display text-lg font-semibold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
