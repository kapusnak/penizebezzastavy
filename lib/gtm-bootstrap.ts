const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/

/** This site only. Do not substitute a container from a sibling web. */
export const DEFAULT_GTM_ID = "GTM-K5RM37ZS"

export function resolveGtmId(raw?: string | null): string {
  const value = raw?.trim() ?? ""
  return GTM_ID_PATTERN.test(value) ? value : DEFAULT_GTM_ID
}

/**
 * Inline bootstrap that runs before gtm.js.
 * Defines dataLayer and the standard gtag stub so later `gtag('event', …)`
 * commands queue on the same layer GTM's Google tag reads.
 * Does not load gtag.js and does not call `gtag('config')` (that would duplicate page_view).
 */
export function gtmBootstrapSnippet(gtmId: string): string {
  const id = resolveGtmId(gtmId)
  return `window.dataLayer = window.dataLayer || [];
window.gtag = function(){dataLayer.push(arguments)};
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');`
}
