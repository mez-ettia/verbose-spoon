#!/usr/bin/env python3
"""
Bundles the site into one portable HTML file at dist/coco-ma.html.

Stylesheets and scripts are inlined, fonts and SVG artwork become data URIs.
The result has zero external references, which is what lets it be dropped into
an email, a static host or a sandboxed viewer and still render identically.

    python3 tools/build_single.py [--fragment]

--fragment omits <!doctype>/<html>/<head>/<body> and emits only the page
content, for hosts that supply their own document skeleton.
"""

import base64
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def read(rel):
    with open(os.path.join(ROOT, rel), "r", encoding="utf-8") as fh:
        return fh.read()


def data_uri(rel, mime):
    with open(os.path.join(ROOT, rel), "rb") as fh:
        return f"data:{mime};base64," + base64.b64encode(fh.read()).decode("ascii")


def build(fragment=False):
    html = read("index.html")

    # --- fonts: fold the woff2 files into the @font-face rules --------------
    fonts = read("assets/css/fonts.css")
    for name in sorted(os.listdir(os.path.join(ROOT, "assets/fonts"))):
        fonts = fonts.replace(
            f"'../fonts/{name}'",
            f"'{data_uri('assets/fonts/' + name, 'font/woff2')}'",
        )

    styles = read("assets/css/styles.css")
    script = read("assets/js/main.js")

    # --- images: every <img src="assets/img/*.svg"> becomes a data URI ------
    def swap(match):
        rel = match.group(1)
        return 'src="' + data_uri(rel, "image/svg+xml") + '"'

    html = re.sub(r'src="(assets/img/[^"]+\.svg)"', swap, html)
    html = re.sub(r'href="(assets/img/[^"]+\.svg)"', lambda m: 'href="' + data_uri(m.group(1), "image/svg+xml") + '"', html)
    html = re.sub(r'content="assets/img/[^"]+\.svg"', 'content=""', html)

    # --- drop the external <link>/<script> tags, inline their contents ------
    html = re.sub(r'\n?<link rel="preload"[^>]*>', "", html)
    html = re.sub(r'\n?<link rel="stylesheet"[^>]*>', "", html, count=1)
    html = html.replace(
        '<link rel="stylesheet" href="assets/css/styles.css">',
        f"<style>\n{fonts}\n{styles}\n</style>",
    )
    html = html.replace(
        '<script src="assets/js/main.js" defer></script>',
        f"<script>\n{script}\n</script>",
    )

    if fragment:
        head = re.search(r"<head>(.*?)</head>", html, re.S).group(1)
        body = re.search(r"<body[^>]*>(.*?)</body>", html, re.S).group(1)
        keep = "\n".join(
            line for line in head.splitlines()
            if line.strip().startswith(("<title", "<style", "</style"))
            or (line.strip() and not line.strip().startswith(("<meta", "<link")))
        )
        # Everything between <style> and </style> must survive intact.
        style = re.search(r"<style>.*?</style>", head, re.S).group(0)
        title = re.search(r"<title>.*?</title>", head, re.S).group(0)
        html = f"{title}\n{style}\n<div id=\"top\">{body}</div>"

    return html


if __name__ == "__main__":
    frag = "--fragment" in sys.argv
    out = os.path.join(ROOT, "dist", "coco-ma-fragment.html" if frag else "coco-ma.html")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    doc = build(frag)
    with open(out, "w", encoding="utf-8") as fh:
        fh.write(doc)
    print(f"  {os.path.relpath(out, ROOT):32s} {len(doc.encode()) // 1024:>5d} kB")
