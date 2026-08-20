# Scripts

- **`gen-art.mjs`** — generates the brand artwork in `public/brand/`. Seeded per
  slug, so output is stable between builds. Run after adding a listing.
- **`shots.mjs`**, **`inspect.mjs`**, **`hero.mjs`** — Playwright screenshot
  helpers used during design review. They expect the static export to be served
  on `localhost:3211` (`npx serve out -l 3211`).
- **`verify.mjs`** — smoke test: every route returns 200, no console errors, one
  `h1` per page, no horizontal overflow at 1440px or 360px, and the `/buy`
  filters actually filter.
