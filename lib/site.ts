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
  tagline: "PODNIKATELSKÝ ÚVĚR BEZ ZÁSTAVY NEMOVITOSTI",
  controller: {
    name: "Dočasný výkup s.r.o.",
    ico: "23626836",
    address: "Podvesná VII/6192, 760 01 Zlín",
  },
} as const

export const LOAN_AMOUNTS = [50_000, 100_000, 150_000, 200_000, 250_000, 300_000] as const
