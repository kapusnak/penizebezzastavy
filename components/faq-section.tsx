"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Musím zastavit nemovitost?",
    answer:
      "Ne. Nemovitost se nezastavuje, zástavní právo se do katastru nezapisuje.",
  },
  {
    question: "Proč se ptáte na vztah k nemovitosti?",
    answer:
      "Úvěr je pro vlastníky nebo osoby se vztahem k nemovitosti, kteří ji nechtějí zastavovat. Mimo jiné proto, že odpadá souhlas spoluvlastníků se zástavou.",
  },
  {
    question: "Pro koho je úvěr?",
    answer:
      "Podnikatelé a OSVČ; účel musí souviset s podnikáním (investice, provoz, vybavení, automobil, nemovitost, refinancování aj.).",
  },
  {
    question: "Jaké je zajištění, když není zástava?",
    answer: "Notářský zápis se svolením k vykonatelnosti.",
  },
  {
    question: "Jak to probíhá a jak rychle jsou peníze?",
    answer:
      "Poptávka → ozveme se do 30 minut → individuální posouzení → po schválení peníze na účtu do 2 dnů. Až 300 000 Kč. Nezávazně a diskrétně.",
  },
]

export function FaqSection() {
  return (
    <div id="faq" className="mx-auto max-w-3xl scroll-mt-28">
      <h2 className="font-display mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
        Časté dotazy
      </h2>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={faq.question}
            value={`item-${index}`}
            className="rounded-xl border border-border bg-card px-4 shadow-sm md:px-6"
          >
            <AccordionTrigger className="py-4 text-left font-semibold text-foreground hover:no-underline md:py-5">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pb-4 leading-relaxed text-muted-foreground md:pb-5">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
