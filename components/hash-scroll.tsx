"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/** Scroll to in-page hashes after client navigations (home kotvy, FAQ). */
export function HashScroll() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "")
    if (!hash) return

    const scroll = () => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    const id = window.setTimeout(scroll, 50)
    return () => window.clearTimeout(id)
  }, [pathname])

  return null
}
