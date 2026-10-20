"use client"

import Link from "next/link"
import { CATEGORIES, MEETUP_SPOTS } from "@/lib/data"
import { useAuth } from "@/context/auth-context"

export function CreateListingForm() {
  const { user, isLoading } = useAuth()

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <form className="grid gap-5" onSubmit={(event) => event.preventDefault()}>
        <label className="grid gap-2 text-sm font-medium" htmlFor="listing-title">
          Item title
          <input id="listing-title" className="h-11 rounded-xl border border-input bg-background px-3 font-normal" placeholder="e.g. Scientific calculator" disabled />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium" htmlFor="listing-category">
            Category
            <select id="listing-category" className="h-11 rounded-xl border border-input bg-background px-3 font-normal" disabled defaultValue="">
              <option value="">Choose a category</option>
              {CATEGORIES.map(({ name }) => <option key={name}>{name}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium" htmlFor="listing-condition">
            Condition
            <select id="listing-condition" className="h-11 rounded-xl border border-input bg-background px-3 font-normal" disabled defaultValue="">
              <option value="">Choose condition</option>
              {(["New", "Like New", "Good", "Fair"] as const).map((condition) => <option key={condition}>{condition}</option>)}
            </select>
          </label>
        </div>
        <label className="grid gap-2 text-sm font-medium" htmlFor="listing-description">
          Description
          <textarea id="listing-description" className="min-h-32 rounded-xl border border-input bg-background p-3 font-normal" placeholder="Describe the item, its condition, and anything included." disabled />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium" htmlFor="listing-price">
            Price (₹)
            <input id="listing-price" type="number" min="0" className="h-11 rounded-xl border border-input bg-background px-3 font-normal" placeholder="0" disabled />
          </label>
          <label className="grid gap-2 text-sm font-medium" htmlFor="listing-meetup">
            Suggested meetup
            <select id="listing-meetup" className="h-11 rounded-xl border border-input bg-background px-3 font-normal" disabled defaultValue="">
              <option value="">Choose a public spot</option>
              {MEETUP_SPOTS.map((spot) => <option key={spot}>{spot}</option>)}
            </select>
          </label>
        </div>
        <label className="grid gap-2 text-sm font-medium" htmlFor="listing-images">
          Photos
          <input id="listing-images" type="file" accept="image/*" multiple className="rounded-xl border border-input bg-background p-3 font-normal" disabled />
        </label>
        <button type="button" disabled className="h-12 rounded-xl bg-primary px-5 font-semibold text-primary-foreground opacity-60">
          Listing publishing is not connected
        </button>
        {!isLoading && !user && <p className="text-sm text-muted-foreground">You can <Link className="text-primary underline" href="/auth?mode=signup">create a student account</Link> while listing services are being set up.</p>}
      </form>

      <aside className="h-fit rounded-2xl border border-border bg-card p-5">
        <h2 className="font-display text-lg font-semibold">What’s needed to publish</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          This repository has no listing database or image storage configured. The form stays unavailable until a persistent backend, authenticated ownership checks, and image storage are connected.
        </p>
      </aside>
    </div>
  )
}
