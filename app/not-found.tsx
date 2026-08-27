import type { Metadata } from "next"
import Link from "next/link"

import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Stránka nenalezena",
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-20 text-center">
        <p className="font-display mb-4 text-6xl font-bold text-primary">404</p>
        <h1 className="font-display mb-3 text-2xl font-bold text-foreground md:text-3xl">Stránka nenalezena</h1>
        <p className="mx-auto mb-8 max-w-md text-muted-foreground">
          Tato stránka neexistuje. Vraťte se na úvod a vyplňte nezávaznou poptávku.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground hover:bg-[#5cb860]"
          >
            Zpět na úvod
          </Link>
          <Link href="/kontakty" className="text-sm font-medium text-primary underline-offset-2 hover:underline">
            Kontakt
          </Link>
        </div>
      </div>
    </main>
  )
}
