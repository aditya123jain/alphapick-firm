# Alphapick: firm website (alphapick.in)

Static company website for Alphapick, a proprietary trading firm that trades financial markets with its own capital.
It is a separate project from `alphapick-next` (the old advisory concept). Nothing was reused from that project.

## Stack

**Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, built with `output: "export"`.**
`next build` writes a plain static site to `out/`. There is no server and there are no API routes, so it can't sleep or get suspended.
Next was chosen over hand-written HTML for three reasons:

- shared layout, nav and footer across 6 pages
- `next/font`, which downloads Cormorant Garamond and Inter at build time and self-hosts them (no Google requests at runtime)
- per-page metadata and Open Graph tags

Client JS is limited to the hero canvas, the scroll reveal (IntersectionObserver), the IST/New York clocks and the mobile menu. Framer Motion and other animation libraries are not used.

| Route | File |
| --- | --- |
| `/` Home | `app/page.tsx` |
| `/about/` | `app/about/page.tsx` |
| `/what-we-do/` | `app/what-we-do/page.tsx` |
| `/careers/` | `app/careers/page.tsx` |
| `/careers/us-equity-trader/` | `app/careers/us-equity-trader/page.tsx` (role text lives in `lib/site.ts`) |
| `/contact/` | `app/contact/page.tsx` (mailto links only, no form) |
| 404 | `app/not-found.tsx` → `out/404.html` |

SEO: per-page titles, descriptions and canonicals; Open Graph and Twitter image `public/og.png` (1200×630); `public/robots.txt`; `public/sitemap.xml`; Organization JSON-LD.

Brand: `public/brand/logo-horizontal.svg` (for light backgrounds), `logo-horizontal-light.svg` (for dark backgrounds, used on the site) and `logo-mark.svg`. Favicons are `public/favicon.svg`, `favicon.ico`, `favicon-32.png` and `apple-touch-icon.png`, plus 192/512 manifest icons. The SVGs are produced by `scripts/make_logos.py`. The colors were sampled from the original JPGs: gold `#D4A251`, charcoal `#262A30`. The wordmark is outlined from Cormorant Garamond (SIL OFL) at weight 500, so it does not depend on installed fonts.

## Develop / build

```bash
npm ci
npm run dev            # http://localhost:3000
npm run build          # static export to ./out
npx serve out -l 4010  # preview the exact production output
npm run shots          # full-page screenshots to docs/screens (needs the preview server and Chrome)
```

## Deploy on Render (static site, free)

Render deploys from a Git repo, so push this folder to a GitHub, GitLab or Bitbucket repo first.

1. Render Dashboard → **New → Static Site** → connect the repo. You can also use **New → Blueprint**, which picks up `render.yaml`.
2. **Build command:** `npm ci && npm run build`
3. **Publish directory:** `out`
4. Environment: `NODE_VERSION=20` (also set in `render.yaml` and `.node-version`).
5. Create the site. Check that it loads on its `https://<name>.onrender.com` URL.
6. **Remove `alphapick.in` and `www.alphapick.in` from the old, suspended Render web service** (`alphapick-mqob`). A domain can only be attached to one service at a time.
7. On the new static site: **Settings → Custom Domains → Add** both `alphapick.in` and `www.alphapick.in`.
8. Update DNS at hosting.com (below). Then click **Verify** in Render. Render issues TLS certificates automatically and redirects HTTP to HTTPS.

## DNS at hosting.com (my.hosting.com, nameservers ns1–4.stableserver.net)

These follow Render's current custom-domain docs (render.com/docs/configure-other-dns):

| Host | Type | Value | Notes |
| --- | --- | --- | --- |
| `@` (alphapick.in) | **A** | `216.24.57.1` | Render's load-balancer IP. This is already the current value, so keep it. |
| `www` | **CNAME** | `<new-static-site>.onrender.com` | **Change this** from `alphapick-mqob.onrender.com` to the new static site's exact onrender.com hostname. |

- Remove any **AAAA** records on `@` or `www`. Render is IPv4-only, and AAAA records break verification.
- Remove any other A record on `@`, and turn off any hosting.com "domain forwarding" or parking for the apex or www.
- Use a low TTL (for example 300s) while switching. Check with `dig +short alphapick.in` and `dig +short www.alphapick.in`.

> **Do NOT touch the email records.** Leave every **MX** record, the **SPF** TXT (`v=spf1 … zoho …`), the **DKIM** TXT/CNAME (Zoho selector), and the **zoho-verification** TXT exactly as they are. Only the `@` A record and the `www` CNAME are involved in this change.

## Content rules (keep these when editing)

- Alphapick is a proprietary trading firm that trades financial markets with its own capital. It is not an advisory firm.
- No investment advice, picks, client solicitation or promises about returns. Don't use the word "fund" for the firm.
- No physical address, and no city name.
- No made-up stats, team, headcount, AUM, founding year, performance figures, testimonials or logos.
