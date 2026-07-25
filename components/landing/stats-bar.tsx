const stats = [
  { value: "12,400+", label: "Verified students" },
  { value: "38,000+", label: "Items traded" },
  { value: "₹4.1 Cr", label: "Saved by students" },
  { value: "4.9/5", label: "Avg. seller rating" },
]

export function StatsBar() {
  return (
    <section className="border-y border-border/60 bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-2xl font-bold text-foreground md:text-3xl">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
