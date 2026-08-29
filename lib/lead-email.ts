import { SITE as PUBLIC_SITE } from "./site"

export type LeadSource = "calculator" | "popup" | "cta"

export type LeadPayload = {
  source: LeadSource
  phone: string
  email?: string
  name?: string
  amount?: number
  /** Účel podnikatelského úvěru (calculator). */
  purpose?: string
  propertyAddress?: string
  pagePath?: string
}

/** Brand + contact used in operator/client e-mails for this site. */
const SITE = {
  domain: PUBLIC_SITE.domain,
  brandName: PUBLIC_SITE.brandName,
  brand: PUBLIC_SITE.brand,
  contactEmail: PUBLIC_SITE.email,
  signOff: `Váš tým ${PUBLIC_SITE.controller.name} (${PUBLIC_SITE.brandName})`,
  phones: [{ tel: PUBLIC_SITE.phonePrimaryTel, display: PUBLIC_SITE.phonePrimary }],
} as const

const PRODUCT = "Podnikatelský úvěr bez zástavy nemovitosti"
const ACCENT = "#4CAF50"
const CALLBACK_ONLY_AMOUNT = "--- Pouze požadavek na zavolání ---"
const PLACEHOLDER = "---"

type PropertyDetails = {
  product: string
  purpose: string
  address: string
}

function propertyDetailsFromPayload(params: LeadPayload, callback: boolean): PropertyDetails | null {
  if (callback) return null
  const purpose = params.purpose?.trim() ?? ""
  const address = params.propertyAddress?.trim() ?? ""
  return {
    product: PRODUCT,
    purpose: purpose || PLACEHOLDER,
    address: address || PLACEHOLDER,
  }
}

function propertyTextLines(property: PropertyDetails): string[] {
  const lines = [`Typ úvěru: ${property.product}`, `Účel úvěru: ${property.purpose}`]
  if (property.address !== PLACEHOLDER) {
    lines.push(`Adresa nemovitosti: ${property.address}`)
  }
  return lines
}

function kvRow(label: string, value: string): string {
  return `<tr>
          <td style="padding: 5px 0; width: 45%; vertical-align: top;"><strong>${escapeHtml(label)}:</strong></td>
          <td style="padding: 5px 0; text-align: right; font-weight: 500;">${escapeHtml(value)}</td>
        </tr>`
}

function propertyHtmlRows(property: PropertyDetails | null): string {
  if (!property) return ""
  const addressRow = property.address !== PLACEHOLDER ? kvRow("Adresa nemovitosti", property.address) : ""
  return `
        <tr>
          <td colspan="2" style="padding: 5px 0; border-top: 1px dashed #cccccc;"></td>
        </tr>
        ${kvRow("Typ úvěru", property.product)}
        ${kvRow("Účel úvěru", property.purpose)}
        ${addressRow}`
}

/**
 * Compact E.164-style number for `tel:` links (no spaces).
 * `+420 728 020 048` → `+420728020048`
 */
export function normalizePhoneForTel(phone: string): string {
  const trimmed = phone.trim()
  if (!trimmed) return ""
  const digits = trimmed.replace(/\D/g, "")
  if (digits.length === 12 && digits.startsWith("420")) return `+${digits}`
  if (digits.length === 9) return `+420${digits}`
  return trimmed.replace(/\s/g, "")
}

/** e.g. `+420728020048` → `+420 728 020 048` for readable e-mail body */
export function formatPhoneDisplayForNotification(phone: string): string {
  const trimmed = phone.trim()
  if (!trimmed) return ""
  let digits = trimmed.replace(/\D/g, "")
  if (digits.length >= 11 && digits.startsWith("420")) digits = digits.slice(3)
  const national = digits.slice(0, 9)
  if (national.length !== 9) return trimmed
  const groups = national.match(/.{1,3}/g)?.join(" ") ?? national
  return `+420 ${groups}`
}

