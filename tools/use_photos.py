#!/usr/bin/env python3
"""
Switches the portrait and the three property cards between the generated
vector artwork and real photographs.

Drop the photographs into assets/img/photo/ using the filenames in that
directory's README, then:

    python3 tools/use_photos.py --on      # use the photographs
    python3 tools/use_photos.py --off     # use the vector artwork
    python3 tools/use_photos.py           # report which is in use

The hero keeps its vector scene either way: it sits behind a heavy mask and a
gradient wash, so it reads as atmosphere rather than as a photograph.
"""

import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGE = os.path.join(ROOT, "index.html")
PHOTO_DIR = os.path.join(ROOT, "assets", "img", "photo")
EXTS = (".png", ".jpg", ".jpeg", ".webp")

# stem -> (vector width, vector height)
SLOTS = {
    "portrait-coco-ma": (520, 720),
    "property-albert-park": (760, 500),
    "property-portsea": (760, 500),
    "property-canterbury": (760, 500),
}


def find_photo(stem):
    for ext in EXTS:
        path = os.path.join(PHOTO_DIR, stem + ext)
        if os.path.isfile(path):
            return f"assets/img/photo/{stem}{ext}"
    return None


def png_size(path):
    """Width and height from a PNG header; other formats keep the vector box."""
    with open(path, "rb") as fh:
        head = fh.read(24)
    if head[:8] == b"\x89PNG\r\n\x1a\n":
        return int.from_bytes(head[16:20], "big"), int.from_bytes(head[20:24], "big")
    return None


def swap(html, stem, new_src, size):
    """Repoint one <img> and keep its width/height honest."""
    pattern = re.compile(
        r'(<img\s+src=")(assets/img/(?:photo/)?' + re.escape(stem) + r'\.[a-z]+)(")'
        r'([^>]*?)\bwidth="\d+" height="\d+"'
    )

    def sub(m):
        return f'{m.group(1)}{new_src}{m.group(3)}{m.group(4)}width="{size[0]}" height="{size[1]}"'

    html, n = pattern.subn(sub, html)
    return html, n


def current(html):
    return "photo" if 'src="assets/img/photo/' in html else "vector"


def main():
    html = open(PAGE, encoding="utf-8").read()
    mode = sys.argv[1] if len(sys.argv) > 1 else None

    if mode not in ("--on", "--off"):
        print(f"index.html is using the {current(html)} imagery.")
        missing = [s for s in SLOTS if not find_photo(s)]
        if missing:
            print("Photographs not yet present for: " + ", ".join(sorted(missing)))
            print(f"Expected in {os.path.relpath(PHOTO_DIR, ROOT)}/ - see its README.")
        else:
            print("All four photographs are present; run with --on to use them.")
        return 0

    changed = 0
    for stem, vector_size in SLOTS.items():
        if mode == "--on":
            src = find_photo(stem)
            if not src:
                print(f"missing: assets/img/photo/{stem}.(png|jpg|webp)")
                return 1
            size = png_size(os.path.join(ROOT, src)) or vector_size
        else:
            src, size = f"assets/img/{stem}.svg", vector_size
        html, n = swap(html, stem, src, size)
        changed += n

    if changed != len(SLOTS):
        print(f"expected {len(SLOTS)} images to update, matched {changed} - index.html "
              "may have been edited by hand")
        return 1

    open(PAGE, "w", encoding="utf-8").write(html)
    print(f"index.html now uses the {current(html)} imagery "
          f"({changed} images). Rebuild with: python3 tools/build_single.py")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
