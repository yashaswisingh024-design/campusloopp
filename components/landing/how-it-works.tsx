import { MailCheck, ListPlus, Sparkles, MessageCircle, MapPin, Handshake } from "lucide-react"

const steps = [
  { icon: MailCheck, title: "Verify", desc: "Sign up with your college email (.edu / .ac.in) to join your verified campus." },
  { icon: ListPlus, title: "List", desc: "Add your item's name, condition, and photos in seconds." },
  { icon: Sparkles, title: "AI Optimizes", desc: "Gemini writes the description, suggests a price, and scans for scams." },
  { icon: MessageCircle, title: "Chat", desc: "Buyers reach out — negotiate and answer questions in real time." },
  { icon: MapPin, title: "Meet", desc: "Pick a safe campus spot like the library or cafeteria to exchange." },
  { icon: Handshake, title: "Trade", desc: "Complete the deal and earn leaderboard points and rewards." },
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
            From listing to handshake in six steps
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
