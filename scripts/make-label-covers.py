#!/usr/bin/env python3
"""Compose urban label sleeves with the real Chosenfew logo."""

from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "covers"
LOGO = ROOT / "public" / "chosenfew_logo_white.png"
BG_DIR = Path(
    "/Users/mauriceholda/.cursor/projects/Volumes-MPC-CODE-coding-chosenfewrecords/assets"
)

SIZE = 1200
ACCENT = (255, 106, 0)
CREAM = (245, 240, 230)
MUTED = (180, 175, 165)

FONT_BLACK = "/System/Library/Fonts/Supplemental/Arial Black.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REG = "/System/Library/Fonts/Supplemental/Arial.ttf"


def load_font(path: str, size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default()


def logo_rgba(max_w: int) -> Image.Image:
    """White mark on transparent — strip the black plate."""
    im = Image.open(LOGO).convert("RGBA")
    # downsample first for speed
    im.thumbnail((max_w * 2, max_w * 2), Image.Resampling.LANCZOS)
    bands = im.split()
    # luminance from RGB as alpha gate
    gray = ImageOps.grayscale(im)
    # threshold soft: blacks → 0, whites → opaque
    alpha = gray.point(lambda p: 0 if p < 28 else min(255, int((p - 28) * 1.15)))
    white = Image.new("RGB", im.size, (255, 255, 255))
    out = Image.merge("RGBA", (*white.split(), alpha))
    out.thumbnail((max_w, max_w), Image.Resampling.LANCZOS)
    return out


def fit_cover(path: Path) -> Image.Image:
    im = Image.open(path).convert("RGB")
    return ImageOps.fit(im, (SIZE, SIZE), method=Image.Resampling.LANCZOS)


def grade(im: Image.Image, tint: tuple[int, int, int], strength: float = 0.22) -> Image.Image:
    base = im.convert("RGBA")
    overlay = Image.new("RGBA", base.size, (*tint, int(255 * strength)))
    out = Image.alpha_composite(base, overlay)
    out = ImageEnhance.Contrast(out.convert("RGB")).enhance(1.12)
    out = ImageEnhance.Color(out).enhance(1.08)
    return out.convert("RGBA")


def vignette(im: Image.Image, strength: float = 0.55) -> Image.Image:
    w, h = im.size
    # white center → black edges, then used as alpha for black overlay
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse(
        [-w * 0.15, -h * 0.15, w * 1.15, h * 1.15],
        fill=int(255 * (1 - strength)),
    )
    # invert feel: darken edges by blurring a filled frame
    edge = Image.new("L", (w, h), int(255 * strength))
    hole = Image.new("L", (w, h), 0)
    hd = ImageDraw.Draw(hole)
    margin = int(min(w, h) * 0.18)
    hd.ellipse([margin, margin, w - margin, h - margin], fill=255)
    hole = hole.filter(ImageFilter.GaussianBlur(radius=SIZE // 6))
    # edge alpha = strength where hole is dark
    edge_alpha = Image.composite(
        Image.new("L", (w, h), 0),
        edge,
        hole,
    )
    dark = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    dark.putalpha(edge_alpha)
    return Image.alpha_composite(im.convert("RGBA"), dark)


def grain(im: Image.Image, amount: float = 0.08) -> Image.Image:
    rng = random.Random(42)
    noise = Image.new("L", im.size)
    npx = noise.load()
    w, h = im.size
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            v = rng.randint(0, 255)
            npx[x, y] = v
            if x + 1 < w:
                npx[x + 1, y] = v
            if y + 1 < h:
                npx[x, y + 1] = v
                if x + 1 < w:
                    npx[x + 1, y + 1] = v
    noise = noise.filter(ImageFilter.GaussianBlur(0.6))
    noise_rgba = Image.merge(
        "RGBA",
        (
            noise,
            noise,
            noise,
            Image.new("L", im.size, int(255 * amount)),
        ),
    )
    return Image.alpha_composite(im.convert("RGBA"), noise_rgba)


def text_block(
    draw: ImageDraw.ImageDraw,
    title: str,
    artist: str,
    year: str | None,
    meta: str,
) -> None:
    title_font = load_font(FONT_BLACK, 72 if len(title) < 18 else 56)
    artist_font = load_font(FONT_BOLD, 28)
    meta_font = load_font(FONT_REG, 20)

    # accent bar
    draw.rectangle([72, SIZE - 268, 72 + 72, SIZE - 262], fill=ACCENT)

    # title — wrap roughly
    y = SIZE - 248
    words = title.upper().split()
    lines: list[str] = []
    cur = ""
    for word in words:
        test = f"{cur} {word}".strip()
        if draw.textlength(test, font=title_font) > SIZE - 160 and cur:
            lines.append(cur)
            cur = word
        else:
            cur = test
    if cur:
        lines.append(cur)
    for line in lines[:3]:
        # subtle shadow
        draw.text((74, y + 2), line, font=title_font, fill=(0, 0, 0, 180))
        draw.text((72, y), line, font=title_font, fill=CREAM)
        y += int(title_font.size * 1.05)

    draw.text((72, y + 8), artist.upper(), font=artist_font, fill=ACCENT)
    footer = " · ".join(p for p in [year, meta, "CHOSENFEWRECORDS"] if p)
    draw.text((72, y + 44), footer.upper(), font=meta_font, fill=MUTED)


def compose(
    bg: Path,
    out_name: str,
    title: str,
    artist: str,
    year: str | None,
    meta: str,
    tint: tuple[int, int, int],
    logo_scale: float = 0.34,
) -> Path:
    base = fit_cover(bg)
    base = grade(base, tint, 0.2)
    base = vignette(base, 0.5)
    base = grain(base, 0.07)

    # bottom gradient for type legibility
    grad = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(grad)
    for i in range(SIZE // 2):
        a = int(210 * (i / (SIZE // 2)) ** 1.35)
        y = SIZE - 1 - i
        gdraw.line([(0, y), (SIZE, y)], fill=(8, 7, 6, a))
    base = Image.alpha_composite(base, grad)

    # thin frame
    frame = ImageDraw.Draw(base)
    frame.rectangle([18, 18, SIZE - 19, SIZE - 19], outline=(255, 255, 255, 38), width=2)
    frame.rectangle([26, 26, SIZE - 27, SIZE - 27], outline=(*ACCENT, 70), width=1)

    mark = logo_rgba(int(SIZE * logo_scale))
    # top-right stamp placement
    lx = SIZE - mark.width - 56
    ly = 52
    # soft glow plate behind logo
    plate = Image.new("RGBA", (mark.width + 40, mark.height + 40), (0, 0, 0, 0))
    pd = ImageDraw.Draw(plate)
    pd.rounded_rectangle(
        [0, 0, plate.width - 1, plate.height - 1],
        radius=8,
        fill=(0, 0, 0, 120),
        outline=(*ACCENT, 90),
        width=2,
    )
    base.paste(plate, (lx - 20, ly - 20), plate)
    base.paste(mark, (lx, ly), mark)

    # small top-left catalog mark
    tiny = load_font(FONT_BOLD, 18)
    td = ImageDraw.Draw(base)
    td.text((56, 56), "CFR", font=tiny, fill=ACCENT)

    text_block(td, title, artist, year, meta)

    out = OUT / out_name
    base.convert("RGB").save(out, "JPEG", quality=92, optimize=True)
    print(f"wrote {out.relative_to(ROOT)}")
    return out


COVERS = [
    {
        "bg": "bg-mardi-gras.png",
        "out": "mardi-gras.jpg",
        "title": "Mardi Gras",
        "artist": "Shortlord",
        "year": "2014",
        "meta": "CD Album",
        "tint": (48, 20, 90),
    },
    {
        "bg": "bg-city-night.png",
        "out": "move-2-da-beat.jpg",
        "title": "Move 2 da Beat",
        "artist": "Shortlord",
        "year": "2009",
        "meta": "Maxi",
        "tint": (30, 18, 10),
    },
    {
        "bg": "bg-roots-night.png",
        "out": "ways-of-mankind.jpg",
        "title": "Ways of Mankind",
        "artist": "Shortlord ft. Mounier",
        "year": "2008",
        "meta": "prod. Farhot",
        "tint": (10, 40, 28),
    },
    {
        "bg": "bg-city-night.png",
        "out": "wie-wir-leben.jpg",
        "title": "Wie wir Leben",
        "artist": "Capuz feat. Shortlord",
        "year": "2009",
        "meta": "Official Video",
        "tint": (20, 24, 48),
    },
    {
        "bg": "bg-concrete-gold.png",
        "out": "beep.jpg",
        "title": "Beep",
        "artist": "Seven 30",
        "year": "2005",
        "meta": "Da Real World",
        "tint": (40, 28, 12),
    },
    {
        "bg": "bg-concrete-gold.png",
        "out": "kauzzenmukke.jpg",
        "title": "Kauzzenmukke",
        "artist": "Capuz",
        "year": "2008",
        "meta": "Chosenfewrecords",
        "tint": (18, 36, 22),
    },
    {
        "bg": "bg-city-night.png",
        "out": "more-than-a-crew.jpg",
        "title": "More Than A Crew",
        "artist": "Men Of No Nation",
        "year": "2008",
        "meta": "Producer",
        "tint": (36, 16, 10),
    },
    {
        "bg": "bg-concrete-gold.png",
        "out": "wilder-westen.jpg",
        "title": "Wilder Westen",
        "artist": "Kader",
        "year": "2005",
        "meta": "Jentown Crhyme",
        "tint": (50, 32, 14),
    },
    {
        "bg": "bg-city-night.png",
        "out": "nettoblaster.jpg",
        "title": "Nettoblaster",
        "artist": "Capuz",
        "year": "2013",
        "meta": "Appearance",
        "tint": (12, 28, 40),
    },
    {
        "bg": "bg-roots-night.png",
        "out": "mysterious-mama.jpg",
        "title": "Mysterious Mama",
        "artist": "DJ Sting",
        "year": "2012",
        "meta": "One Luv",
        "tint": (40, 12, 28),
    },
    {
        "bg": "bg-city-night.png",
        "out": "black-rhapsody.jpg",
        "title": "The Black Rhapsody",
        "artist": "Nana",
        "year": "2004",
        "meta": "DA Records",
        "tint": (28, 10, 36),
    },
    {
        "bg": "bg-concrete-gold.png",
        "out": "nana-album.jpg",
        "title": "Nana",
        "artist": "Nana",
        "year": "1997",
        "meta": "Appearance",
        "tint": (24, 20, 16),
    },
    {
        "bg": "bg-concrete-gold.png",
        "out": "illixit-work-pt9.jpg",
        "title": "Illixit Work Pt.9",
        "artist": "DJ Illegal",
        "year": None,
        "meta": "Mixtape",
        "tint": (16, 16, 18),
    },
]


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    # copy plates into assets for project permanence
    plates = ROOT / "assets" / "cover-plates"
    plates.mkdir(parents=True, exist_ok=True)
    for c in COVERS:
        src = BG_DIR / c["bg"]
        if not src.exists():
            raise SystemExit(f"missing plate {src}")
        dest = plates / c["bg"]
        if not dest.exists():
            dest.write_bytes(src.read_bytes())
        compose(
            bg=src,
            out_name=c["out"],
            title=c["title"],
            artist=c["artist"],
            year=c["year"],
            meta=c["meta"],
            tint=c["tint"],
        )


if __name__ == "__main__":
    main()
