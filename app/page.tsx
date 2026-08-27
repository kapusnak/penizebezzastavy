import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileCheck,
  Home,
  Shield,
  Users,
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
  },
  {
    icon: FileCheck,
    title: "Bez zápisu do katastru",
    text: "Na list vlastnictví se nezapisuje nové zástavní právo.",
  },
  {
    icon: Users,
    title: "Vhodné i při spoluvlastnictví",
    text: "Nemusíte řešit souhlas dalších spoluvlastníků se zástavou.",
  },
  {
    icon: Shield,
    title: "Diskrétní a rychlé řešení",
    text: "Individuální přístup, rychlé posouzení a rozhodnutí.",
  },
] as const

const PARAMS = [
  { label: "Výše úvěru", value: "až 300 000 Kč" },
  {
    label: "Zajištění",
    value: "notářský zápis se svolením k vykonatelnosti (bez zástavy nemovitosti)",
  },
  {
    label: "Účel úvěru",
    value:
      "variabilní dle potřeb vašeho podnikání např. investice, provoz, nákup vybavení, automobilu, nemovitosti, refinancování závazků a další",
  },
  { label: "Doba splatnosti", value: "flexibilní dle dohody" },
  { label: "Vyplacení peněz", value: "do 2 dnů od schválení" },
] as const

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

      <section className="bg-white pt-28 pb-16 md:pt-32 md:pb-20">
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

          <div className="relative">
            <img
              src="/hero-house.jpg"
              alt="Moderní dům"
              className="h-[280px] w-full rounded-3xl object-cover shadow-xl sm:h-[380px] lg:h-[440px]"
            />
            <div className="absolute right-4 bottom-4 left-4 rounded-2xl bg-primary/95 p-4 text-white shadow-lg backdrop-blur-sm sm:right-6 sm:bottom-6 sm:left-auto sm:max-w-xs">
              <p className="text-sm leading-snug">
                Získejte <span className="font-bold text-gold">až 300 000 Kč</span> bez zástavy nemovitosti.
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/85">
                <Clock className="h-4 w-4 text-gold" />
                Peníze do 2 dnů od schválení.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="vyhody" className="scroll-mt-28 bg-background py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((item) => (
              <article key={item.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <item.icon className="h-6 w-6" />
                </div>
                <h2 className="font-display text-lg font-bold text-foreground">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="podminky" className="scroll-mt-28 bg-white py-16 md:py-20">
        <div className="container mx-auto grid items-start gap-10 px-4 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="font-display text-2xl font-bold text-primary md:text-3xl">
              Úvěr, který se přizpůsobí vašemu podnikání.
            </h2>
            <dl className="mt-8 space-y-5">
              {PARAMS.map((item) => (
                <div key={item.label} className="border-b border-border pb-4 last:border-0">
                  <dt className="text-sm font-semibold text-accent">{item.label}</dt>
                  <dd className="mt-1 leading-relaxed text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <LoanCalculator />
        </div>
      </section>

      <section id="jak-to-funguje" className="scroll-mt-28 bg-background py-16 md:py-20">
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
