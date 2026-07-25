import {
  BadgeCheck,
  Wand2,
  TrendingUp,
  Search,
  ShieldAlert,
  MessagesSquare,
  MapPin,
  Trophy,
  LayoutDashboard,
} from "lucide-react"

const features = [
  {
    icon: BadgeCheck,
    title: "Verified Student Marketplace",
    desc: "Only authenticated students from registered colleges can join, creating a closed, trusted network.",
    tint: "var(--brand-blue)",
  },
  {
    icon: Wand2,
    title: "AI Listing Generator",
    desc: "Enter a product name and condition — Gemini writes professional titles, descriptions, and selling points.",
    tint: "var(--brand-purple)",
  },
  {
    icon: TrendingUp,
    title: "Smart Price Recommendations",
    desc: "Gemini analyzes category, age, and market condition to suggest a fair price that sells faster.",
    tint: "var(--brand-green)",
  },
  {
    icon: Search,
    title: "Natural Language Search",
    desc: '"Laptop under ₹25,000 near hostel" — Gemini converts plain English into structured filters.',
    tint: "var(--brand-blue)",
  },
  {
    icon: ShieldAlert,
    title: "AI Scam Detection",
    desc: "Every listing is scanned for fraud keywords, unrealistic pricing, and risky behavior before going live.",
    tint: "var(--brand-purple)",
  },
  {
    icon: MessagesSquare,
    title: "Real-Time Student Chat",
    desc: "Negotiate, ask questions, share images, and schedule meetups through secure in-app messaging.",
    tint: "var(--brand-green)",
  },
  {
    icon: MapPin,
    title: "Campus Meetups",
    desc: "Exchange safely at designated spots — library, cafeteria, hostel lobby, or the student center.",
    tint: "var(--brand-blue)",
  },
  {
    icon: Trophy,
    title: "Leaderboard & Rewards",
    desc: "Earn points, badges, and marketplace credits through the Student Ambassador program.",
    tint: "var(--brand-purple)",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboard",
    desc: "Full platform monitoring: user management, moderation, scam review, and marketplace analytics.",
    tint: "var(--brand-green)",
  },
]

export function FeaturesGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="brand-gradient-text mb-2 text-sm font-semibold uppercase tracking-wider">Everything you need</p>
        <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
          A complete, AI-first trading toolkit for campus
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground">
          CampusLoop combines verified identities, Google Gemini intelligence, and real-time communication into one
          safe platform.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="group glass relative overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
          >
            <span
              aria-hidden
              className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-15 blur-2xl transition-opacity group-hover:opacity-30"
              style={{ backgroundColor: f.tint }}
            />
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ backgroundColor: `color-mix(in oklch, ${f.tint} 18%, transparent)`, color: f.tint }}
            >
              <f.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold">{f.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
