"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Phone } from "lucide-react"
import { toast } from "sonner"

import { PhoneDigitsInput } from "@/components/phone-digits-input"
import { sendLead } from "@/lib/send-lead"
import { toFullPhone } from "@/lib/phone-420"

export function CtaSection() {
  const pathname = usePathname()
  const [phoneDigits, setPhoneDigits] = useState("")
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fullPhone = toFullPhone(phoneDigits)
    if (!fullPhone) {
      toast.error("Zadejte platné telefonní číslo (9 číslic).", {
        id: "lead-phone-invalid",
        duration: 6500,
      })
      return
    }
    setSubmitStatus("sending")
    try {
      await sendLead({ source: "cta", phone: fullPhone, pagePath: pathname })
      setSubmitStatus("success")
      toast.success("Děkujeme za poptávku", {
        id: "lead-cta-success",
        description: "Brzy vás budeme kontaktovat.",
        duration: 5000,
      })
    } catch (e) {
      setSubmitStatus("error")
      const hint = e instanceof Error ? e.message.trim() : ""
      toast.error("Odeslání se nepovedlo", {
        id: "lead-cta-error",
        description:
          hint.length > 0 && hint.length <= 220
            ? hint
            : "Zkuste to znovu nebo zavolejte. Podrobnosti v konzoli (F12).",
        duration: 9000,
      })
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-center md:rounded-3xl md:p-10">
      <h2 className="relative font-display text-2xl font-bold text-white md:text-3xl">
        Nezávazně posoudit žádost
      </h2>
      <p className="relative mx-auto mt-2 mb-6 max-w-md text-white/85 md:mb-8">
        Zanechte telefonní číslo. Ozveme se vám do 30 minut v pracovní době a probereme možnosti.
      </p>

      <form onSubmit={handleSubmit} className="relative mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
        <div className="flex h-14 min-h-14 w-full min-w-0 flex-1 items-center gap-2.5 rounded-md bg-card px-3.5 text-base text-foreground focus-within:ring-2 focus-within:ring-accent sm:px-4">
          <Phone className="size-5 shrink-0 text-muted-foreground" aria-hidden />
          <PhoneDigitsInput
            className="h-full min-w-0 flex-1 gap-2.5 border-0 bg-transparent p-0 text-base shadow-none md:text-base"
            inputClassName="h-full text-base leading-none text-foreground placeholder:text-muted-foreground md:text-base"
            prefixClassName="text-base leading-none text-muted-foreground md:text-base"
            value={phoneDigits}
            onChange={setPhoneDigits}
            autoComplete="off"
            name="phone"
            aria-label="Telefonní číslo (9 číslic bez předvolby)"
          />
        </div>
        <button
          type="submit"
          disabled={submitStatus === "sending"}
          className="h-14 min-h-14 rounded-md bg-accent px-6 text-base font-bold text-accent-foreground hover:bg-[#5cb860] sm:px-8"
        >
          {submitStatus === "sending" ? "Odesílám…" : submitStatus === "success" ? "Odesláno" : "Zavolejte mi"}
        </button>
      </form>
      <p className="relative mx-auto mt-4 max-w-md text-sm text-white/80">
        Zadáním telefonu souhlasíte s{" "}
        <Link
          href="/ochrana-osobnich-udaju"
          className="text-white underline underline-offset-2 hover:opacity-90"
        >
          ochranou osobních údajů
        </Link>
        .
      </p>
    </div>
  )
}
