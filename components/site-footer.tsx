import Link from "next/link"
import { Repeat } from "lucide-react"

const columns = [
  {
    title: "Marketplace",
    links: [
      { label: "Browse items", href: "/marketplace" },
      { label: "Sell an item", href: "/sell" },
      { label: "Categories", href: "/marketplace" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "About the preview", href: "/#features" },
      { label: "Messaging status", href: "/messages" },
    ],
  },
  {
    title: "Trust & Safety",
    links: [
      { label: "Meetup guidance", href: "/#how-it-works" },
      { label: "Account access", href: "/auth?mode=signup" },
      { label: "Admin availability", href: "/admin" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Repeat className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight">CampusLoop</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A marketplace concept for useful things finding their next home on campus.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} CampusLoop. A campus marketplace concept.</p>
          <p>Buy. Sell. Swap. Repeat.</p>
        </div>
      </div>
    </footer>
  )
}
