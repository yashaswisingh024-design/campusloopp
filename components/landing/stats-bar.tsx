export function StatsBar() {
  return (
    <section className="border-y border-border/60 bg-card">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3">
        {[
          ["Buy nearby", "Find useful things from your campus community."],
          ["Sell simply", "Give good items another semester of use."],
          ["Meet in public", "Arrange an exchange at a familiar campus spot."],
        ].map(([title, description]) => (
          <div key={title} className="text-center sm:text-left">
            <p className="font-display text-lg font-semibold text-foreground">{title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
