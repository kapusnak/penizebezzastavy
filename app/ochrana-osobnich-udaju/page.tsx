import type { Metadata } from "next"
import Link from "next/link"
import { Cookie, FileText } from "lucide-react"

import { Header } from "@/components/header"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Ochrana osobních údajů",
  description: `Prohlášení o ochraně osobních údajů pro poptávky podnikatelského úvěru bez zástavy — ${SITE.brand}.`,
}

export default function OchranaOsobnichUdajuPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="bg-primary pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Prohlášení o ochraně osobních údajů
          </h1>
          <p className="mt-2 text-sm text-white/80 md:text-base">Datum účinnosti: 27. srpna 2026</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <article className="text-foreground">
            <h2 className="font-display mt-12 mb-4 text-xl font-bold first:mt-0 md:text-2xl">1. Úvod</h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              Tento dokument obsahuje informace o tom, jak subjekt{" "}
              <strong className="text-foreground">{SITE.controller.name}</strong>, IČ: {SITE.controller.ico}, se sídlem{" "}
              {SITE.controller.address} (dále jen &quot;Provozovatel&quot; nebo &quot;my&quot;), jako správce osobních
              údajů, zpracovává vaše osobní údaje v souladu s nařízením (EU) 2016/679 (GDPR) a dalšími platnými právními
              předpisy. Tyto stránky {SITE.brand} slouží k poptávkám na podnikatelský úvěr bez zástavy nemovitosti.
            </p>

            <h2 className="font-display mt-12 mb-4 text-xl font-bold md:text-2xl">2. Jaké osobní údaje zpracováváme</h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              Pro účely zpracování poptávky prostřednictvím našeho webového formuláře zpracováváme následující údaje:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
              <li>Jméno a příjmení</li>
              <li>E-mailová adresa</li>
              <li>Telefonní číslo</li>
              <li>Požadovaná výše úvěru</li>
              <li>Účel úvěru (stručný popis, který uvedete ve formuláři)</li>
              <li>
                IP adresa (technický údaj při odeslání formuláře – bezpečnost a prevence zneužití, na základě
                oprávněného zájmu dle čl. 6 odst. 1 písm. f) GDPR)
              </li>
            </ul>

            <h2 className="font-display mt-12 mb-4 text-xl font-bold md:text-2xl">3. Jak vaše údaje získáváme</h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              Vaše osobní údaje získáváme prostřednictvím webového formuláře a telefonních poptávek na našich stránkách{" "}
              <strong className="text-foreground">{SITE.domain}</strong>.
            </p>

            <h2 className="font-display mt-12 mb-4 text-xl font-bold md:text-2xl">
              4. Účely a právní základ zpracování
            </h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              Vaše údaje slouží k posouzení poptávky a přípravě nabídky podnikatelského úvěru bez zástavy nemovitosti
              (včetně zprostředkování řešení soukromými investory).
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
              <li>
                čl. 6 odst. 1 písm. b) GDPR — zpracování je nezbytné pro provedení opatření před uzavřením smlouvy na
                vaši žádost.
              </li>
              <li>
                čl. 6 odst. 1 písm. f) GDPR — oprávněný zájem Provozovatele na komunikaci se zákazníkem a zajištění
                provozu služeb.
              </li>
            </ul>

            <h2 className="font-display mt-12 mb-4 text-xl font-bold md:text-2xl">
              5. Předání osobních údajů třetím stranám
            </h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              Pro účely posouzení poptávky a přípravy nabídky můžeme vaše osobní údaje předat{" "}
              <strong className="text-foreground">smluvním partnerům</strong> (příjemcům údajů), se kterými
              spolupracujeme — zejména soukromým investorům. Konkrétní identitu příjemce vám v případě předání údajů
              obvykle sdělíme v rámci komunikace ohledně vaší poptávky.
            </p>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              Kromě výše uvedeného mohou být údaje předány také poskytovatelům technických a provozních služeb (hosting,
              e-mailové nástroje, analytika). Údaje dále předáváme jen tehdy, když nám to ukládá zákon nebo rozhodnutí
              veřejné moci.
            </p>

            <h2 className="font-display mt-12 mb-4 text-xl font-bold md:text-2xl">6. Doba uchování údajů</h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              Osobní údaje jsou uchovávány po dobu nezbytně nutnou ke zpracování nabídky a komunikaci s klientem,
              nejdéle však po dobu 6 měsíců, pokud nebude zahájena smluvní spolupráce.
            </p>

            <h2 className="font-display mt-12 mb-4 text-xl font-bold md:text-2xl">7. Cookies a online sledování</h2>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
              <li>Analytické cookies — Google Analytics (sledování návštěvnosti).</li>
              <li>Reklamní cookies — Google Ads a případně Seznam Sklik (cílení reklamy a remarketing).</li>
              <li>Funkční cookies — zajišťující správné fungování formuláře a webu.</li>
            </ul>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              Podrobnosti najdete v{" "}
              <Link href="/zasady-cookies" className="text-accent hover:underline">
                Zásadách cookies
              </Link>
              .
            </p>

            <h2 className="font-display mt-12 mb-4 text-xl font-bold md:text-2xl">8. Zabezpečení údajů</h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              Přijali jsme odpovídající technická a organizační opatření, aby vaše údaje byly v bezpečí a nebyly
              zneužity, ztraceny nebo neoprávněně zpřístupněny.
            </p>

            <h2 className="font-display mt-12 mb-4 text-xl font-bold md:text-2xl">9. Vaše práva</h2>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
              <li>právo na přístup k osobním údajům,</li>
              <li>právo na opravu nepřesných údajů,</li>
              <li>právo na výmaz (tzv. právo být zapomenut),</li>
              <li>právo na omezení zpracování,</li>
              <li>právo vznést námitku proti zpracování,</li>
              <li>právo na přenositelnost údajů,</li>
              <li>
                právo podat stížnost u dozorového orgánu —{" "}
                <a
                  href="https://www.uoou.cz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Úřadu pro ochranu osobních údajů (www.uoou.cz)
                </a>
                .
              </li>
            </ul>

            <h2 className="font-display mt-12 mb-4 text-xl font-bold md:text-2xl">10. Kontakt na Provozovatele</h2>
            <ul className="list-none space-y-2 pl-0 text-base leading-relaxed text-muted-foreground">
              <li>{SITE.phonePrimary}</li>
              <li>
                <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
                  {SITE.email}
                </a>
              </li>
              <li>{SITE.controller.address}</li>
            </ul>
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
            <Link href="/zasady-cookies" className="flex items-center gap-2 hover:text-accent">
              <Cookie className="h-4 w-4" />
              Zásady cookies
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
