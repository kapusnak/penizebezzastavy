import { ClipboardList, Handshake, Landmark, PhoneCall } from "lucide-react"

const STEPS = [
  {
    n: "1",
    icon: ClipboardList,
    title: "Vyplníte poptávku",
    text: "Krátký formulář zabere jen pár minut.",
  },
  {
    n: "2",
    icon: PhoneCall,
    title: "Ozveme se vám",
    text: "Do 30 minut vás kontaktujeme a probereme možnosti.",
  },
  {
    n: "3",
    icon: Handshake,
    title: "Individuální posouzení",
    text: "Navrhneme řešení na míru vaší situaci.",
  },
  {
    n: "4",
    icon: Landmark,
    title: "Peníze na účtu",
    text: "Po schválení máte peníze na účtu do 2 dnů.",
  },
] as const

export function ProcessSteps({ heading = true }: { heading?: boolean }) {
  return (
    <div>
      {heading ? (
        <h2 className="font-display mb-10 text-center text-2xl font-bold text-foreground md:text-3xl">
          Jak to funguje?
        </h2>
      ) : null}
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <li key={step.n} className="relative rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                {step.n}
              </span>
              <step.icon className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
