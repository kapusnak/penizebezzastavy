import type { Metadata } from "next"

import { CtaSection } from "@/components/cta-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ProcessSteps } from "@/components/process-steps"

export const metadata: Metadata = {
  title: "Jak to funguje",
  description:
    "Vyplníte poptávku, ozveme se do 30 minut, individuálně posoudíme a po schválení máte peníze na účtu do 2 dnů.",
}

export default function JakToFungujePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="bg-primary pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">Jak to funguje?</h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Krátká poptávka, individuální posouzení a peníze na účtu do 2 dnů od schválení.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <ProcessSteps heading={false} />
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <FaqSection />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <CtaSection />
        </div>
      </section>

      <Footer />
    </main>
  )
}
