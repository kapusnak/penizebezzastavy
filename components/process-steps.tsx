import { Fragment } from "react"
import { ArrowRight, FileText, ListChecks, UserRound, type LucideIcon } from "lucide-react"

function WalletCoin({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
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
      <circle cx="12" cy="5.25" r="2.25" />
      <rect width="18" height="12" x="3" y="9" rx="2" />
      <path d="M3 12h18" />
      <circle cx="16.5" cy="15.25" r="1" />
    </svg>
  )
}

const STEPS: {
  n: string
  icon: LucideIcon | typeof WalletCoin
  title: string
  text: string
}[] = [
  {
    n: "1",
    icon: FileText,
    title: "Vyplníte poptávku",
    text: "Krátký formulář zabere jen pár minut.",
  },
  {
    n: "2",
    icon: UserRound,
    title: "Ozveme se vám",
    text: "Do 30 minut vás kontaktujeme a probereme možnosti.",
  },
  {
    n: "3",
    icon: ListChecks,
    title: "Individuální posouzení",
    text: "Navrhneme řešení na míru vaší situaci.",
  },
  {
    n: "4",
    icon: WalletCoin,
    title: "Peníze na účtu",
    text: "Po schválení máte peníze na účtu do 2 dnů.",
  },
]

export function ProcessSteps({ heading = true }: { heading?: boolean }) {
  return (
    <div>
      {heading ? (
        <h2 className="font-display mb-12 text-center text-2xl font-bold text-primary md:text-3xl">
          Jak to funguje?
        </h2>
      ) : null}
      <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-x-1 lg:gap-y-0">
        {STEPS.map((step, index) => (
          <Fragment key={step.n}>
            <li className="flex flex-col items-center text-center">
              <span className="flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full border border-[#cfd4da]">
                <step.icon className="h-8 w-8 text-primary" strokeWidth={1.5} aria-hidden />
              </span>
              <div className="mt-5 flex items-center justify-center gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white">
                  {step.n}
                </span>
                <h3 className="font-display text-base font-bold text-primary md:text-lg">{step.title}</h3>
              </div>
              <p className="mt-2 max-w-[17.5rem] text-sm leading-relaxed text-primary">{step.text}</p>
            </li>
            {index < STEPS.length - 1 ? (
              <li className="hidden h-[4.75rem] items-center px-1 lg:flex" aria-hidden>
                <ArrowRight className="h-5 w-5 text-accent" strokeWidth={1.75} />
              </li>
            ) : null}
          </Fragment>
        ))}
      </ol>
    </div>
  )
}
