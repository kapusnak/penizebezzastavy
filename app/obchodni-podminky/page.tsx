import type { Metadata } from "next"
import Link from "next/link"
import { FileText } from "lucide-react"

import { Header } from "@/components/header"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Obchodní podmínky",
  description: `Obchodní informace k poptávce podnikatelského úvěru bez zástavy — ${SITE.brand}.`,
}

export default function ObchodniPodminkyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="bg-primary pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">Obchodní podmínky</h1>
          <p className="mt-2 text-sm text-white/80 md:text-base">Datum účinnosti: 27. srpna 2026</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <article className="space-y-8 text-base leading-relaxed text-muted-foreground">
            <section>
              <h2 className="font-display mb-3 text-xl font-bold text-foreground md:text-2xl">1. Provozovatel</h2>
              <p>
                Web {SITE.brand} provozuje {SITE.controller.name}, IČ {SITE.controller.ico}, se sídlem{" "}
                {SITE.controller.address}. Kontakt: {SITE.phonePrimary}, {SITE.email}.
              </p>
            </section>

            <section>
              <h2 className="font-display mb-3 text-xl font-bold text-foreground md:text-2xl">2. Povaha služby</h2>
              <p>
                Web slouží k nezávazné poptávce podnikatelského úvěru bez zástavy nemovitosti a bez zápisu zástavního
                práva do katastru. Propojujeme finanční potřeby podnikatelů a OSVČ s možnostmi soukromých investorů.
              </p>
              <p className="mt-3">
                Nejde o spotřebitelský úvěr. Nabídka je určena výhradně v souvislosti s podnikatelskou činností.
              </p>
            </section>

            <section>
              <h2 className="font-display mb-3 text-xl font-bold text-foreground md:text-2xl">3. Poptávka není smlouva</h2>
              <p>
                Odeslání formuláře je nezávazná poptávka, nikoli uzavření smlouvy. Konkrétní podmínky (výše, splatnost,
                zajištění notářským zápisem se svolením k vykonatelnosti a další ujednání) se sjednávají individuálně a
                jsou obsahem smluvní dokumentace předložené až při posouzení konkrétního případu.
              </p>
            </section>

            <section>
              <h2 className="font-display mb-3 text-xl font-bold text-foreground md:text-2xl">4. Zajištění</h2>
              <p>
                Nemovitost se nezastavuje. Typickým zajištěním je notářský zápis se svolením k vykonatelnosti. Přesná
                podoba zajištění závisí na individuálním posouzení.
              </p>
            </section>

            <section>
              <h2 className="font-display mb-3 text-xl font-bold text-foreground md:text-2xl">5. Osobní údaje</h2>
              <p>
                Zpracování osobních údajů popisuje{" "}
                <Link href="/ochrana-osobnich-udaju" className="text-accent hover:underline">
                  Prohlášení o ochraně osobních údajů
                </Link>
                .
              </p>
            </section>
          </article>
        </div>
      </section>

      <footer className="border-t border-border bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground sm:flex-row sm:gap-8">
            <Link href="/ochrana-osobnich-udaju" className="flex items-center gap-2 hover:text-accent">
              <FileText className="h-4 w-4" />
              Ochrana osobních údajů
            </Link>
            <Link href="/obchodni-podminky" className="flex items-center gap-2 hover:text-accent">
              <FileText className="h-4 w-4" />
              Obchodní podmínky
            </Link>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} {SITE.controller.name}. Všechna práva vyhrazena.
          </p>
        </div>
      </footer>
    </main>
  )
}
