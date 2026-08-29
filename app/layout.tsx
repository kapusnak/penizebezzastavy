import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { headers } from "next/headers"

import { AppToaster } from "@/components/app-toaster"
import { GoogleAdsGtag } from "@/components/google-ads-gtag"
import { GoogleAnalytics } from "@/components/google-analytics"
import { GoogleTagManager } from "@/components/google-tag-manager"
import { HashScroll } from "@/components/hash-scroll"
import { HERO_IMAGE, SITE, originFromForwardedHeaders, siteOriginFromEnv } from "@/lib/site"

import "./globals.css"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plus-jakarta",
  display: "swap",
})

const siteTitle = "PENIZEBEZZASTAVY.CZ — podnikatelský úvěr bez zástavy nemovitosti"
const siteDescription =
  "Podnikatelský úvěr až 300 000 Kč bez zástavy nemovitosti a bez zápisu do katastru. Pro podnikatele a OSVČ. Peníze do 2 dnů od schválení."

async function resolveMetadataBase(): Promise<URL> {
  try {
    const h = await headers()
    const origin = originFromForwardedHeaders({
      host: h.get("host"),
      forwardedHost: h.get("x-forwarded-host"),
      forwardedProto: h.get("x-forwarded-proto"),
    })
    if (origin) return new URL(origin)
  } catch {
    // headers() is unavailable during some build-time metadata collection
  }
  return new URL(siteOriginFromEnv())
}

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  const metadataBase = await resolveMetadataBase()
  const shareImageUrl = new URL(HERO_IMAGE.src, metadataBase)
  const shareImage = {
    url: shareImageUrl,
    secureUrl: shareImageUrl,
    width: HERO_IMAGE.width,
    height: HERO_IMAGE.height,
    alt: siteTitle,
    type: HERO_IMAGE.type,
  }

  return {
    metadataBase,
    title: {
      default: siteTitle,
      template: `%s | ${SITE.brand}`,
    },
    description: siteDescription,
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      siteName: SITE.brand,
      images: [shareImage],
      type: "website",
      locale: "cs_CZ",
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [shareImageUrl],
    },
    icons: {
      icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
      apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
    },
  }
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
