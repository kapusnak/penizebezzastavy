import type { Metadata } from "next"
import { Building2, Clock, FileText, Mail, MapPin, Phone } from "lucide-react"

import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { WhatsAppCard } from "@/components/whatsapp-card"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Kontakt",
  description: `Kontaktujte ${SITE.brand}: ${SITE.phonePrimary}, ${SITE.email}. ${SITE.hours}.`,
}

export default function KontaktyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="bg-primary pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">Kontakt</h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-white/85">
            Zavolejte nebo napište — odpovídáme obratem v pracovní době.
          </p>
        </div>
      </section>

      <section className="pt-12 pb-8 lg:pt-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:gap-8">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
              <h2 className="font-display mb-6 text-xl font-bold text-foreground">Přímý kontakt</h2>

              <a
                href={`tel:${SITE.phonePrimaryTel}`}
                className="group mb-4 flex items-center gap-4 rounded-xl bg-primary/5 p-4 transition-colors hover:bg-primary/10"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">Telefon</p>
                  <p className="text-xl font-bold text-primary group-hover:underline lg:text-2xl">
                    {SITE.phonePrimary}
                  </p>
                </div>
              </a>

              <div className="mb-4">
                <WhatsAppCard />
              </div>

              <a
                href={`mailto:${SITE.email}`}
                className="group mb-4 flex items-center gap-4 rounded-xl bg-primary/5 p-4 transition-colors hover:bg-primary/10"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">E-mail</p>
                  <p className="text-lg font-semibold text-primary group-hover:underline">{SITE.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-4">
                <Clock className="h-5 w-5 text-primary" />
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">{SITE.hours}</span>
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
              <h2 className="font-display mb-6 text-xl font-bold text-foreground">Provozovatel</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Firma</p>
                    <p className="font-semibold text-foreground">{SITE.controller.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">IČ</p>
                    <p className="font-semibold text-foreground">{SITE.controller.ico}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Sídlo</p>
                    <p className="font-semibold text-foreground">{SITE.controller.address}</p>
                  </div>
                </div>
              </div>
              <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
                Nejde o spotřebitelský úvěr. Nabídka je určena podnikatelům a OSVČ v souvislosti s podnikatelskou
                činností.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe
              title="Mapa sídla — Podvesná VII, Zlín"
              src="https://www.openstreetmap.org/export/embed.html?bbox=17.679%2C49.226%2C17.700%2C49.240&amp;layer=mapnik&amp;marker=49.2328%2C17.6894"
              className="h-72 w-full border-0 md:h-96"
              loading="lazy"
            />
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <CtaSection />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
