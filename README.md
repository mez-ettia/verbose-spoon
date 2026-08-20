# Coco Ma — private property advisory

A recreation of the Coco Ma homepage mockup: a dark, gold-leaf editorial site for a
Melbourne-based private property advisor.

It is a static site with no build step and no third-party requests at runtime —
open `index.html` and it runs.

```
index.html                 the homepage
assets/css/fonts.css       self-hosted @font-face declarations
assets/css/styles.css      the design system and all layout
assets/js/main.js          sticky header, scroll reveals, mobile menu
assets/fonts/*.woff2       Cormorant Garamond, Jost, Italianno (latin subsets)
assets/img/*.svg           the monogram and every "photograph" on the page
assets/img/photo/          drop-in slot for real photography (see its README)
tools/gen_art.py           regenerates the scenic artwork
tools/gen_logo.py          regenerates the CM monogram
tools/use_photos.py        swaps the vector art for photographs, and back
tools/build_single.py      bundles everything into dist/coco-ma.html
tools/shot.js              Playwright screenshots, used for visual QA
```

## Design notes

**Palette.** Deep navy through near-black, lit by a single gold. The navy is layered
rather than flat — every band carries its own gradient so the page reads as folded
silk rather than as a stack of boxes.

**Type.** Cormorant Garamond carries the display voice: high-contrast Didone serif,
light weight, generous size. Jost handles everything functional at small sizes, always
uppercase and always at wide tracking (`0.2em`–`0.34em`), which is what gives the page
its quiet, spaced-out formality. Italianno appears exactly once, for the signature.

**Imagery.** Every image on the page is a layered SVG scene rather than a photograph —
gradient skies, silhouette architecture, warm interior light and a `feTurbulence` grain
pass. The trade is realism for a site that ships self-contained, stays sharp at any
density and weighs under half a megabyte all in. `tools/gen_art.py` is where the scenes
are composed.

Real photography drops straight in: put the files in `assets/img/photo/` and run
`python3 tools/use_photos.py --on`. The hero deliberately stays vector either way — it
sits behind a heavy mask and a gradient wash, so it reads as atmosphere rather than as a
photograph, and mixing media there is far less visible than inside the three-card row.

**The monogram.** Drawn as geometry, not traced. The C is an ellipse arc whose stroke
weight swells at the left flank and tapers to points at both terminals; the M is built
from four separately weighted strokes so the thick/thin modulation stays true at any
size. See `tools/gen_logo.py`.

**Motion.** Sections fade up on first intersection. Gold hairlines travel along the
silk curves in the hero on a long, offset loop. Everything is disabled under
`prefers-reduced-motion`.

## Regenerating

```bash
python3 tools/gen_art.py      # scenic SVGs -> assets/img/
python3 tools/gen_logo.py     # monogram    -> assets/img/monogram-cm.svg
python3 tools/build_single.py # everything  -> dist/coco-ma.html
```

## Visual QA

```bash
npm install                                        # playwright
node tools/shot.js index.html out.png 1440 900     # url|path, out, width, height
```

The script scrolls the page before capturing so scroll-triggered reveals are in their
settled state.

## Deviations from the mockup

- The mockup labels the third property `CANTEBURY`; this uses **Canterbury**, the actual
  Melbourne suburb.
- The mockup's viewport cuts off below "Let's Connect". An **Insights** band and a footer
  were added so that every item in the navigation resolves to something on the page.
- Photography is vector artwork (see *Imagery* above). Photographs for the portrait and
  the three property cards were generated separately; `assets/img/photo/README.md` records
  the prompts and how to drop them in.

## Licence

Fonts are Google Fonts originals under the SIL Open Font License 1.1. Everything else in
this repository is original work for this mockup.
