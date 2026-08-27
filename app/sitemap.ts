import type { MetadataRoute } from "next"

import { SITE } from "@/lib/site"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? `https://${SITE.domain}`).replace(/\/$/, "")
  const paths = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/jak-to-funguje", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/kontakty", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/ochrana-osobnich-udaju", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/zasady-cookies", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/obchodni-podminky", priority: 0.4, changeFrequency: "yearly" as const },
  ]
  const now = new Date()

  return paths.map((item) => ({
    url: `${base}${item.path || "/"}`,
    lastModified: now,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }))
}
