import Link from "next/link"
import Image from "next/image"
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, MapPin, Repeat2, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="hero-grid relative isolate overflow-hidden">
      <div aria-hidden className="hero-orb hero-orb-one" />
      <div aria-hidden className="hero-orb hero-orb-two" />
      <div aria-hidden className="hero-orb hero-orb-three" />

      <div className="mx-auto grid min-h-[660px] max-w-7xl items-center gap-10 px-5 pb-16 pt-14 sm:px-8 md:grid-cols-[1.02fr_.98fr] md:gap-4 md:pb-24 md:pt-20">
        <div className="relative z-10 flex flex-col items-start gap-7">
          <div className="hero-enter inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-xs font-medium tracking-wide text-slate-300 shadow-[0_6px_32px_rgba(6,8,20,.18)] backdrop-blur-xl" style={{ animationDelay: "40ms" }}>
            <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-40" /><span className="relative inline-flex size-2 rounded-full bg-emerald-300" /></span>
            A campus exchange, reimagined
            <ArrowUpRight className="ml-1 size-3.5 text-slate-500" />
          </div>

          <h1 className="hero-enter max-w-3xl text-balance font-display text-[3.5rem] font-semibold leading-[.99] tracking-[-.065em] text-white sm:text-6xl lg:text-[5.5rem]" style={{ animationDelay: "130ms" }}>
            Good things
            <br />
            <span className="hero-title-gradient">go around.</span>
          </h1>

          <p className="hero-enter max-w-lg text-pretty text-base leading-7 text-slate-400 sm:text-lg sm:leading-8" style={{ animationDelay: "220ms" }}>
            Find the useful stuff already on campus. Pass along what you no longer need. A student marketplace concept built for the life between lectures.
          </p>

          <div className="hero-enter flex w-full flex-col gap-3 sm:w-auto sm:flex-row" style={{ animationDelay: "310ms" }}>
            <Link href="/auth?mode=signup" className="loop-button group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition-transform hover:-translate-y-0.5">
              Create your account <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/marketplace" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[.035] px-6 text-sm font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[.07]">
              Explore the preview
            </Link>
          </div>

          <div className="hero-enter flex items-center gap-2 text-sm text-slate-500" style={{ animationDelay: "400ms" }}>
            Already part of the loop?
            <Link href="/auth?mode=login" className="font-semibold text-violet-200 underline decoration-violet-400/40 underline-offset-4 transition-colors hover:text-white">Log in</Link>
          </div>

          <div className="hero-enter mt-1 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[.08] pt-5 text-xs text-slate-500" style={{ animationDelay: "480ms" }}>
            <span className="inline-flex items-center gap-2"><BookOpen className="size-3.5 text-violet-300" /> Useful campus finds</span>
            <span className="inline-flex items-center gap-2"><Repeat2 className="size-3.5 text-cyan-300" /> Reuse by design</span>
            <span className="inline-flex items-center gap-2"><MapPin className="size-3.5 text-emerald-300" /> Meet in public</span>
          </div>
        </div>

        <div className="hero-enter relative mx-auto w-full max-w-[600px] md:ml-auto" style={{ animationDelay: "220ms" }}>
          <div aria-hidden className="hero-image-ring absolute -inset-5 rounded-[2.5rem] opacity-60 blur-2xl" />
          <div className="hero-visual relative aspect-[.98] overflow-hidden rounded-[2rem] border border-white/[.12] bg-[#12172a] p-2 shadow-[0_35px_100px_rgba(0,0,0,.5)] sm:aspect-[1.06]">
            <div className="relative h-full w-full overflow-hidden rounded-[1.45rem]">
              <Image src="/images/hero-campus.png" alt="Illustration of students sharing useful items on campus" fill priority sizes="(max-width: 768px) 100vw, 560px" className="object-cover opacity-[.84]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d19]/95 via-[#0a0d19]/5 to-[#0a0d19]/15" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-200/80">The campus loop</p>
                <p className="mt-2 max-w-xs font-display text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl">Use it. Love it.<br />Pass it on.</p>
              </div>
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-2 text-xs text-white/80 backdrop-blur-xl sm:left-5 sm:top-5">
                <Sparkles className="size-3.5 text-violet-200" /> Made for campus life
              </div>
            </div>
          </div>

          <div className="hero-float hero-float-top absolute -right-2 top-[16%] hidden rounded-2xl border border-white/10 bg-[#171a2a]/90 p-3.5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:block md:-right-5">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-200"><BookOpen className="size-5" /></span>
              <div><p className="text-xs text-slate-400">One more semester</p><p className="mt-0.5 text-sm font-semibold text-white">Starts with a good find</p></div>
            </div>
          </div>
          <div className="hero-float hero-float-bottom absolute -left-2 bottom-[12%] hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#171a2a]/90 p-3.5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:flex md:-left-8">
            <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-200"><Repeat2 className="size-5" /></span>
            <div><p className="text-sm font-semibold text-white">Keep it in the loop</p><p className="mt-0.5 text-xs text-slate-400">A second life for useful things</p></div>
          </div>
          <div className="absolute -bottom-9 right-4 hidden text-xs text-slate-600 md:block">Scroll to explore <ArrowDown className="ml-1 inline size-3" /></div>
        </div>
      </div>
    </section>
  )
}
