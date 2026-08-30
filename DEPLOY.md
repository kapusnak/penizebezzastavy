# PenizeBezZastavy.cz — nasazení (Railway)

## Lokální vývoj

1. Zkopírujte `.env.example` → `.env.local` a vyplňte `SMTP_PASS`.
2. `npm install`
3. `npm run dev`

Schránka je **info@smartfinvest.cz** (From v inboxu ukáže `PenizeBezZastavy.cz`). Nový mailbox `info@penizebezzastavy.cz` se nezakládá.

Bez SMTP hesla vrací `POST /api/lead` 500 — očekávané.

## Railway

Web běží jako **Node server** (`next start`), ne jako static export. Bez serveru nefunguje `POST /api/lead`.

```bash
npm install
npm run build
npm start   # next start -p ${PORT:-3000}
```

- Builder: Nixpacks (`nixpacks.toml` → Node 20)
- Start: `railway.json` → `npm start`
- `NEXT_PUBLIC_*` musí být nastavené **před** buildem (Railway Variables)

### Server env (tajné)

```
SMTP_HOST=mail.spacemail.com
SMTP_PORT=465
SMTP_USER=info@smartfinvest.cz
SMTP_PASS=
LEAD_NOTIFY_TO=info@smartfinvest.cz
# MAIL_FROM="PenizeBezZastavy.cz <info@smartfinvest.cz>"
```

### Veřejné env (při buildu)

```
NEXT_PUBLIC_SITE_URL=https://penizebezzastavy.cz
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

## DNS (Vedos)

| Záznam | Typ | Cíl |
|--------|-----|-----|
| `@` | ALIAS | `….up.railway.app` |
| `_railway-verify` | TXT | hodnota z Railway |
| `www` | CNAME | dle Railway UI |

Mail DNS (MX/SPF/DKIM) pro penizebezzastavy.cz se **neřeší** — schránka je na smartfinvest.cz.

## Smoke test po nasazení

- [ ] Homepage, `/jak-to-funguje`, `/kontakty`, legal stránky 200
- [ ] `/sitemap.xml` a `/robots.txt` s produkční doménou
- [ ] Header CTA → `/#poptavka`
- [ ] Formulář (calculator) → mail na `LEAD_NOTIFY_TO` včetně IP
- [ ] Popup + CTA → callback mail
- [ ] Calculator s e-mailem → klientské potvrzení (telefon 256)
- [ ] Pop-up po ~12 s
- [ ] Mobilní menu
- [ ] OG image a favicon
