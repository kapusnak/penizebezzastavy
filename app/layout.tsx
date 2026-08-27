import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"

import { AppToaster } from "@/components/app-toaster"
import { GoogleAdsGtag } from "@/components/google-ads-gtag"
import { GoogleAnalytics } from "@/components/google-analytics"
import { GoogleTagManager } from "@/components/google-tag-manager"
import { HashScroll } from "@/components/hash-scroll"
import { SITE } from "@/lib/site"

import "./globals.css"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plus-jakarta",
  display: "swap",
})

const siteTitle = "PENIZEBEZZASTAVY.CZ — podnikatelský úvěr bez zástavy nemovitosti"
const siteDescription =
  "Podnikatelský úvěr až 300 000 Kč bez zástavy nemovitosti a bez zápisu do katastru. Pro podnikatele a OSVČ. Peníze do 2 dnů od schválení."

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${SITE.domain}`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${SITE.brand}`,
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-social-share.jpg",
        width: 1024,
        height: 576,
        alt: "PENIZEBEZZASTAVY.CZ — podnikatelský úvěr bez zástavy nemovitosti",
      },
    ],
    type: "website",
    locale: "cs_CZ",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-social-share.jpg"],
  },
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs">
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        <GoogleTagManager />
        <GoogleAdsGtag />
        <HashScroll />
        {children}
        <GoogleAnalytics />
        <AppToaster />
      </body>
    </html>
  )
}
