"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { ArrowRight, Lock } from "lucide-react"
import { toast } from "sonner"

import { PhoneDigitsInput } from "@/components/phone-digits-input"
import { sendLead } from "@/lib/send-lead"
import { toFullPhone } from "@/lib/phone-420"
import { LOAN_AMOUNTS } from "@/lib/site"

const schema = z.object({
  name: z.string().trim().min(2, "Zadejte jméno a příjmení."),
  phoneDigits: z.string().length(9, "Zadejte platné telefonní číslo (9 číslic)."),
  email: z.string().trim().email("Zadejte platný e-mail."),
  amount: z.coerce.number().refine((n) => (LOAN_AMOUNTS as readonly number[]).includes(n), {
    message: "Vyberte výši úvěru.",
  }),
  purpose: z.string().trim().min(5, "Stručně uveďte účel úvěru."),
  consent: z.boolean().refine((value) => value === true, {
    message: "Pro odeslání je nutný souhlas se zpracováním údajů.",
  }),
})

type FormValues = z.infer<typeof schema>

function formatAmountLabel(value: number): string {
  return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Kč`
}

export function LoanCalculator() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phoneDigits: "",
      email: "",
      amount: 300_000,
      purpose: "",
      consent: false,
    },
  })

  const onSubmit = async (values: FormValues) => {
    const phone = toFullPhone(values.phoneDigits)
    if (!phone) {
      toast.error("Zadejte platné telefonní číslo (9 číslic).")
      return
    }

    try {
      await sendLead({
        source: "calculator",
        name: values.name,
        phone,
        email: values.email,
        amount: values.amount,
        assetType: "Podnikatelský úvěr",
        serviceType: `Podnikatelský úvěr bez zástavy — ${values.purpose}`,
      })
      toast.success("Děkujeme za poptávku", {
        description: "Ozveme se vám do 30 minut v pracovní době.",
        duration: 5000,
      })
      reset({
        name: "",
        phoneDigits: values.phoneDigits,
        email: values.email,
        amount: values.amount,
        purpose: "",
        consent: false,
      })
    } catch (e) {
      const hint = e instanceof Error ? e.message.trim() : ""
      toast.error("Odeslání se nepovedlo", {
        description:
          hint.length > 0 && hint.length <= 220
            ? hint
            : "Zkuste to znovu nebo zavolejte. Podrobnosti v konzoli (F12).",
        duration: 9000,
      })
    }
  }

  const fieldClass =
    "h-12 w-full rounded-lg border border-white/15 bg-white px-3.5 text-base text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-accent md:text-sm"

  return (
    <div id="poptavka" className="scroll-mt-28 rounded-2xl bg-primary p-6 text-primary-foreground shadow-xl md:p-8">
      <h3 className="font-display text-2xl font-bold leading-snug md:text-[1.65rem]">
        Nezávazná poptávka. Vyplňte formulář a my se vám ozveme.
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white/90">
            Jméno a příjmení
          </label>
          <input id="name" autoComplete="name" className={fieldClass} {...register("name")} />
          {errors.name ? <p className="mt-1 text-xs text-red-300">{errors.name.message}</p> : null}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-white/90">
            Telefon
          </label>
          <Controller
            name="phoneDigits"
            control={control}
            render={({ field }) => (
              <PhoneDigitsInput
                id="phone"
                value={field.value}
                onChange={field.onChange}
                className="h-12 rounded-lg border border-white/15 bg-white px-3.5 text-foreground"
                prefixClassName="text-muted-foreground"
                inputClassName="text-foreground placeholder:text-muted-foreground"
                aria-label="Telefonní číslo (9 číslic bez předvolby)"
              />
            )}
          />
          {errors.phoneDigits ? (
            <p className="mt-1 text-xs text-red-300">{errors.phoneDigits.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/90">
            E-mail
          </label>
          <input id="email" type="email" autoComplete="email" className={fieldClass} {...register("email")} />
          {errors.email ? <p className="mt-1 text-xs text-red-300">{errors.email.message}</p> : null}
        </div>

        <div>
          <label htmlFor="amount" className="mb-1.5 block text-sm font-medium text-white/90">
            Výše úvěru
          </label>
          <select id="amount" className={fieldClass} {...register("amount")}>
            {LOAN_AMOUNTS.map((value) => (
              <option key={value} value={value}>
                {formatAmountLabel(value)}
              </option>
            ))}
          </select>
          {errors.amount ? <p className="mt-1 text-xs text-red-300">{errors.amount.message}</p> : null}
        </div>

        <div>
          <label htmlFor="purpose" className="mb-1.5 block text-sm font-medium text-white/90">
            Stručně uveďte účel úvěru
          </label>
          <textarea
            id="purpose"
            rows={3}
            className="w-full rounded-lg border border-white/15 bg-white px-3.5 py-3 text-base text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-accent md:text-sm"
            {...register("purpose")}
          />
          {errors.purpose ? <p className="mt-1 text-xs text-red-300">{errors.purpose.message}</p> : null}
        </div>

        <label className="flex items-start gap-2.5 text-sm leading-snug text-white/85">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 accent-accent"
            {...register("consent")}
          />
          <span>
            Souhlasím se zpracováním osobních údajů.{" "}
            <Link href="/ochrana-osobnich-udaju" className="underline underline-offset-2 hover:text-white">
              Ochrana osobních údajů
            </Link>
          </span>
        </label>
        {errors.consent ? <p className="-mt-2 text-xs text-red-300">{errors.consent.message}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-bold tracking-wide text-accent-foreground uppercase transition-colors hover:bg-[#5cb860] disabled:opacity-70"
        >
          {isSubmitting ? "Odesílám…" : "Odeslat poptávku"}
          {!isSubmitting ? <ArrowRight className="h-4 w-4" /> : null}
        </button>
      </form>

      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-white/70">
        <Lock className="h-3.5 w-3.5" />
        Vaše údaje jsou u nás v bezpečí
      </p>
    </div>
  )
}
