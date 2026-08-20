# Coco Ma — Exclusive Property

A rebuild of [cmrealestate.com.au](https://www.cmrealestate.com.au) as a dark, editorial
luxury site: deep navy, gold foil, high-contrast serif display type, and an
interactive buyer concierge ("Emily") on the homepage and at `/emily`.

Next.js 16 (App Router) + Tailwind v4 + Motion, exported to fully static HTML —
it deploys to Vercel, Netlify, Cloudflare Pages, S3, or any static host.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
npm run lint
```

---

## What's here

| Route | Purpose |
| --- | --- |
| `/` | Hero, live stats, featured listings, Emily, five-stage process, suburbs, reviews, team, CTA |
| `/buy` | Full listing grid with live status / suburb / price / bedroom filters |
| `/property/[slug]` | Listing detail with specs, features, agent panel, `SingleFamilyResidence` schema |
| `/sell` | Four vendor promises, the process, recent results, appraisal form |
| `/emily` | The buyer concierge in full, plus straight-answer FAQs |
| `/suburbs` | The six-suburb service area with medians, growth and days on market |
| `/about` | Agency story, twelve-month numbers, recognition, full team |
| `/contact` | Office details, hours, enquiry form |

`/sitemap.xml` and `/robots.txt` generate at build time. `RealEstateAgent`
structured data ships on every page.

---

## Editing content

Everything user-facing lives in `src/lib/` — no component edits needed.

- **`site.ts`** — name, phone, email, address, socials, nav, headline stats, awards.
- **`properties.ts`** — the listing set. Meant to be replaced by a feed from the
  agency CRM (Console / VaultRE / AgentBox); the shape is deliberately flat.
- **`team.ts`** — roster, roles, languages, bios.
- **`suburbs.ts`** — service area, medians, growth, days on market.
- **`testimonials.ts`** — review quotes. Swap in real RateMyAgent quotes with the
  reviewer's consent before launch.

The figures in `site.ts` and `suburbs.ts` come from public agency records and
should be refreshed each quarter.

## Photography

The site launches without photos. Every listing renders generated brand
artwork — a navy silk ground with a fine architectural elevation — and is
labelled *"Photography to come"* so nothing misrepresents a home.

To use real images, drop a file and rebuild:

```
public/listings/<property-slug>.jpg     # or .webp / .avif / .png
public/team/<member-slug>.jpg
```

`src/lib/media.ts` resolves these at build time, the placeholder and its label
disappear, and no code changes are required.

To regenerate or restyle the artwork itself:

```bash
node scripts/gen-art.mjs
```

It is seeded per slug, so the same listing always gets the same artwork. If you
add a listing, add its slug to the `slugs` array in that script.

## Enquiry forms

Both forms (`/sell#appraisal` and `/contact`) work with no backend: without
configuration they open a pre-filled email, so an enquiry is never dropped into
a form that goes nowhere.

To post them somewhere instead — Formspree, a Cloudflare Worker, a CRM webhook,
anything that accepts JSON — set:

```
NEXT_PUBLIC_FORM_ENDPOINT=https://…
```

Both forms carry a honeypot field for spam.

## Accessibility & motion

Skip link, visible gold focus rings, `aria-live` on the filter count and Emily's
log, and labelled controls throughout. Every animation — reveals, the counters,
the marquee, the trailing cursor, the hero parallax — is disabled under
`prefers-reduced-motion`. The trailing cursor also never renders on touch.

## Deploying

`npm run build` writes `./out`. Point any static host at it. `trailingSlash` is
on, so directory-style URLs resolve without server rewrites.
