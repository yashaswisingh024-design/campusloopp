import { MailCheck, Sparkles, MessagesSquare, MapPin } from "lucide-react"

const steps = [
  {
    icon: MailCheck,
    title: "Verify with your college email",
    desc: "Register with your institutional email (.edu / .ac.in). No fake accounts, no strangers.",
  },
  {
    icon: Sparkles,
    title: "List in seconds with AI",
    desc: "Gemini writes your description and suggests a fair price. Scam detection scans it before it goes live.",
  },
  {
    icon: MessagesSquare,
    title: "Chat and negotiate safely",
    desc: "Message verified students directly to ask questions, negotiate, and plan the exchange.",
  },
  {
    icon: MapPin,
    title: "Meet on campus & earn points",
    desc: "Swap at safe spots like the library or cafeteria, then climb the leaderboard.",
  },
]

export function HowItWorks() {
  return (
    <section className="border-y border-border/60 bg-card">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-medium text-primary">How it works</p>
          <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight md:text-4xl">
            From listing to handshake in four steps
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="relative flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <step.icon className="h-5 w-5" />
                </span>
                <span className="font-display text-2xl font-bold text-muted-foreground/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
