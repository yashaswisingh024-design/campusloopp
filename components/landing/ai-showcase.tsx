import { PenLine, TrendingUp, Search, ShieldAlert } from "lucide-react"

const aiFeatures = [
  {
    icon: PenLine,
    title: "AI Listing Generator",
    desc: "Enter a product name and condition — Gemini writes a professional title, description, and selling points instantly.",
  },
  {
    icon: TrendingUp,
    title: "Smart Price Recommendation",
    desc: "Gemini analyzes category, age, and market condition to suggest a fair price that actually sells.",
  },
  {
    icon: Search,
    title: "Natural Language Search",
    desc: "Search like you talk — “cheap engineering drawing kit near hostel” becomes structured filters automatically.",
  },
  {
    icon: ShieldAlert,
    title: "AI Scam Detection",
    desc: "Every listing is scanned for fraud signals before going live, with risk levels shown to buyers and admins.",
  },
]

export function AiShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-medium text-primary">Intelligence built in</p>
        <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight md:text-4xl">
          Gemini AI does the hard work for you
        </h2>
        <p className="mt-3 text-pretty text-muted-foreground">
          From writing your listing to catching scams, AI makes campus trading faster, smarter, and safer.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {aiFeatures.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
              <feature.icon className="h-5 w-5" />
            </span>
            <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
