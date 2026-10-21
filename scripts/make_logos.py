"""Generate Alphapick SVG logos. Colors sampled from the brand JPGs with PIL:
gold #D4A251, charcoal #262A30 (wordmark #282C32)."""
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
import os
GOLD = "#D4A251"; CHAR = "#262A30"; WORD = "#282C32"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "brand")
os.makedirs(OUT, exist_ok=True)

BOWL = ("M40.5 21.5C27.3 21.5 16.5 34.7 16.5 51s10.8 29.5 24 29.5c11.2 0 18.6-9.6 23.2-21.5"
        "L66.6 46C62.4 31.8 53.6 21.5 40.5 21.5Z"
        "M41.6 25.4c7.4 0 13.2 10.2 15.6 21.4-2.6 15.2-8.2 29.8-15.6 29.8-7.6 0-13.4-11.4-13.4-25.6s5.8-25.6 13.4-25.6Z")
STROKE = ("M70.5 22.5H79.5L64.6 62C66.2 69.6 69 72.8 72.2 72.8c4.6 0 8.6-4.6 11-9.6l2.6 1.1"
          "C83.2 74 77.4 80.6 70.6 80.6c-7.4 0-11.6-5.6-13.2-12.6Z")
TICK = "M74 84.5 79.6 83.4 82.6 88.4 108 66.4 83 94Z"

def mark_group(dx=0, dy=0, square=True):
    s = f'<g transform="translate({dx} {dy})">'
    if square:
        s += f'<rect x="0" y="0" width="100" height="100" rx="21" fill="{CHAR}"/>'
    s += f'<path fill="{GOLD}" fill-rule="evenodd" d="{BOWL}"/>'
    s += f'<path fill="{GOLD}" d="{STROKE}"/><path fill="{GOLD}" d="{TICK}"/></g>'
    return s

# logo-mark.svg (icon only; tick overflows square to the right like the original)
mark = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 112 104" role="img" aria-label="Alphapick">'
        f'<title>Alphapick</title>{mark_group()}</svg>')
open(f"{OUT}/logo-mark.svg", "w").write(mark)

# favicon: tick kept inside the square for small sizes
fav_tick = "M62 80.5 67.6 79.4 70.6 84.4 92 64.5 71 90Z"
fav = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
       f'<rect width="100" height="100" rx="21" fill="{CHAR}"/>'
       f'<g transform="translate(-4 -4) scale(1.02)"><path fill="{GOLD}" fill-rule="evenodd" d="{BOWL}"/>'
       f'<path fill="{GOLD}" d="{STROKE}"/></g><path fill="{GOLD}" d="{fav_tick}"/></svg>')
open(f"{OUT}/favicon.svg", "w").write(fav)

# wordmark outlined from Cormorant Garamond (OFL) at wght 500
f = TTFont(os.path.join(os.path.dirname(__file__), "fonts", "CG.ttf"))
f = instantiateVariableFont(f, {"wght": 500})
cmap = f.getBestCmap(); gs = f.getGlyphSet(); upm = f["head"].unitsPerEm
def word_paths(text, size, x0, base, color):
    sc = size / upm; x = x0; out = []
    for ch in text:
        g = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        gs[g].draw(TransformPen(pen, (sc, 0, 0, -sc, x, base)))
        d = pen.getCommands()
        if d: out.append(d)
        x += gs[g].width * sc + size * 0.004
    return f'<path fill="{color}" d="{" ".join(out)}"/>', x

def svg_h(color_word, fname, square=True):
    wp, xend = word_paths("Alphapick", 74, 128, 69, color_word)
    w = round(xend + 4)
    s = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 {w+2} 104" role="img" aria-label="Alphapick">'
         f'<title>Alphapick</title>{mark_group()}{wp}</svg>')
    open(f"{OUT}/{fname}", "w").write(s); return w
print("horizontal width", svg_h(WORD, "logo-horizontal.svg"))
svg_h("#F4EFE6", "logo-horizontal-light.svg")  # for dark backgrounds
print("ok")
