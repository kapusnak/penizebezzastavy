import { FileText, ListChecks, UserRound, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

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

export function ProcessSteps({
  heading = true,
  headingClassName,
}: {
  heading?: boolean
  headingClassName?: string
}) {
  return (
    <div className="@container">
      {heading ? (
        <h2
          className={cn(
            "font-display mb-5 text-center text-2xl font-bold text-primary md:mb-6 md:text-[1.75rem]",
            headingClassName,
          )}
        >
          Jak to funguje?
        </h2>
      ) : null}
      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5 @[56rem]:grid-cols-4">
        {STEPS.map((step) => (
          <li key={step.n} className="flex items-start gap-3 text-left">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#cfd4da] bg-white">
              <step.icon className="h-5 w-5 text-primary" strokeWidth={1.5} aria-hidden />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                  {step.n}
                </span>
                <h3 className="font-display text-[15px] leading-snug font-bold text-primary">{step.title}</h3>
              </div>
              <p className="mt-1 text-sm leading-snug text-primary/80">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
