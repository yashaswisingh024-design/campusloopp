"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { FormEvent } from "react";
import { AlertCircle, Eye, EyeOff, Lock, Mail, Repeat, User } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { CollegeSelect } from "@/components/college-select";

export function AuthPageComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"signup" | "login">(searchParams.get("mode") === "login" ? "login" : "signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("A P Shah Institute of Technology (APSIT, Thane)");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { loginWithCollege, signUpWithCollege, loginWithGoogle } = useAuth();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "signup") await signUpWithCollege({ name, email, college, password });
      else await loginWithCollege(email, password);
      router.push("/marketplace");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Authentication failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function googleSignIn() {
    setError("");
    try { loginWithGoogle(); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Google sign-in could not be started."); }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b1020] p-4 text-slate-100 sm:p-6">
      <div aria-hidden className="pointer-events-none absolute -left-28 top-1/4 h-96 w-96 rounded-full bg-violet-700/15 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
      <section className="relative z-10 w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#121a2c]/95 p-6 shadow-2xl shadow-black/30 sm:p-10">
        <Link href="/" className="mx-auto flex w-fit items-center gap-2 text-xl font-bold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600"><Repeat className="h-5 w-5" /></span>
          Campus<span className="-ml-2 text-violet-300">Loop</span>
        </Link>
        <p className="mt-7 text-center text-sm font-medium text-violet-300">Your campus, in the loop</p>
        <h1 className="mt-2 text-center font-display text-3xl font-bold tracking-tight">{mode === "signup" ? "Create your student account" : "Welcome back"}</h1>
        <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-relaxed text-slate-400">
          {mode === "signup" ? "Use your college email to get started." : "Sign in with your college email."}
        </p>

        {error && <div role="alert" className="mt-6 flex gap-2 rounded-xl border border-red-400/25 bg-red-950/40 p-3 text-sm text-red-200"><AlertCircle className="h-5 w-5 shrink-0" />{error}</div>}

        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode === "signup" && <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Full name
            <span className="relative"><User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" /><input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="h-12 w-full rounded-xl border border-white/10 bg-[#0b1020] pl-10 pr-3 text-sm normal-case tracking-normal text-white placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500" /></span>
          </label>}
          <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">College email
            <span className="relative"><Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" /><input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@college.edu" className="h-12 w-full rounded-xl border border-white/10 bg-[#0b1020] pl-10 pr-3 text-sm normal-case tracking-normal text-white placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500" /></span>
            {mode === "signup" && <span className="font-normal normal-case tracking-normal text-slate-500">Domain matching is a signup check, not official student verification.</span>}
          </label>
          {mode === "signup" && <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">College
            <CollegeSelect value={college} onChange={(event) => setCollege(event.target.value)} />
          </label>}
          <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Password
            <span className="relative"><Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" /><input required minLength={6} type={showPassword ? "text" : "password"} autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" className="h-12 w-full rounded-xl border border-white/10 bg-[#0b1020] pl-10 pr-12 text-sm normal-case tracking-normal text-white placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500" /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-white">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></span>
          </label>
          <button disabled={busy} type="submit" className="h-12 w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 disabled:opacity-60">{busy ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}</button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-slate-500"><span className="h-px flex-1 bg-white/10" />OR<span className="h-px flex-1 bg-white/10" /></div>
        <button type="button" onClick={googleSignIn} className="h-12 w-full rounded-xl border border-white/10 bg-[#0b1020] font-medium transition hover:border-violet-400/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500">Continue with Google</button>
        <p className="mt-6 text-center text-sm text-slate-400">{mode === "signup" ? "Already have an account?" : "New to CampusLoop?"}{" "}<button type="button" onClick={() => { setError(""); setMode(mode === "signup" ? "login" : "signup"); }} className="font-semibold text-violet-300 underline-offset-4 hover:underline">{mode === "signup" ? "Sign in" : "Create account"}</button></p>
        <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">APAAR sign-in is unavailable because this project has no authorized APAAR verification integration. Referral rewards are also not configured.</p>
      </section>
    </main>
  );
}
