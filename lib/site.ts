/** Shared contact & legal constants for Penizebezzastavy.cz. */
export const SITE = {
  brand: "PENIZEBEZZASTAVY.CZ",
  brandName: "Penizebezzastavy.cz",
  domain: "penizebezzastavy.cz",
  email: "info@docasnyvykup.cz",
  phonePrimary: "+420 777 400 256",
  phonePrimaryTel: "+420777400256",
  phoneDisplayShort: "777 400 256",
  whatsappHref: "https://wa.me/420777400256",
  hours: "Po – Pá: 8:00 – 18:00",
  tagline: "Podnikatelský úvěr bez zástavy nemovitosti",
  controller: {
    name: "Dočasný výkup s.r.o.",
    ico: "23626836",
    address: "Podvesná VII/6192, 760 01 Zlín",
  },
} as const

/** Snapped loan slider: 50k–300k in 10k steps (same pattern as other finance webs). */
export const LOAN_AMOUNT_RANGE = { min: 50_000, max: 300_000 } as const
export const DEFAULT_LOAN_AMOUNT = 100_000

export const LOAN_AMOUNT_VALUES = (() => {
  const values: number[] = []
  for (let v = LOAN_AMOUNT_RANGE.min; v <= LOAN_AMOUNT_RANGE.max; v += 10_000) {
    values.push(v)
  }
  return values
})()

export function snapToLoanAmount(value: number): number {
  if (value <= LOAN_AMOUNT_VALUES[0]) return LOAN_AMOUNT_VALUES[0]
  if (value >= LOAN_AMOUNT_VALUES[LOAN_AMOUNT_VALUES.length - 1]) {
    return LOAN_AMOUNT_VALUES[LOAN_AMOUNT_VALUES.length - 1]
  }
  let i = 0
  while (i < LOAN_AMOUNT_VALUES.length - 1 && LOAN_AMOUNT_VALUES[i + 1] < value) i += 1
  const a = LOAN_AMOUNT_VALUES[i]
  const b = LOAN_AMOUNT_VALUES[i + 1]
  return value - a <= b - value ? a : b
}

export function loanAmountToIndex(value: number): number {
  const snapped = snapToLoanAmount(value)
  const idx = LOAN_AMOUNT_VALUES.indexOf(snapped)
  return idx >= 0 ? idx : 0
}

export function formatAmountKc(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(".0", "")} mil. Kč`
  }
  return `${(value / 1000).toFixed(0)} tis. Kč`
}

export function formatRangeLabelKc(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(0)} mil. Kč`
  }
  return `${(value / 1000).toFixed(0)} tis. Kč`
}
