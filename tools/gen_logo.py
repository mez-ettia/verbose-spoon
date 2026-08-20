#!/usr/bin/env python3
"""
Draws the Coco Ma "CM" monogram as pure geometry.

The C is a Didone crescent: an ellipse arc whose stroke weight swells at the
left flank and tapers to points at both terminals. The M is assembled from
individually weighted strokes - thin left stem, heavy left diagonal, hairline
right diagonal, heavy right stem - so the letter keeps true high-contrast
serif modulation at any size.

    python3 tools/gen_logo.py
"""

import math
import os

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets", "img")


def crescent(cx, cy, rx, ry, a0, a1, t_max, t_min, steps=160):
    """A tapered arc: returns a closed path swept between an outer and inner edge."""
    outer, inner = [], []
    for i in range(steps + 1):
        u = i / steps
        theta = math.radians(a0 + (a1 - a0) * u)
        # Weight swells mid-arc and tapers to a point at each terminal.
        swell = math.sin(math.pi * u) ** 0.62
        t = t_min + (t_max - t_min) * swell
        ux, uy = math.cos(theta), math.sin(theta)
        outer.append((cx + ux * (rx + t / 2), cy + uy * (ry + t / 2)))
        inner.append((cx + ux * (rx - t / 2), cy + uy * (ry - t / 2)))
    pts = outer + inner[::-1]
    head = f"M {pts[0][0]:.2f},{pts[0][1]:.2f}"
    body = " ".join(f"L {x:.2f},{y:.2f}" for x, y in pts[1:])
    return f"{head} {body} Z"


def bar(x0, y0, x1, y1, w):
    """A straight stroke of constant width, returned as a closed quad."""
    dx, dy = x1 - x0, y1 - y0
    ln = math.hypot(dx, dy)
    nx, ny = -dy / ln * w / 2, dx / ln * w / 2
    pts = [(x0 + nx, y0 + ny), (x1 + nx, y1 + ny), (x1 - nx, y1 - ny), (x0 - nx, y0 - ny)]
    return "M " + " L ".join(f"{x:.2f},{y:.2f}" for x, y in pts) + " Z"


def serif(cx, y, half, thick, flare=1.0):
    """A bracketed slab serif centred on cx sitting on the line y."""
    h = thick
    return (
        f"M {cx - half:.2f},{y:.2f} "
        f"L {cx + half:.2f},{y:.2f} "
        f"L {cx + half * flare:.2f},{y + h:.2f} "
        f"L {cx - half * flare:.2f},{y + h:.2f} Z"
    )


def monogram():
    W, H = 640, 560

    # --- C -----------------------------------------------------------------
    c = crescent(cx=246, cy=272, rx=182, ry=206, a0=62, a1=298, t_max=54, t_min=5)

    # --- M -----------------------------------------------------------------
    y_top, y_base = 96, 470
    x_l, x_r = 214, 470
    x_v, y_v = 336, 396          # outer point of the central V

    m_parts = [
        bar(x_l, y_top, x_l, y_base, 13),                 # thin left stem
        bar(x_l + 2, y_top + 4, x_v - 6, y_v, 40),        # heavy left diagonal
        bar(x_v + 4, y_v - 6, x_r - 2, y_top + 4, 10),    # hairline right diagonal
        bar(x_r, y_top, x_r, y_base, 27),                 # heavy right stem
        serif(x_l, y_base - 10, 30, 11, 1.18),            # feet
        serif(x_r, y_base - 10, 34, 11, 1.14),
        serif(x_l, y_top, 26, 9, 0.78),                   # head serifs
        serif(x_r, y_top, 24, 9, 0.78),
    ]

    return W, H, c, m_parts


def build():
    W, H, c_path, m_parts = monogram()
    m = " ".join(m_parts)

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="Coco Ma monogram: an interlocking C and M in gold">
  <defs>
    <linearGradient id="cmGold" x1="0.06" y1="0" x2="0.94" y2="1">
      <stop offset="0%"   stop-color="#8A6522"/>
      <stop offset="14%"  stop-color="#D9B972"/>
      <stop offset="27%"  stop-color="#FAF0D2"/>
      <stop offset="39%"  stop-color="#C79B4C"/>
      <stop offset="53%"  stop-color="#F3DCA6"/>
      <stop offset="68%"  stop-color="#A87C31"/>
      <stop offset="82%"  stop-color="#E9CE90"/>
      <stop offset="100%" stop-color="#7E5A1E"/>
    </linearGradient>
    <linearGradient id="cmGoldAlt" x1="0.9" y1="0" x2="0.1" y2="1">
      <stop offset="0%"   stop-color="#B98F3E"/>
      <stop offset="18%"  stop-color="#FBF2D8"/>
      <stop offset="34%"  stop-color="#CDA45A"/>
      <stop offset="50%"  stop-color="#E7C989"/>
      <stop offset="72%"  stop-color="#966C28"/>
      <stop offset="100%" stop-color="#EAD199"/>
    </linearGradient>
    <filter id="cmShadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.55"/>
    </filter>
    <filter id="cmSheen" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="10"/>
    </filter>
  </defs>

  <g filter="url(#cmShadow)">
    <path d="{c_path}" fill="url(#cmGold)"/>
    <path d="{m}" fill="url(#cmGoldAlt)"/>
  </g>

  <!-- specular pass: a soft bright band raking across both letters -->
  <g clip-path="url(#cmClip)" opacity="0.35">
    <rect x="0" y="0" width="{W}" height="{H}" fill="none"/>
  </g>
  <clipPath id="cmClip">
    <path d="{c_path}"/>
    <path d="{m}"/>
  </clipPath>
  <g clip-path="url(#cmClip)">
    <ellipse cx="200" cy="150" rx="230" ry="120" fill="#FFF6DC" opacity="0.30" filter="url(#cmSheen)"/>
    <ellipse cx="470" cy="430" rx="180" ry="110" fill="#FFF0C8" opacity="0.20" filter="url(#cmSheen)"/>
    <ellipse cx="330" cy="300" rx="300" ry="46" fill="#3A2708" opacity="0.30" filter="url(#cmSheen)"/>
  </g>
</svg>'''


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    svg = build()
    with open(os.path.join(OUT, "monogram-cm.svg"), "w") as fh:
        fh.write(svg)
    print(f"  monogram-cm.svg  {len(svg) // 1024} kB")
