import { BookOpen, Repeat2, MapPin, UsersRound } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Made for student life",
    desc: "Textbooks, desk lamps, calculators, and all the things that make a semester easier.",
  },
  {
    icon: Repeat2,
    title: "Keep good things moving",
    desc: "Pass along items you no longer need and help another student get more use out of them.",
  },
  {
    icon: MapPin,
    title: "Stay close to campus",
    desc: "Browse with simple search and category filters, then arrange a public campus meetup.",
  },
  {
    icon: UsersRound,
    title: "A student-first idea",
    desc: "CampusLoop is designed around the people who know campus life best: students.",
  },
]

export function AiShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-medium text-primary">The CampusLoop idea</p>
        <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight md:text-4xl">
          Campus life has a secondhand side
        </h2>
        <p className="mt-3 text-pretty text-muted-foreground">
          Useful things move between students every semester. CampusLoop gives those exchanges a place to start.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
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
