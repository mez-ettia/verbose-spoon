# Photography slots

Four photographs were generated for this site (OpenArt, Kling 3 Omni, 1K). They live
in the OpenArt account they were generated from; this session could not download them
because `cdn.openart.ai` is not on its egress allowlist.

To use them, save each one here under the exact filename below, then run:

```bash
python3 tools/use_photos.py --on     # point index.html at the photographs
python3 tools/use_photos.py --off    # go back to the vector artwork
python3 tools/build_single.py        # rebuild dist/coco-ma.html
```

| File                        | Aspect | Generation id          |
|-----------------------------|--------|------------------------|
| `portrait-coco-ma.png`      | 3:4    | `2fkL36kW3uaMt7fVdfRz` |
| `property-albert-park.png`  | 3:2    | `twNR7AS78Q1sdWG96oo5` |
| `property-portsea.png`      | 3:2    | `PEto6QdLornlWHyEmd8x` |
| `property-canterbury.png`   | 3:2    | `iR04A03MObpXRbdHm4Cc` |

`use_photos.py` accepts `.png`, `.jpg`, `.jpeg` or `.webp`, so re-encoding for weight is
fine — the site does not care which.

## The prompts used

**Portrait** — Editorial low-key studio portrait of an elegant woman in her late thirties,
long dark wavy hair falling past her shoulders, wearing a sharply tailored black blazer
over a black top with a fine gold pendant. Three-quarter turn toward camera, calm
confident expression, direct gaze. A single soft key light from the left and a hard rim
light separating her silhouette from a pure black seamless background. Rich warm skin
tones against near-monochrome darkness, deep shadow, luxury brand photography,
medium-format look, 85mm, shallow depth of field, fine film grain.

**Haig Place, Albert Park** — Interior of a luxury Melbourne apartment at blue hour, seen
from a darkened living room looking out through floor-to-ceiling glazing with slim black
mullions. Beyond the glass, a skyline of lit towers under a deep navy sky. Inside, a low
linen sofa in silhouette, a warm table lamp casting a pool of amber light, a slender
sculptural floor lamp. Cinematic low-key architectural photography, deep midnight-navy
and warm gold palette, soft volumetric light, fine film grain, shallow depth of field.

**Ocean Pavilion, Portsea** — A modern coastal residence at dusk on the Mornington
Peninsula: an infinity pool in the foreground reflecting a glass pavilion whose interior
glows warm amber, with the ocean horizon and last light beyond. Dark timber decking, two
low silhouetted umbrellas at the pool edge. Deep navy sky grading to burnt gold at the
horizon, still water. Cinematic low-key architectural photography, soft volumetric light,
fine film grain.

**Riversdale Residence, Canterbury** — A grand private residence entrance at night, framed
by mature established trees. A tall warm-lit doorway glows amber at the centre of a dark
rendered facade, flanked by two small wall sconces. Garden uplighting rakes the tree
trunks and canopy above; a stone path leads to the door. Deep navy night sky, warm gold
pools of light, heavy shadow. Cinematic low-key architectural photography, soft volumetric
light, fine film grain.

Each prompt ended with "No people, no text, no watermark, no logo" (the portrait omitted
"no people").
