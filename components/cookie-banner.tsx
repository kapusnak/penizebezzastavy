"use client"

import { startTransition, useEffect, useState } from "react"
import Link from "next/link"

const STORAGE_KEY = "penizebezzastavy-cookie-consent"

function setCookieOffset(px: number) {
  document.documentElement.style.setProperty("--pbz-cookie-offset", `${px}px`)
}

export function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    startTransition(() => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) {
          setShow(true)
        }
      } catch {
        setShow(true)
      }
    })
  }, [])

  useEffect(() => {
    if (!show) {
      setCookieOffset(0)
      return
    }

    const el = document.getElementById("cookie-banner")
    const apply = () => setCookieOffset(el?.offsetHeight ?? 0)
    apply()

    const observer = new ResizeObserver(apply)
    if (el) observer.observe(el)
    window.addEventListener("resize", apply)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", apply)
      setCookieOffset(0)
    }
  }, [show])

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted")
    } catch {
      /* ignore */
    }
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      id="cookie-banner"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/10 bg-[#f9f9f9] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] sm:px-10 sm:pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:pt-4"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 sm:gap-6">
        <div className="min-w-0 text-sm leading-snug text-muted-foreground">
          <p id="cookie-banner-title" className="font-medium text-foreground">
            Cookies a soukromí
          </p>
          <p className="mt-1">
            Používáme cookies nezbytné pro fungování webu a (po vašem souhlasu) analytické nástroje. Více v{" "}
            <Link href="/zasady-cookies" className="text-primary underline underline-offset-2 hover:underline">
              Zásadách cookies
            </Link>{" "}
            a{" "}
            <Link href="/ochrana-osobnich-udaju" className="text-primary underline underline-offset-2 hover:underline">
              ochraně osobních údajů
            </Link>
            .
          </p>
        </div>
        <button
          type="button"
          onClick={accept}
          className="h-11 min-h-11 shrink-0 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:h-12 sm:min-h-12 sm:px-6"
        >
          Rozumím
        </button>
      </div>
    </div>
  )
}
