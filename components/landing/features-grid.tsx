import {
  Search,
  BookOpen,
  Repeat2,
  MapPin,
} from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Student life essentials",
    desc: "Browse a sample catalogue of books, electronics, transport, and hostel items.",
    tint: "var(--brand-blue)",
  },
  {
    icon: Search,
    title: "Straightforward search",
    desc: "Filter the current preview items by title, description, and category.",
    tint: "var(--brand-purple)",
  },
  {
    icon: Repeat2,
    title: "A second life for good things",
    desc: "CampusLoop is designed to help useful student items move to their next owner.",
    tint: "var(--brand-green)",
  },
  {
    icon: MapPin,
    title: "Meet nearby",
    desc: "The preview suggests public campus spots for an in-person exchange.",
    tint: "var(--brand-blue)",
  },
  {
    icon: MapPin,
    title: "Keep it close",
    desc: "Explore sample campus items and discover a fresh use for everyday essentials.",
    tint: "var(--brand-green)",
  },
]

export function FeaturesGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="brand-gradient-text mb-2 text-sm font-semibold uppercase tracking-wider">The preview</p>
        <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
          A student marketplace taking shape
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground">
          This prototype shows how campus exchange could feel. Its listings are examples; student trading services are not connected yet.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, index) => (
          <div
            key={f.title}
            className="loop-card group glass relative overflow-hidden rounded-2xl p-6"
            style={{ animationDelay: `${index * 90}ms` }}
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
