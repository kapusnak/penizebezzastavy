"use client"

import { useState, type MouseEvent } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { BrandLogo } from "@/components/brand-logo"
import { SITE } from "@/lib/site"

function useHomeHash(hash: string) {
  const pathname = usePathname()
  const router = useRouter()

  return (event: MouseEvent<HTMLAnchorElement>) => {
    const id = hash.replace(/^#/, "")
    if (pathname === "/") {
      event.preventDefault()
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
      window.history.replaceState(null, "", `/${hash}`)
      return
    }
    event.preventDefault()
    router.push(`/${hash}`)
  }
}

const NAV = [
  { href: "/#vyhody", label: "Výhody", hash: "#vyhody", home: true },
  { href: "/jak-to-funguje", label: "Jak to funguje", hash: null, home: false },
  { href: "/#podminky", label: "Podmínky", hash: "#podminky", home: true },
  { href: "/jak-to-funguje#faq", label: "Časté dotazy", hash: null, home: false },
  { href: "/kontakty", label: "Kontakt", hash: null, home: false },
] as const

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const goPoptavka = useHomeHash("#poptavka")
  const goVyhody = useHomeHash("#vyhody")
  const goPodminky = useHomeHash("#podminky")

  const hashClick = (hash: string) => {
    if (hash === "#vyhody") return goVyhody
    if (hash === "#podminky") return goPodminky
    return goPoptavka
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="min-w-0" aria-label={`${SITE.brand} — úvod`}>
            <BrandLogo />
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center text-primary lg:hidden"
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <nav className="hidden items-center gap-5 lg:flex">
            {NAV.map((item) =>
              item.home && item.hash ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={hashClick(item.hash)}
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ),
            )}
            <a
              href="/#poptavka"
              onClick={goPoptavka}
              className="inline-flex items-center rounded-full bg-accent px-4 py-2.5 text-xs font-bold tracking-wide text-accent-foreground uppercase shadow-sm transition-colors hover:bg-[#5cb860]"
            >
              Nezávazně posoudit žádost
            </a>
          </nav>
        </div>
      </div>

      {isMenuOpen ? (
        <nav className="border-t border-border bg-white shadow-lg lg:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-4 py-3">
            {NAV.map((item) =>
              item.home && item.hash ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    setIsMenuOpen(false)
                    hashClick(item.hash)(event)
                  }}
                  className="rounded-lg px-2 py-3 font-medium text-foreground hover:bg-muted"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-2 py-3 font-medium text-foreground hover:bg-muted"
                >
                  {item.label}
                </Link>
              ),
            )}
            <a
              href="/#poptavka"
              onClick={(event) => {
                setIsMenuOpen(false)
                goPoptavka(event)
              }}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-accent px-4 py-3 text-sm font-bold tracking-wide text-accent-foreground uppercase"
            >
              Nezávazně posoudit žádost
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
