import type { ReactNode } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  FileText,
  Home,
  Lock,
  Shield,
  ShieldCheck,
  Target,
  TimerReset,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { LeadPopup } from "@/components/lead-popup"
import { LoanCalculator } from "@/components/loan-calculator"
import { ProcessSteps } from "@/components/process-steps"

const HERO_BULLETS = [
  "Až 300 000 Kč bez zástavy nemovitosti",
  "Bez zápisu zástavního práva do katastru",
  "Rychlé posouzení a peníze do 2 dnů",
  "Pro podnikatele a OSVČ",
] as const

const BENEFITS = [
  {
    icon: Home,
    title: "Bez zástavy nemovitosti",
    text: "Nemovitost se nezastavuje, nezapisuje se zástavní právo.",
    cancelled: true,
  },
  {
    icon: FileText,
    title: "Bez zápisu do katastru",
    text: "Na list vlastnictví se nezapisuje nové zástavní právo.",
    cancelled: true,
  },
  {
    icon: Users,
    title: "Vhodné i při spoluvlastnictví",
    text: "Nemusíte řešit souhlas dalších spoluvlastníků se zástavou.",
    cancelled: false,
  },
  {
    icon: Lock,
    title: "Diskrétní a rychlé řešení",
    text: "Individuální přístup, rychlé posouzení a rozhodnutí.",
    cancelled: false,
  },
] as const

function BanknotePlus({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <path d="M12 9.5v5M9.5 12h5" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  )
}

const PARAMS: {
  icon: LucideIcon | typeof BanknotePlus
  label: string
  value: ReactNode
}[] = [
  {
    icon: BanknotePlus,
    label: "Výše úvěru",
    value: <span className="font-bold">až 300 000 Kč</span>,
  },
  {
    icon: ShieldCheck,
    label: "Zajištění",
    value: "notářský zápis se svolením k vykonatelnosti (bez zástavy nemovitosti)",
  },
  {
    icon: Target,
    label: "Účel úvěru",
    value:
      "variabilní dle potřeb vašeho podnikání např. investice, provoz, nákup vybavení, automobilu, nemovitosti, refinancování závazků a další.",
  },
  {
    icon: CalendarClock,
    label: "Doba splatnosti",
    value: <span className="font-bold">flexibilní dle dohody</span>,
  },
  {
    icon: Wallet,
    label: "Vyplacení peněz",
    value: (
      <>
        <span className="font-bold">do 2 dnů</span> od schválení
      </>
    ),
  },
]

