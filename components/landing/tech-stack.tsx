const stack = [
  { name: "React 19", cat: "Frontend" },
  { name: "TypeScript", cat: "Language" },
  { name: "Tailwind CSS", cat: "Styling" },
  { name: "Next.js", cat: "Framework" },
  { name: "Node.js", cat: "Backend" },
  { name: "Neon Postgres", cat: "Database" },
  { name: "Google Gemini", cat: "AI" },
  { name: "Vercel AI SDK", cat: "AI" },
  { name: "Lucide Icons", cat: "Icons" },
  { name: "shadcn/ui", cat: "Components" },
]

export function TechStack() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="glass-strong relative overflow-hidden rounded-3xl p-8 md:p-12">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-10">
          <div className="brand-gradient-bg h-full w-full" />
        </div>
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="brand-gradient-text mb-2 text-sm font-semibold uppercase tracking-wider">Built with</p>
          <h2 className="text-balance font-display text-2xl font-bold tracking-tight sm:text-3xl">
            A modern, production-grade stack
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {stack.map((s) => (
            <div key={s.name} className="glass flex items-center gap-2 rounded-full px-4 py-2">
              <span className="text-sm font-semibold">{s.name}</span>
              <span className="text-xs text-muted-foreground">{s.cat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
