"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Phone, X } from "lucide-react"
import { toast } from "sonner"

import { PhoneDigitsInput } from "@/components/phone-digits-input"
import { sendLead } from "@/lib/send-lead"
import { toFullPhone } from "@/lib/phone-420"

const DISMISS_KEY = "pbz-phone-popup-dismissed"

export function LeadPopup() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const [shouldShake, setShouldShake] = useState(false)
  const [phoneDigits, setPhoneDigits] = useState("")
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.localStorage.getItem(DISMISS_KEY) === "1") {
      setIsClosed(true)
      return
    }

    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 12000)

    return () => clearTimeout(showTimer)
  }, [])

  useEffect(() => {
    if (!isVisible || isClosed) return
    const shakeInterval = setInterval(() => {
      setShouldShake(true)
      setTimeout(() => setShouldShake(false), 500)
    }, 8000)
    return () => clearInterval(shakeInterval)
  }, [isVisible, isClosed])

  const handleClose = () => {
    setIsClosed(true)
    setIsVisible(false)
    try {
      window.localStorage.setItem(DISMISS_KEY, "1")
    } catch {
      /* ignore */
    }
  }

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
      await sendLead({ source: "popup", phone: fullPhone, pagePath: pathname })
      setSubmitStatus("success")
      toast.success("Děkujeme za poptávku", {
        id: "lead-popup-success",
        description: "Brzy vás budeme kontaktovat.",
        duration: 5000,
      })
      setTimeout(() => handleClose(), 1500)
    } catch (e) {
      setSubmitStatus("error")
      const hint = e instanceof Error ? e.message.trim() : ""
      toast.error("Odeslání se nepovedlo", {
        id: "lead-popup-error",
        description:
          hint.length > 0 && hint.length <= 220
            ? hint
            : "Zkuste to znovu nebo zavolejte. Podrobnosti v konzoli (F12).",
        duration: 9000,
      })
    }
  }

  if (!isVisible || isClosed) return null

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/25 lg:hidden" onClick={handleClose} />

      <div
        className={`fixed z-50 right-0 bottom-0 left-0 max-h-[33vh] animate-slide-in-bottom rounded-t-2xl border border-white/10 bg-primary shadow-2xl lg:right-6 lg:bottom-6 lg:left-auto lg:max-h-none lg:w-[380px] lg:animate-none lg:rounded-2xl ${shouldShake ? "animate-shake" : ""}`}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 rounded-full p-1.5 text-white/40 transition-all hover:bg-white/10 hover:text-white"
          aria-label="Zavřít"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-4 pb-6 lg:p-6">
          <h3 className="font-display pr-8 text-lg font-bold text-white lg:text-2xl">
            Nezávazně posoudit žádost
          </h3>
          <p className="mt-1 mb-3 text-xs text-white/80 lg:mb-4 lg:text-sm">
            Zanechte číslo. Ozveme se vám do 30 minut v pracovní době.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 lg:gap-3">
            <div className="flex h-12 min-h-12 w-full items-center gap-2.5 rounded-lg bg-white px-3.5 text-base text-foreground focus-within:ring-2 focus-within:ring-accent">
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
              className="h-12 min-h-12 w-full rounded-lg bg-accent px-5 text-base font-bold text-accent-foreground hover:bg-[#5cb860] disabled:opacity-70"
            >
              {submitStatus === "sending"
                ? "Odesílám…"
                : submitStatus === "success"
                  ? "Odesláno"
                  : "Zavolejte mi"}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
