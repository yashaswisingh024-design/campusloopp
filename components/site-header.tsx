"use client"

import Link from "next/link"
import { useState } from "react"
import { Repeat, Menu, X, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"

const navLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/sell", label: "Sell" },
  { href: "/ambassador", label: "Ambassador" },
  { href: "/messages", label: "Messages" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Repeat className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">CampusLoop</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Provider-backed auth state */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              {user.college && <span className="hidden max-w-40 truncate text-xs text-muted-foreground lg:inline">{user.college}</span>}
              <div className="flex items-center gap-2 font-medium text-sm text-foreground px-2">
                <User size={16} className="text-primary" />
                <span>{user.name || 'Student'}</span>
              </div>
              <Link className="hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3" href="/profile">Profile</Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
                className="gap-1.5 text-xs text-muted-foreground hover:text-destructive"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground" href="/auth?mode=login">Log in</Link>
              <Link className="loop-button rounded-full px-4 py-2 text-sm font-semibold text-white" href="/auth?mode=signup">Create account</Link>
            </>
          )}
        </div>

        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-navigation" className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-border/60 flex flex-col gap-2">
              {user ? (
                <>
                  <Link href="/profile" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">Student profile</Link>
                  <div className="flex items-center justify-between text-sm px-3 py-1 font-medium">
                    <span>{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.college}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setOpen(false)
                      logout()
                    }}
                    className="w-full justify-center gap-1.5"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link className="flex h-11 w-full items-center justify-center rounded-xl border border-white/10 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground" href="/auth?mode=login" onClick={() => setOpen(false)}>
                    Log in
                  </Link>
                  <Link className="loop-button flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold text-white" href="/auth?mode=signup" onClick={() => setOpen(false)}>
                    Create account
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
