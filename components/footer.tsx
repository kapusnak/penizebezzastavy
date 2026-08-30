import Link from "next/link"
import { Handshake, Mail, Phone, ShieldCheck, UserRound } from "lucide-react"

import { WhatsAppCard } from "@/components/whatsapp-card"
import { SITE } from "@/lib/site"

const VALUES = [
  {
    icon: Handshake,
    title: "Bezpečné a férové jednání",
    text: "Transparentní podmínky, jasná pravidla, žádné skryté poplatky.",
  },
  {
    icon: UserRound,
    title: "Individuální přístup",
    text: "Každý případ řešíme individuálně, hledáme nejlepší možné řešení.",
  },
  {
    icon: ShieldCheck,
    title: "Diskrétnost zaručena",
    text: "Vaše informace jsou u nás 100% chráněny.",
  },
] as const

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {VALUES.map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/75">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/80 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-3">
          <a
            href={`tel:${SITE.phonePrimaryTel}`}
            className="group inline-flex items-center gap-3 text-white hover:text-accent"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
              <Phone className="h-5 w-5" />
            </span>
            <span className="font-semibold">{SITE.phonePrimary}</span>
          </a>
          <WhatsAppCard variant="dark" />
          <a
            href={`mailto:${SITE.email}`}
            className="group inline-flex items-center gap-3 hover:text-accent"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
              <Mail className="h-5 w-5" />
            </span>
            <span>{SITE.email}</span>
          </a>
          <span>{SITE.hours}</span>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-white/70">
          {SITE.brand} – podnikatelský úvěr bez zástavy nemovitosti a bez zápisu do katastru.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-white/55">
          Nejde o spotřebitelský úvěr. Nabídka je určena podnikatelům a OSVČ v souvislosti s podnikatelskou činností.
          Provozovatel: {SITE.controller.name}, IČ {SITE.controller.ico}.
        </p>

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80">
          <Link href="/ochrana-osobnich-udaju" className="hover:text-accent">
            Ochrana osobních údajů
          </Link>
          <Link href="/obchodni-podminky" className="hover:text-accent">
            Obchodní podmínky
          </Link>
          <Link href="/zasady-cookies" className="hover:text-accent">
            Zásady cookies
          </Link>
        </div>

        <p className="mt-6 text-xs text-white/45">
          © {year} {SITE.controller.name}. Všechna práva vyhrazena.
        </p>
      </div>
    </footer>
  )
}
