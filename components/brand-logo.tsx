import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"

export function BrandLogo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <img src="/logo.svg" alt="" width={48} height={48} className="h-11 w-11 shrink-0 sm:h-12 sm:w-12" />
      <span className="min-w-0 leading-tight">
        <span className="block font-display text-[0.95rem] font-extrabold tracking-tight text-primary sm:text-lg">
          {SITE.brand}
        </span>
        {!compact ? (
          <span className="mt-0.5 hidden text-[0.62rem] font-semibold uppercase tracking-[0.04em] text-muted-foreground sm:block">
            {SITE.tagline}
          </span>
        ) : null}
      </span>
    </span>
  )
}
