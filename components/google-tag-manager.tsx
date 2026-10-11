import Script from "next/script"

import { gtmBootstrapSnippet, resolveGtmId } from "@/lib/gtm-bootstrap"

const GTM_ID = resolveGtmId(process.env.NEXT_PUBLIC_GTM_ID)

export function GoogleTagManager() {
  return (
    <>
      <Script
        id="google-tag-manager"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: gtmBootstrapSnippet(GTM_ID),
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  )
}
