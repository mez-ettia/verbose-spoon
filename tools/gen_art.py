#!/usr/bin/env python3
"""
Generates the scenic SVG artwork used across the Coco Ma site.

Every "photograph" on the site is a layered vector scene: gradient skies,
silhouette architecture, warm interior light and a film-grain pass. Keeping
the imagery vectorial means the whole site ships self-contained, scales to
any display and stays under a few hundred kilobytes.

    python3 tools/gen_art.py
"""

import os
import random

random.seed(1907)

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets", "img")

NAVY_DEEP = "#050B16"
NAVY = "#0A1730"
NAVY_LIT = "#15355E"
GOLD = "#C9A15C"
GOLD_WARM = "#E4C282"
LAMP = "#F0C97A"


def grain(fid, opacity=0.055, freq=0.9):
    """A subtle monochrome film grain, applied as a screen-blended overlay."""
    return f'''
  <filter id="{fid}" x="0%" y="0%" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="{freq}" numOctaves="3" stitchTiles="stitch" result="n"/>
    <feColorMatrix type="saturate" values="0" in="n" result="g"/>
    <feComponentTransfer in="g">
      <feFuncA type="linear" slope="{opacity}"/>
    </feComponentTransfer>
  </filter>'''


def bloom(fid, dev=9):
    return f'''
  <filter id="{fid}" x="-60%" y="-60%" width="220%" height="220%">
    <feGaussianBlur stdDeviation="{dev}"/>
  </filter>'''


