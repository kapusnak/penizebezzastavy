import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"

const BRAND_ACCENT = "Bez"

export function BrandLogo({ className, compact = false }: { className?: string; compact?: boolean }) {
  const accentAt = SITE.brand.indexOf(BRAND_ACCENT)
  const brandBefore = SITE.brand.slice(0, accentAt)
  const brandAfter = SITE.brand.slice(accentAt + BRAND_ACCENT.length)

  return (
    <span className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <img src="/logo.svg" alt="" width={48} height={48} className="h-11 w-11 shrink-0 sm:h-12 sm:w-12" />
      <span className="min-w-0 leading-tight">
        <span className="block font-display text-[0.95rem] font-extrabold tracking-tight text-primary sm:text-lg">
          {brandBefore}
          <span className="text-accent">{BRAND_ACCENT}</span>
          {brandAfter}
        </span>
        {!compact ? (
          <span className="mt-0.5 block text-[0.65rem] leading-snug font-medium text-muted-foreground sm:text-[0.7rem]">
            {SITE.tagline}
          </span>
        ) : null}
      </span>
    </span>
  )
}
