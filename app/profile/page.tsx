"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserRound } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  return <div className="flex min-h-screen flex-col"><SiteHeader /><main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">
    <Link href="/marketplace" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />Back to marketplace</Link>
    <div className="mt-8 rounded-3xl border border-border bg-card p-6 sm:p-10">
      {isLoading ? <p className="text-muted-foreground">Loading account…</p> : user ? <>
        <div className="flex items-center gap-4"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary"><UserRound className="h-7 w-7" /></span><div><p className="text-sm text-muted-foreground">Student profile</p><h1 className="font-display text-2xl font-bold">{user.name}</h1></div></div>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2"><div className="rounded-xl border border-border p-4"><dt className="text-xs uppercase tracking-wider text-muted-foreground">Email</dt><dd className="mt-1 break-all font-medium">{user.email}</dd></div><div className="rounded-xl border border-border p-4"><dt className="text-xs uppercase tracking-wider text-muted-foreground">College</dt><dd className="mt-1 font-medium">{user.college || "Not set on this account"}</dd></div></dl>
        <p className="mt-6 rounded-xl border border-border bg-background p-4 text-sm text-muted-foreground">Your account is managed by Netlify Identity. Listings and profile editing are not connected to a persistent application database yet.</p>
        <Button className="mt-6" variant="outline" onClick={async () => { await logout(); router.push("/"); }}>Sign out</Button>
      </> : <><h1 className="font-display text-2xl font-bold">Sign in to view your profile</h1><p className="mt-2 text-muted-foreground">Your student profile appears here after signing in.</p><Link href="/auth?mode=login" className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Sign in</Link></>}
    </div>
  </main><SiteFooter /></div>;
}