def windows(x, y, w, h, cell=8, prob=0.22, color=GOLD_WARM, op=0.55, size=(2.0, 2.4)):
    """Scatter lit windows across a building face."""
    parts = []
    for i in range(max(1, int(w // cell))):
        for j in range(max(1, int(h // cell))):
            if random.random() < prob:
                o = op * random.uniform(0.30, 1.0)
                parts.append(
                    f'<rect x="{x + i * cell + 1.5:.1f}" y="{y + j * cell + 1.5:.1f}" '
                    f'width="{size[0]}" height="{size[1]}" fill="{color}" opacity="{o:.2f}"/>'
                )
    return "".join(parts)


def write(name, body):
    path = os.path.join(OUT, name)
    with open(path, "w") as fh:
        fh.write(body.strip() + "\n")
    print(f"  {name:24s} {len(body) // 1024:>4d} kB")


# ---------------------------------------------------------------------------
# Hero — a glass pavilion at night, city skyline beyond
# ---------------------------------------------------------------------------
def hero():
    W, H = 1100, 760
    horizon = 470

    skyline_far = []
    x = 0
    while x < 760:
        w = random.randint(24, 58)
        top = horizon - random.randint(60, 190)
        skyline_far.append(f'<rect x="{x}" y="{top}" width="{w}" height="{horizon - top}"/>')
        skyline_far.append(windows(x, top, w, horizon - top, cell=9, prob=0.20, op=0.42))
        x += w + random.randint(4, 16)

    skyline_near = []
    x = -20
    while x < 700:
        w = random.randint(34, 76)
        top = horizon - random.randint(90, 250)
        skyline_near.append(f'<rect x="{x}" y="{top}" width="{w}" height="{horizon - top}"/>')
        skyline_near.append(windows(x, top, w, horizon - top, cell=8, prob=0.28, op=0.72))
        x += w + random.randint(8, 22)

    # The landmark spire
    spire = f'''
    <polygon points="352,150 392,158 396,{horizon} 344,{horizon}" fill="#0C1E33"/>
    <polygon points="352,150 372,146 392,158 372,162" fill="#16304C"/>
    {windows(348, 160, 46, horizon - 160, cell=8, prob=0.30, op=0.70)}
    <line x1="372" y1="146" x2="372" y2="86" stroke="{GOLD}" stroke-width="1.1" opacity="0.55"/>
    <circle cx="372" cy="84" r="2.4" fill="{LAMP}" opacity="0.9"/>
    <circle cx="372" cy="84" r="9" fill="{LAMP}" opacity="0.28" filter="url(#hb)"/>'''

    # Reflections in the water, mirrored and smeared
    refl = []
    for cx, wd, op in ((372, 46, 0.30), (150, 40, 0.14), (250, 34, 0.12), (520, 44, 0.16), (620, 30, 0.10)):
        refl.append(
            f'<rect x="{cx - wd / 2:.0f}" y="{horizon}" width="{wd}" height="{random.randint(70, 150)}" '
            f'fill="url(#refl)" opacity="{op}"/>'
        )

    # Pavilion glazing bars
    mullions = "".join(
        f'<line x1="{mx}" y1="356" x2="{mx}" y2="{horizon + 10}" stroke="#0A1626" stroke-width="2.4" opacity="0.85"/>'
        for mx in range(618, 1010, 42)
    )

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="A contemporary glass pavilion glowing at night above a reflecting pool, with a distant city skyline">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0%" stop-color="#040A14"/>
      <stop offset="45%" stop-color="#08172B"/>
      <stop offset="100%" stop-color="#0C2340"/>
    </linearGradient>
    <radialGradient id="cityglow" cx="0.34" cy="0.62" r="0.55">
      <stop offset="0%" stop-color="#27578A" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#1E4874" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="houseglow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="{LAMP}" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="{LAMP}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0D2440"/>
      <stop offset="100%" stop-color="#050C18"/>
    </linearGradient>
    <linearGradient id="refl" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="{GOLD_WARM}" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="{GOLD_WARM}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="interior" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F2D194" stop-opacity="0.92"/>
      <stop offset="55%" stop-color="#C58F45" stop-opacity="0.80"/>
      <stop offset="100%" stop-color="#6B4620" stop-opacity="0.68"/>
    </linearGradient>
    <linearGradient id="roof" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#16283F"/>
      <stop offset="100%" stop-color="#070E1A"/>
    </linearGradient>
    <linearGradient id="vig" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#04080F" stop-opacity="0.9"/>
      <stop offset="30%" stop-color="#04080F" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#04080F" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="vigb" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#04080F" stop-opacity="0.55"/>
      <stop offset="40%" stop-color="#04080F" stop-opacity="0"/>
      <stop offset="100%" stop-color="#04080F" stop-opacity="0.75"/>
    </linearGradient>
    {bloom("hb", 10)}
    {bloom("hb2", 26)}
    {grain("hg", 0.05)}
  </defs>

  <rect width="{W}" height="{H}" fill="url(#sky)"/>
  <ellipse cx="380" cy="440" rx="560" ry="280" fill="url(#cityglow)"/>

  <g fill="#12283F" opacity="0.7">{''.join(skyline_far)}</g>
  <g fill="#0B1D31">{''.join(skyline_near)}</g>
  {spire}

  <!-- water -->
  <rect x="0" y="{horizon}" width="{W}" height="{H - horizon}" fill="url(#water)"/>
  <g filter="url(#hb)">{''.join(refl)}</g>
  <line x1="0" y1="{horizon}" x2="{W}" y2="{horizon}" stroke="{NAVY_LIT}" stroke-width="1" opacity="0.35"/>

  <!-- pavilion -->
  <ellipse cx="800" cy="440" rx="310" ry="200" fill="url(#houseglow)"/>
  <polygon points="596,352 1024,300 1024,334 596,382" fill="url(#roof)"/>
  <polygon points="596,382 1024,334 1024,346 596,394" fill="#050B14"/>
  <rect x="596" y="382" width="428" height="98" fill="url(#interior)"/>
  <rect x="596" y="382" width="428" height="98" fill="#0B1A2C" opacity="0.18"/>
  {mullions}
  <g filter="url(#hb)" opacity="0.75">
    <ellipse cx="690" cy="428" rx="34" ry="16" fill="{LAMP}"/>
    <ellipse cx="820" cy="422" rx="30" ry="14" fill="{LAMP}"/>
    <ellipse cx="944" cy="424" rx="30" ry="14" fill="{LAMP}"/>
  </g>
  <rect x="596" y="476" width="428" height="10" fill="#040A12"/>
  <!-- terrace steps down to the water -->
  <g fill="#08121E">
    <rect x="620" y="486" width="384" height="9"/>
    <rect x="638" y="495" width="348" height="9"/>
    <rect x="656" y="504" width="312" height="9"/>
  </g>
  <g fill="{LAMP}" opacity="0.55" filter="url(#hb)">
    <ellipse cx="662" cy="491" rx="16" ry="4"/>
    <ellipse cx="800" cy="500" rx="16" ry="4"/>
    <ellipse cx="944" cy="509" rx="16" ry="4"/>
  </g>
  <g filter="url(#hb2)" opacity="0.5">
    <rect x="620" y="514" width="384" height="130" fill="url(#refl)"/>
  </g>

  <!-- foreground planting -->
  <g fill="#030711">
    <ellipse cx="60" cy="560" rx="130" ry="90"/>
    <ellipse cx="1078" cy="600" rx="130" ry="112"/>
    <ellipse cx="620" cy="600" rx="90" ry="60"/>
  </g>

  <rect width="{W}" height="{H}" fill="url(#vig)"/>
  <rect width="{W}" height="{H}" fill="url(#vigb)"/>
  <rect width="{W}" height="{H}" filter="url(#hg)" opacity="0.6" style="mix-blend-mode:overlay"/>
</svg>'''


# ---------------------------------------------------------------------------
# Property 1 — Albert Park apartment, skyline through the glazing
# ---------------------------------------------------------------------------
def prop_albert_park():
    W, H = 760, 500
    bars = "".join(
        f'<line x1="{x}" y1="52" x2="{x}" y2="330" stroke="#0A121C" stroke-width="7" opacity="0.9"/>'
        for x in (150, 300, 450, 600)
    )
    city = []
    x = 60
    while x < 720:
        w = random.randint(22, 46)
        top = 300 - random.randint(50, 150)
        city.append(f'<rect x="{x}" y="{top}" width="{w}" height="{300 - top}" fill="#101E30"/>')
        city.append(windows(x, top, w, 300 - top, cell=8, prob=0.26, op=0.6))
        x += w + random.randint(6, 18)

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="A softly lit living room framed by full-height glazing over a city skyline at dusk">
  <defs>
    <linearGradient id="p1sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0A1A2E"/>
      <stop offset="70%" stop-color="#1B3E5F"/>
      <stop offset="100%" stop-color="#3A4E5C"/>
    </linearGradient>
    <linearGradient id="p1room" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#241D14" stop-opacity="0"/>
      <stop offset="60%" stop-color="#1A1610" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0B0906" stop-opacity="0.95"/>
    </linearGradient>
    <radialGradient id="p1lamp" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#F2CE8C" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#F2CE8C" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="p1vig" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#05080E" stop-opacity="0.6"/>
      <stop offset="45%" stop-color="#05080E" stop-opacity="0"/>
      <stop offset="100%" stop-color="#05080E" stop-opacity="0.85"/>
    </linearGradient>
    {bloom("p1b", 14)}
    {grain("p1g", 0.06)}
  </defs>
  <rect width="{W}" height="{H}" fill="#0B0E14"/>
  <rect x="40" y="52" width="680" height="278" fill="url(#p1sky)"/>
  <g>{''.join(city)}</g>
  {bars}
  <rect x="40" y="46" width="680" height="8" fill="#080D14"/>
  <rect x="40" y="330" width="680" height="12" fill="#080D14"/>

  <!-- interior -->
  <rect y="300" width="{W}" height="200" fill="#1D170E"/>
  <ellipse cx="150" cy="310" rx="200" ry="120" fill="url(#p1lamp)"/>
  <ellipse cx="640" cy="320" rx="130" ry="80" fill="url(#p1lamp)"/>
  <g fill="#151107">
    <rect x="90" y="352" width="300" height="74" rx="10"/>
    <rect x="104" y="332" width="52" height="30" rx="8"/>
    <rect x="330" y="332" width="52" height="30" rx="8"/>
    <rect x="430" y="378" width="180" height="16" rx="4"/>
    <rect x="470" y="394" width="14" height="46"/>
    <rect x="556" y="394" width="14" height="46"/>
  </g>
  <g fill="#2A2318" opacity="0.75">
    <rect x="98" y="344" width="284" height="14" rx="7"/>
  </g>
  <g filter="url(#p1b)" opacity="0.85">
    <ellipse cx="668" cy="300" rx="16" ry="20" fill="#F5D79B"/>
  </g>
  <rect x="656" y="318" width="24" height="122" fill="#0C0A06"/>
  <rect width="{W}" height="{H}" fill="url(#p1room)"/>
  <rect width="{W}" height="{H}" fill="url(#p1vig)"/>
  <rect width="{W}" height="{H}" filter="url(#p1g)" opacity="0.55" style="mix-blend-mode:overlay"/>
</svg>'''


# ---------------------------------------------------------------------------
# Property 2 — Portsea, infinity pool at last light
# ---------------------------------------------------------------------------
def prop_portsea():
    W, H = 760, 500
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="An infinity pool at dusk beside a lit glass pavilion looking out to the ocean">
  <defs>
    <linearGradient id="p2sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0A1730"/>
      <stop offset="52%" stop-color="#2E4460"/>
      <stop offset="78%" stop-color="#8A6A4A"/>
      <stop offset="100%" stop-color="#C89257"/>
    </linearGradient>
    <linearGradient id="p2sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2C3E52"/>
      <stop offset="100%" stop-color="#16273A"/>
    </linearGradient>
    <linearGradient id="p2pool" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#31536F"/>
      <stop offset="100%" stop-color="#0E2237"/>
    </linearGradient>
    <linearGradient id="p2glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F3D093" stop-opacity="0.92"/>
      <stop offset="100%" stop-color="#8A5C28" stop-opacity="0.7"/>
    </linearGradient>
    <linearGradient id="p2vig" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#05080E" stop-opacity="0.5"/>
      <stop offset="42%" stop-color="#05080E" stop-opacity="0"/>
      <stop offset="100%" stop-color="#05080E" stop-opacity="0.8"/>
    </linearGradient>
    {bloom("p2b", 12)}
    {grain("p2g", 0.06)}
  </defs>
  <rect width="{W}" height="{H}" fill="url(#p2sky)"/>
  <rect y="252" width="{W}" height="60" fill="url(#p2sea)"/>
  <rect y="250" width="{W}" height="3" fill="#E0B172" opacity="0.5"/>
  <g opacity="0.35" filter="url(#p2b)">
    <ellipse cx="600" cy="256" rx="180" ry="26" fill="#E8B478"/>
  </g>

  <!-- headland -->
  <path d="M0,258 C90,236 180,244 250,258 L250,300 L0,300 Z" fill="#0C1626"/>

  <!-- pavilion, left -->
  <g>
    <polygon points="20,150 300,138 300,170 20,182" fill="#111C2A"/>
    <rect x="34" y="176" width="252" height="88" fill="url(#p2glass)"/>
    <rect x="34" y="176" width="252" height="88" fill="#122033" opacity="0.16"/>
    <g stroke="#0B1420" stroke-width="3">
      <line x1="96" y1="176" x2="96" y2="264"/>
      <line x1="160" y1="176" x2="160" y2="264"/>
      <line x1="224" y1="176" x2="224" y2="264"/>
    </g>
    <rect x="20" y="262" width="280" height="10" fill="#080F19"/>
  </g>

  <!-- deck & pool -->
  <rect y="300" width="{W}" height="200" fill="#1A1E22"/>
  <path d="M110,318 L700,318 L760,470 L60,470 Z" fill="url(#p2pool)"/>
  <path d="M110,318 L700,318 L706,326 L106,326 Z" fill="#7FA9C4" opacity="0.5"/>
  <g opacity="0.5" filter="url(#p2b)">
    <rect x="150" y="330" width="70" height="130" fill="#F0C88C" opacity="0.35"/>
    <rect x="420" y="330" width="90" height="130" fill="#F0C88C" opacity="0.25"/>
  </g>
  <g stroke="#9FC3D8" stroke-width="1.4" opacity="0.30">
    <path d="M140,352 C260,344 420,360 640,350" fill="none"/>
    <path d="M120,392 C280,384 460,400 690,388" fill="none"/>
    <path d="M96,436 C300,426 500,444 730,430" fill="none"/>
  </g>
  <g fill="#0E1116">
    <rect x="596" y="286" width="10" height="40"/>
    <ellipse cx="601" cy="278" rx="34" ry="12"/>
    <rect x="660" y="290" width="8" height="36"/>
    <ellipse cx="664" cy="282" rx="28" ry="10"/>
  </g>
  <rect width="{W}" height="{H}" fill="url(#p2vig)"/>
  <rect width="{W}" height="{H}" filter="url(#p2g)" opacity="0.5" style="mix-blend-mode:overlay"/>
</svg>'''


# ---------------------------------------------------------------------------
# Property 3 — Canterbury, a lit entry beneath established trees
# ---------------------------------------------------------------------------
def prop_canterbury():
    W, H = 760, 500
    canopy = []
    for cx, cy, rx, ry, op in (
        (70, 168, 165, 150, 1.0), (196, 104, 140, 118, 1.0), (654, 152, 180, 158, 1.0),
        (534, 96, 132, 108, 1.0), (372, 44, 168, 104, 1.0), (726, 258, 130, 140, 1.0),
        (128, 250, 120, 128, 1.0), (620, 274, 116, 122, 1.0),
    ):
        canopy.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="#050D12" opacity="{op}"/>')

    trunks = "".join(
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#0A1218"/>'
        for x, y, w, h in ((150, 150, 13, 230), (596, 140, 15, 250), (250, 120, 9, 240))
    )
    uplights = "".join(
        f'<ellipse cx="{x}" cy="{y}" rx="{r}" ry="{r * 0.4:.0f}" fill="#E9BE79" opacity="0.5"/>'
        for x, y, r in ((156, 382, 40), (604, 392, 44), (300, 400, 30), (470, 400, 30))
    )

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="A warmly lit entry portico framed by established trees and garden uplighting at night">
  <defs>
    <linearGradient id="p3sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#060D18"/>
      <stop offset="100%" stop-color="#101F2C"/>
    </linearGradient>
    <linearGradient id="p3door" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FBE3B4"/>
      <stop offset="60%" stop-color="#E0A855"/>
      <stop offset="100%" stop-color="#A8712C"/>
    </linearGradient>
    <radialGradient id="p3glow" cx="0.5" cy="0.55" r="0.5">
      <stop offset="0%" stop-color="#F0C382" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="#F0C382" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="p3path" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3A3227"/>
      <stop offset="100%" stop-color="#0C0E12"/>
    </linearGradient>
    <linearGradient id="p3vig" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#04070C" stop-opacity="0.65"/>
      <stop offset="45%" stop-color="#04070C" stop-opacity="0"/>
      <stop offset="100%" stop-color="#04070C" stop-opacity="0.8"/>
    </linearGradient>
    {bloom("p3b", 18)}
    {bloom("p3b2", 6)}
    {grain("p3g", 0.06)}
  </defs>
  <rect width="{W}" height="{H}" fill="url(#p3sky)"/>

  <!-- facade -->
  <rect x="230" y="140" width="300" height="250" fill="#0B131B"/>
  <rect x="248" y="150" width="264" height="14" fill="#101A24"/>
  <ellipse cx="380" cy="316" rx="190" ry="140" fill="url(#p3glow)"/>
  <rect x="336" y="212" width="88" height="178" fill="url(#p3door)"/>
  <g stroke="#7C5222" stroke-width="2" opacity="0.55">
    <line x1="380" y1="212" x2="380" y2="390"/>
    <line x1="336" y1="270" x2="424" y2="270"/>
  </g>
  <rect x="326" y="204" width="108" height="12" fill="#0A1119"/>
  <rect x="318" y="200" width="10" height="190" fill="#0A1119"/>
  <rect x="432" y="200" width="10" height="190" fill="#0A1119"/>
  <g filter="url(#p3b)" opacity="0.7">
    <rect x="330" y="212" width="100" height="180" fill="#F2C889"/>
  </g>
  <g fill="#EFC489" opacity="0.75" filter="url(#p3b2)">
    <circle cx="300" cy="248" r="4"/>
    <circle cx="460" cy="248" r="4"/>
  </g>

  <!-- trees -->
  {trunks}
  <g>{''.join(canopy)}</g>

  <!-- ground -->
  <rect y="386" width="{W}" height="114" fill="#080B10"/>
  <path d="M300,386 L460,386 L540,500 L220,500 Z" fill="url(#p3path)" opacity="0.85"/>
  <g filter="url(#p3b)">{uplights}</g>
  <g opacity="0.35" filter="url(#p3b)">
    <rect x="330" y="392" width="100" height="90" fill="#EFC489"/>
  </g>
  <rect width="{W}" height="{H}" fill="url(#p3vig)"/>
  <rect width="{W}" height="{H}" filter="url(#p3g)" opacity="0.5" style="mix-blend-mode:overlay"/>
</svg>'''


# ---------------------------------------------------------------------------
# Portrait — an editorial rim-lit silhouette
# ---------------------------------------------------------------------------
def portrait():
    """A back-three-quarter editorial portrait. The figure is turned away, so
    the frame is carried by the fall of the hair, the line of the shoulder and
    a single hard rim light - no face to render, and none needed."""
    W, H = 520, 720

    # Head and hair as one mass, cropped by the top of the frame.
    hair = (
        "M 258,44 "
        "C 348,44 396,116 392,206 "
        "C 388,268 376,330 372,392 "
        "C 370,452 384,520 396,596 "
        "C 404,650 406,690 402,720 "
        "L 132,720 "
        "C 126,684 132,634 144,580 "
        "C 158,514 168,452 166,394 "
        "C 162,330 150,268 146,206 "
        "C 142,116 168,44 258,44 Z"
    )
    # Tailoring: shoulders rising behind the hair.
    coat = (
        "M 168,470 C 116,498 74,548 58,606 C 44,654 38,692 36,720 "
        "L 496,720 C 492,690 484,650 468,606 C 448,550 404,500 352,472 "
        "C 330,516 316,566 308,624 C 296,566 282,516 260,478 Z"
    )
    rim = (
        "M 262,44 C 350,46 396,116 392,206 "
        "C 388,268 376,330 372,392 "
        "C 370,452 384,520 396,596 "
        "C 404,646 406,686 403,716"
    )
    coat_rim = "M 352,472 C 404,500 448,550 468,606 C 482,648 490,686 494,716"
    # A few strands catching the light as the hair falls.
    strands = [
        "M 336,110 C 366,180 372,266 362,344 C 354,414 366,506 380,596",
        "M 300,80 C 330,168 338,262 330,340 C 322,412 332,500 344,590",
        "M 200,96 C 178,180 176,268 186,346 C 194,416 184,506 172,594",
    ]

    strand_svg = "".join(
        f'<path d="{d}" fill="none" stroke="url(#ptstrand)" stroke-width="{w}" opacity="{o}"/>'
        for d, w, o in zip(strands, (2.2, 1.6, 1.3), (0.5, 0.34, 0.22))
    )

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="An editorial portrait: a figure in dark tailoring turned away from camera, rim lit against a black studio background">
  <defs>
    <radialGradient id="ptbg" cx="0.6" cy="0.22" r="0.86">
      <stop offset="0%" stop-color="#5B6472"/>
      <stop offset="26%" stop-color="#333A45"/>
      <stop offset="58%" stop-color="#14171C"/>
      <stop offset="100%" stop-color="#030405"/>
    </radialGradient>
    <linearGradient id="pthair" x1="0.08" y1="0.1" x2="0.95" y2="0.9">
      <stop offset="0%" stop-color="#030304"/>
      <stop offset="52%" stop-color="#070709"/>
      <stop offset="82%" stop-color="#101015"/>
      <stop offset="100%" stop-color="#1E1C23"/>
    </linearGradient>
    <linearGradient id="ptcoat" x1="0" y1="0" x2="1" y2="0.6">
      <stop offset="0%" stop-color="#040405"/>
      <stop offset="72%" stop-color="#08080B"/>
      <stop offset="100%" stop-color="#14141A"/>
    </linearGradient>
    <linearGradient id="ptrim" x1="0.1" y1="0" x2="0.9" y2="1">
      <stop offset="0%" stop-color="#F4EEE2" stop-opacity="0.15"/>
      <stop offset="22%" stop-color="#F7F2E7" stop-opacity="0.80"/>
      <stop offset="56%" stop-color="#CFC4AE" stop-opacity="0.46"/>
      <stop offset="100%" stop-color="#CFC4AE" stop-opacity="0.05"/>
    </linearGradient>
    <linearGradient id="ptstrand" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0%" stop-color="#B9AE9A" stop-opacity="0.7"/>
      <stop offset="60%" stop-color="#8A8175" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#8A8175" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="ptfade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#030405" stop-opacity="0.5"/>
      <stop offset="30%" stop-color="#030405" stop-opacity="0"/>
      <stop offset="100%" stop-color="#030405" stop-opacity="0.92"/>
    </linearGradient>
    <linearGradient id="ptside" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#030405" stop-opacity="0.72"/>
      <stop offset="38%" stop-color="#030405" stop-opacity="0"/>
      <stop offset="100%" stop-color="#030405" stop-opacity="0.35"/>
    </linearGradient>
    {bloom("ptb", 20)}
    {grain("ptg", 0.075, 1.05)}
  </defs>

  <rect width="{W}" height="{H}" fill="url(#ptbg)"/>
  <ellipse cx="300" cy="150" rx="230" ry="210" fill="#6E7887" opacity="0.42" filter="url(#ptb)"/>

  <path d="{coat}" fill="url(#ptcoat)"/>
  <path d="{coat_rim}" fill="none" stroke="url(#ptrim)" stroke-width="3" stroke-linecap="round"/>
  <path d="{hair}" fill="url(#pthair)"/>
  {strand_svg}
  <path d="{rim}" fill="none" stroke="url(#ptrim)" stroke-width="3.6" stroke-linecap="round"/>
  <path d="{rim}" fill="none" stroke="url(#ptrim)" stroke-width="15" opacity="0.42" stroke-linecap="round" filter="url(#ptb)"/>

  <rect width="{W}" height="{H}" fill="url(#ptside)"/>
  <rect width="{W}" height="{H}" fill="url(#ptfade)"/>
  <rect width="{W}" height="{H}" filter="url(#ptg)" opacity="0.7" style="mix-blend-mode:overlay"/>
</svg>'''


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    print("Rendering scenic artwork ->", OUT)
    write("hero-pavilion.svg", hero())
    write("property-albert-park.svg", prop_albert_park())
    write("property-portsea.svg", prop_portsea())
    write("property-canterbury.svg", prop_canterbury())
    write("portrait-coco-ma.svg", portrait())
