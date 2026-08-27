import type { Metadata } from "next"
import Link from "next/link"
import { Cookie, FileText } from "lucide-react"

import { Header } from "@/components/header"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Zásady cookies",
  description: `Zásady cookies — ${SITE.brand} (${SITE.domain}).`,
}

export default function ZasadyCookiesPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${SITE.domain}`

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="bg-primary pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">Zásady cookies</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/80 md:text-base">
            Tyto Zásady cookies byly naposledy aktualizovány 27. 8. 2026 a vztahují se na občany a osoby s trvalým
            pobytem v Evropském hospodářském prostoru.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <article className="text-foreground">
            <h2 className="font-display mt-12 mb-4 text-xl font-bold first:mt-0 md:text-2xl">1. Úvod</h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              Naše webové stránky{" "}
              <a href={siteUrl} className="text-accent hover:underline">
                {siteUrl}
              </a>{" "}
              (dále jen „web“) používají cookies a další související technologie. Cookies také vkládají třetí strany,
              které jsme zapojili. Níže vás informujeme o používání cookies na našem webu.
            </p>

            <h2 className="font-display mt-12 mb-4 text-xl font-bold md:text-2xl">2. Co jsou soubory cookies?</h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              Soubor cookie je malý soubor, který je odeslán spolu se stránkami webu a uložen prohlížečem na vašem
              zařízení. Informace v něm uložené mohou být vráceny našim serverům nebo serverům třetích stran.
            </p>

            <h2 className="font-display mt-12 mb-4 text-xl font-bold md:text-2xl">3. Typy cookies</h2>

            <h3 className="mt-8 mb-3 text-lg font-semibold text-foreground">3.1 Technické / funkční</h3>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              Zajišťují správné fungování webu (např. formulář). Tyto cookies můžeme umístit bez vašeho souhlasu.
            </p>

            <h3 className="mt-8 mb-3 text-lg font-semibold text-foreground">3.2 Statistické / analytické</h3>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              Pomáhají nám pochopit návštěvnost a chování na webu (např. Google Analytics / Google Tag Manager).
            </p>

            <h3 className="mt-8 mb-3 text-lg font-semibold text-foreground">3.3 Marketingové</h3>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              Umožňují měření a remarketing reklamních kampaní (např. Google Ads, případně Seznam Sklik).
            </p>

            <h2 className="font-display mt-12 mb-4 text-xl font-bold md:text-2xl">4. Správce</h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              Správcem webu je {SITE.controller.name}, IČ {SITE.controller.ico}, {SITE.controller.address}.
            </p>

            <h2 className="font-display mt-12 mb-4 text-xl font-bold md:text-2xl">5. Kontakt</h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              Dotazy k cookies směřujte na{" "}
              <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
                {SITE.email}
              </a>
              . Více o zpracování osobních údajů najdete v{" "}
              <Link href="/ochrana-osobnich-udaju" className="text-accent hover:underline">
                Prohlášení o ochraně osobních údajů
              </Link>
              .
            </p>
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