const AUDIENCE = [
  "Podnikatelé a OSVČ.",
  "Úvěr souvisí s podnikatelskou činností.",
  "Vlastník nebo vztah k nemovitosti.",
  "Bez zbytečných průtahů a papírování.",
] as const

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="bg-white pt-28 pb-10 md:pt-32 md:pb-12">
        <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <h1 className="font-display text-3xl leading-tight font-extrabold text-primary sm:text-4xl lg:text-5xl">
              Vlastníte nemovitost,{" "}
              <span className="text-accent">ale nechcete ji zastavovat?</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Podnikatelský úvěr <span className="font-semibold text-accent">bez zástavy</span> nemovitosti a bez
              zápisu do katastru.
            </p>
            <ul className="mt-6 space-y-3">
              {HERO_BULLETS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="/#poptavka"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold tracking-wide text-accent-foreground uppercase transition-colors hover:bg-[#5cb860]"
              >
                Nezávazně posoudit žádost
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-5 w-5 text-accent" />
                100% diskrétně a nezávazně
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl shadow-xl sm:overflow-visible sm:rounded-none sm:shadow-none">
            <img
              src="/hero-house.jpg"
              alt="Moderní dům"
              className="h-[280px] w-full object-cover sm:h-[380px] sm:rounded-3xl sm:shadow-xl lg:h-[440px]"
            />
            <aside
              className="sm:absolute sm:right-6 sm:bottom-7 sm:left-auto sm:w-[17.75rem]"
              aria-label="Klíčové parametry úvěru"
            >
              <div className="overflow-hidden bg-primary text-white sm:rounded-2xl sm:shadow-[0_22px_50px_rgba(13,27,42,0.45)] sm:ring-1 sm:ring-white/15">
                <div className="px-5 pt-5 pb-4">
                  <p className="text-[13px] font-medium text-white/90">Získejte</p>
                  <p className="mt-1 font-display text-[1.7rem] leading-none font-extrabold tracking-tight text-gold">
                    až 300 000 Kč
                  </p>
                  <p className="mt-2 text-[15px] leading-snug font-semibold">bez zástavy nemovitosti</p>
                </div>
                <div className="mx-5 h-px bg-white/25" />
                <div className="flex items-center gap-3 px-5 py-4">
                  <TimerReset className="h-8 w-8 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
                  <p className="text-sm leading-snug">
                    <span className="font-semibold">Peníze do 2 dnů</span>
                    <span className="mt-0.5 block text-[13px] text-white/75">od schválení</span>
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="vyhody" className="scroll-mt-28 border-t border-border bg-white py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border">
            {BENEFITS.map((item) => (
              <article key={item.title} className="flex items-start gap-3 lg:px-6 first:lg:pl-0 last:lg:pr-0">
                <span className="relative mt-0.5 inline-flex shrink-0 text-primary">
                  <item.icon className="h-8 w-8" strokeWidth={1.5} aria-hidden />
                  {item.cancelled ? (
                    <span className="absolute -right-1.5 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-white">
                      <X className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                    </span>
                  ) : null}
                </span>
                <div>
                  <h2 className="font-display text-[15px] leading-snug font-bold text-primary">{item.title}</h2>
                  <p className="mt-1 text-sm leading-snug text-primary/75">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="podminky" className="scroll-mt-28 bg-white py-16 md:py-20">
        <div className="container mx-auto grid items-start gap-10 px-4 lg:grid-cols-2 lg:gap-14">
          <div className="rounded-[2rem] bg-[#f3f5f7] px-7 py-9 shadow-[0_10px_40px_rgba(13,27,42,0.05)] sm:px-9 sm:py-10 md:px-11 md:py-12">
            <h2 className="font-display text-[1.65rem] leading-snug font-bold text-primary md:text-[2rem]">
              Úvěr, který se přizpůsobí vašemu podnikání
            </h2>
            <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-3.5 gap-y-6 sm:grid-cols-[auto_max-content_minmax(0,1fr)] sm:gap-x-5 md:mt-10 md:gap-y-7">
              {PARAMS.map((item) => (
                <div
                  key={item.label}
                  className="col-span-2 grid grid-cols-subgrid items-start gap-y-1 sm:col-span-3"
                >
                  <span className="mt-0.5 inline-flex text-accent">
                    <item.icon className="h-7 w-7" strokeWidth={1.5} aria-hidden />
                  </span>
                  <dt className="pr-6 font-display font-bold text-primary sm:pr-10">{item.label}</dt>
                  <dd className="col-start-2 leading-relaxed text-primary sm:col-start-3">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <LoanCalculator />
        </div>
      </section>

      <section id="jak-to-funguje" className="scroll-mt-28 bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <ProcessSteps />
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 shadow-sm md:p-10">
            <h2 className="font-display text-2xl font-bold text-primary md:text-3xl">Komu je úvěr určen?</h2>
            <ul className="mt-6 space-y-3">
              {AUDIENCE.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-primary py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-base font-medium text-white md:text-lg">
            Propojujeme vaše finanční potřeby s možnostmi soukromých investorů.
          </p>
          <Link
            href="/jak-to-funguje"
            className="mt-3 inline-block text-sm text-gold underline-offset-2 hover:underline"
          >
            Jak to funguje a časté dotazy
          </Link>
        </div>
      </section>

      <Footer />
      <LeadPopup />
    </main>
  )
}
