const GA_ID_PATTERN = /^G-[A-Z0-9]+$/

/** This site only. Do not substitute a measurement id from a sibling web. */
export const DEFAULT_GA_MEASUREMENT_ID = "G-9X2J6FSZMY"

/** Full lead form (calculator). */
export const GA_EVENT_FORMULAR = "vyplneny_formular"

/** Phone-only: popup / CTA. */
export const GA_EVENT_TELEFON = "telefonni_cislo"

/** Matches `LeadParams["source"]` in lib/send-lead.ts — kept local to avoid circular imports. */
export type LeadSource = "calculator" | "popup" | "cta"

function gaMeasurementSendTo(): string {
  const fromEnv = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? ""
  return GA_ID_PATTERN.test(fromEnv) ? fromEnv : DEFAULT_GA_MEASUREMENT_ID
}

/**
 * Fires exactly one GA4 event per successful lead when `gtag` is present:
 * - `vyplneny_formular` — homepage calculator (full form)
 * - `telefonni_cislo` — phone-only (popup + CTA sections)
 * `send_to` is this site's GA4 id so GTM's Google tag delivers that one hit.
 * Does not call `gtag('config')` and does not fire a second conversion event.
 */
export function trackLeadGenerated(params: {
  source: LeadSource
  leadValue?: number
  /** e.g. /kontakty — for phone events (popup + CTA) */
  pagePath?: string
}): void {
  if (typeof window === "undefined") return
  const gtag = window.gtag
  if (!gtag) return

  const sendTo = gaMeasurementSendTo()

  if (params.source === "calculator") {
    const eventParams: Record<string, string | number> = {
      lead_source: params.source,
      send_to: sendTo,
    }
    if (params.leadValue != null && Number.isFinite(params.leadValue)) {
      eventParams.currency = "CZK"
      eventParams.value = params.leadValue
    }
    gtag("event", GA_EVENT_FORMULAR, eventParams)
  } else {
    const eventParams: Record<string, string> = {
      lead_source: params.source,
      send_to: sendTo,
    }
    if (params.pagePath) {
      eventParams.page_path = params.pagePath
    }
    gtag("event", GA_EVENT_TELEFON, eventParams)
  }
}