/** Format amount for email: "300 000,- Kč" */
export function formatAmountCzk(value: number): string {
  const integer = Math.round(value)
  const withSpaces = integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  return `${withSpaces},- Kč`
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

/** Hostname for notify subject and Zdroj, e.g. `penizebezzastavy.cz`. */
function notifyDomainTag(): string {
  const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim()
  if (origin) {
    try {
      const host = new URL(origin.includes("://") ? origin : `https://${origin}`).hostname.replace(
        /^www\./,
        "",
      )
      if (host) return host
    } catch {
      /* fall through */
    }
  }
  return SITE.domain
}

function isCallbackOnly(source: LeadSource): boolean {
  return source === "cta" || source === "popup"
}

export type BuiltLeadEmails = {
  notifySubject: string
  notifyText: string
  notifyHtml: string
  clientSubject: string
  clientText: string
  clientHtml: string
  clientEmail: string
  phoneTel: string
  phoneDisplay: string
}

/** Operator notification HTML. Field order: source → name → phone → email → IP → property. */
function buildNotifyHtml(fields: {
  source: string
  name: string
  phoneTel: string
  phoneDisplay: string
  email: string
  amount: string
  ip: string
  property: PropertyDetails | null
}): string {
  const emailCell = fields.email
    ? `<a href="mailto:${escapeHtml(fields.email)}" style="color: ${ACCENT}; text-decoration: none;">${escapeHtml(fields.email)}</a>`
    : escapeHtml(PLACEHOLDER)
  const phoneCell = fields.phoneTel
    ? `<a href="tel:${escapeHtml(fields.phoneTel)}" style="color: ${ACCENT}; text-decoration: none;">${escapeHtml(fields.phoneDisplay)}</a>`
    : escapeHtml(fields.phoneDisplay || PLACEHOLDER)

  return `
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; color: #333333; max-width: 450px; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background-color: #ffffff;">
  <div style="display: flex; align-items: center; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid ${ACCENT};">
    <div style="padding: 6px 10px; background-color: #e8f5e9; border-radius: 5px; font-size: 20px; line-height: 1;">
      <span style="color: ${ACCENT};">🏠</span>
    </div>
    <div style="color: #0D1B2A; font-size: 17px; font-weight: bold; margin-left: 10px;">
      ${escapeHtml(SITE.brand)} — NOVÁ POPTÁVKA
    </div>
  </div>
  <div style="padding: 10px 0;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
      <tbody>
        <tr>
          <td style="padding: 5px 0; width: 45%; vertical-align: top;"><strong>Zdroj:</strong></td>
          <td style="padding: 5px 0; text-align: right;">${escapeHtml(fields.source)}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; width: 45%;"><strong>Jméno klienta:</strong></td>
          <td style="padding: 5px 0; text-align: right;">${escapeHtml(fields.name)}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0;"><strong>Telefon:</strong></td>
          <td style="padding: 5px 0; text-align: right;">${phoneCell}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0;"><strong>E-mail:</strong></td>
          <td style="padding: 5px 0; text-align: right;">${emailCell}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0;"><strong>IP adresa:</strong></td>
          <td style="padding: 5px 0; text-align: right; font-weight: 500;">${escapeHtml(fields.ip)}</td>
        </tr>
        ${propertyHtmlRows(fields.property)}
      </tbody>
    </table>
  </div>
  <div style="margin-top: 20px; padding: 12px; background-color: #e8f5e9; border: 1px solid ${ACCENT}; border-radius: 6px; text-align: center;">
    <div style="font-size: 13px; color: ${ACCENT}; margin-bottom: 3px;">POŽADOVANÁ ČÁSTKA</div>
    <div style="font-size: 22px; font-weight: bold; color: ${ACCENT};">${escapeHtml(fields.amount)}</div>
  </div>
</div>`.trim()
}

/** Client confirmation HTML — property-loan copy only (no cars / generic dual-product). */
function buildClientHtml(fields: {
  name: string
  amount: string
  property: PropertyDetails | null
}): string {
  const phoneLines = SITE.phones
    .map(
      (p) =>
        `<a style="color: ${ACCENT}; text-decoration: none;" href="tel:${escapeHtml(p.tel)}">${escapeHtml(p.display)}</a>`,
    )
    .join("<br>\n      ")
  const contactEmail = SITE.contactEmail

  return `
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; color: #333333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background-color: #ffffff;">
  <div style="color: #0D1B2A; font-size: 20px; font-weight: bold; margin-bottom: 20px; border-bottom: 2px solid ${ACCENT}; padding-bottom: 10px;">Dobrý den, děkujeme za Vaši poptávku!</div>
  <div style="margin-bottom: 25px;">Potvrzujeme, že jsme Vaši žádost o podnikatelský úvěr bez zástavy nemovitosti přijali. Brzy se s Vámi spojíme.</div>
  <div style="padding: 15px; background-color: #f7f7f7; border-radius: 6px; border: 1px solid #e8f5e9;">
    <div style="color: #2c3e50; font-size: 16px; font-weight: bold; margin-bottom: 10px;">SHRNUTÍ VAŠÍ ŽÁDOSTI</div>
    <table style="width: 100%; border-collapse: collapse;" role="presentation">
      <tbody>
        <tr>
          <td style="padding: 5px 0; width: 50%;"><strong>Jméno:</strong></td>
          <td style="padding: 5px 0; text-align: right;">${escapeHtml(fields.name)}</td>
        </tr>
        ${
          fields.property
            ? `${kvRow("Typ úvěru", fields.property.product)}
        ${kvRow("Účel úvěru", fields.property.purpose)}
        ${fields.property.address !== PLACEHOLDER ? kvRow("Adresa nemovitosti", fields.property.address) : ""}`
            : ""
        }
      </tbody>
    </table>
    <div style="margin-top: 15px; padding: 10px; background-color: #e8f5e9; border: 1px solid ${ACCENT}; border-radius: 6px; text-align: center;">
      <div style="font-size: 13px; color: ${ACCENT}; margin-bottom: 3px;">POŽADOVANÁ ČÁSTKA</div>
      <div style="font-size: 20px; font-weight: bold; color: ${ACCENT};">${escapeHtml(fields.amount)}</div>
    </div>
  </div>
  <div style="margin-top: 30px; padding: 15px; border-left: 4px solid ${ACCENT}; background-color: #f0faf4; border-radius: 4px;">
    <h3 style="color: #0D1B2A; margin-top: 0; font-size: 17px;">CO BUDE DÁL?</h3>
    <p>Vaši poptávku posoudíme individuálně. Nemovitost se nezastavuje a do katastru se nic nezapisuje.</p>
    <p>Ozveme se vám do 30 minut v pracovní době a probereme možnosti.</p>
    <p style="margin: 10px 0 0 0; line-height: 1.5; font-weight: normal;">Po schválení máte peníze na účtu do 2 dnů.</p>
  </div>
  <div style="margin-top: 30px; padding-top: 15px; border-top: 1px dashed #cccccc;">
    <h4 style="margin-bottom: 10px; font-size: 15px; color: #0D1B2A;">Spěcháte, nebo máte dotazy?</h4>
    <p style="margin: 5px 0;">📞 Telefon:<br>
      ${phoneLines}
    </p>
    <p style="margin: 5px 0;">📧 E-mail: <a style="color: ${ACCENT}; text-decoration: none;" href="mailto:${escapeHtml(contactEmail)}">${escapeHtml(contactEmail)}</a></p>
  </div>
  <div style="margin-top: 30px;">
    <p style="margin: 0;">Těšíme se na spolupráci!</p>
    <p style="margin: 5px 0 0 0;">S pozdravem,</p>
    <p style="margin: 0; font-weight: bold; color: #0D1B2A;">${escapeHtml(SITE.signOff)}</p>
  </div>
</div>`.trim()
}

export function buildLeadEmails(params: LeadPayload & { ip: string }): BuiltLeadEmails {
  const callback = isCallbackOnly(params.source)
  const property = propertyDetailsFromPayload(params, callback)
  const phoneTel = normalizePhoneForTel(params.phone)
  const phoneDisplay = formatPhoneDisplayForNotification(params.phone) || params.phone.trim()
  const name = callback ? PLACEHOLDER : (params.name?.trim() || PLACEHOLDER)
  const email = (params.email ?? "").trim()
  const amount =
    params.amount != null
      ? formatAmountCzk(params.amount)
      : callback
        ? CALLBACK_ONLY_AMOUNT
        : PLACEHOLDER
  const ip = params.ip.trim() || "neznámá"
  const pagePath = params.pagePath?.trim() || ""
  const domainTag = notifyDomainTag()
  const sourceDisplay = pagePath ? `${domainTag}${pagePath}` : domainTag

  const notifySubjectCore = callback
    ? `Callback – ${phoneDisplay}`
    : `Nová poptávka – ${name !== PLACEHOLDER ? name : phoneDisplay}`
  const notifySubject = `[${domainTag}] ${notifySubjectCore}`

  const notifyText = [
    `Zdroj: ${sourceDisplay}`,
    `Jméno klienta: ${name}`,
    `Telefon: ${phoneDisplay}`,
    `E-mail: ${email || PLACEHOLDER}`,
    `IP adresa: ${ip}`,
    ...(property ? propertyTextLines(property) : []),
    `Částka: ${amount}`,
  ].join("\n")

  const notifyHtml = buildNotifyHtml({
    source: sourceDisplay,
    name,
    phoneTel: phoneTel || params.phone.trim(),
    phoneDisplay,
    email,
    amount,
    ip,
    property,
  })

  const clientNameForBody = callback ? PLACEHOLDER : name
  const clientSubject = `Potvrzení přijetí poptávky – ${SITE.brandName}`
  const phonesText = SITE.phones.map((p) => p.display).join(" / ")
  const clientText = [
    "Dobrý den, děkujeme za Vaši poptávku!",
    "",
    "Potvrzujeme, že jsme Vaši žádost o podnikatelský úvěr bez zástavy nemovitosti přijali. Brzy se s Vámi spojíme.",
    "",
    `Jméno: ${clientNameForBody}`,
    ...(property ? propertyTextLines(property) : []),
    `Požadovaná částka: ${amount}`,
    "",
    "Nemovitost se nezastavuje a do katastru se nic nezapisuje.",
    "Ozveme se vám do 30 minut v pracovní době.",
    "Po schválení máte peníze na účtu do 2 dnů.",
    "",
    `Telefon: ${phonesText}`,
    `E-mail: ${SITE.contactEmail}`,
    "",
    "S pozdravem,",
    SITE.signOff,
  ].join("\n")

  const clientHtml = buildClientHtml({
    name: clientNameForBody,
    amount,
    property,
  })

  return {
    notifySubject,
    notifyText,
    notifyHtml,
    clientSubject,
    clientText,
    clientHtml,
    clientEmail: email,
    phoneTel: phoneTel || params.phone.trim(),
    phoneDisplay,
  }
}
