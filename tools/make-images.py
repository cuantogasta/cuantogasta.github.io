"""Genera los iconos y la imagen para redes sociales (solo hace falta ejecutarlo si cambia la marca).
Uso: python tools/make-images.py   (requiere Pillow)"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent / "src" / "assets"
TEAL, YELLOW, WHITE, DARK = (15, 118, 110), (253, 224, 71), (255, 255, 255), (11, 89, 82)
BOLT = [(18.5, 4), (8, 18), (15, 18), (13.5, 28), (24, 14), (17, 14)]  # en una caja de 32x32


def font(size, bold=True):
    for name in (["segoeuib.ttf", "arialbd.ttf", "DejaVuSans-Bold.ttf"] if bold else ["segoeui.ttf", "arial.ttf", "DejaVuSans.ttf"]):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def icon(size):
    s = 4  # supermuestreo para bordes suaves
    img = Image.new("RGBA", (size * s, size * s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    r = size * s
    d.rounded_rectangle([0, 0, r - 1, r - 1], radius=int(r * 0.22), fill=TEAL)
    d.polygon([(x / 32 * r, y / 32 * r) for x, y in BOLT], fill=YELLOW)
    return img.resize((size, size), Image.LANCZOS)


for size, name in [(192, "icon-192.png"), (512, "icon-512.png"), (180, "apple-touch-icon.png")]:
    im = icon(size)
    if name == "apple-touch-icon.png":  # iOS no usa transparencia
        bg = Image.new("RGB", im.size, TEAL)
        bg.paste(im, mask=im)
        im = bg
    im.save(OUT / name, optimize=True)
icon(64).save(OUT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

# Imagen Open Graph 1200x630
W, H = 1200, 630
og = Image.new("RGB", (W, H), TEAL)
d = ImageDraw.Draw(og)
# barras decorativas tipo gráfico de precios
import math
cols = [(34, 197, 94), (234, 179, 8), (220, 38, 38)]
bars = 24
for i in range(bars):
    v = 0.35 + 0.3 * math.sin(i / 3.2) + 0.25 * math.sin(i / 1.3 + 1)
    h = int(60 + v * 160)
    x0 = 80 + i * 44
    c = cols[0] if v < 0.3 else cols[2] if v > 0.6 else cols[1]
    d.rounded_rectangle([x0, H - 60 - h, x0 + 30, H - 60], radius=6, fill=c)
og.paste(icon(120), (80, 70), icon(120))
d.text((225, 78), "CuántoGasta", font=font(84), fill=WHITE)
d.text((82, 220), "Precio de la luz hoy por horas", font=font(54), fill=YELLOW)
d.text((82, 290), "y cuánto gasta cada aparato en euros", font=font(44, bold=False), fill=WHITE)
og.save(OUT / "og.png", optimize=True)
print("Imágenes generadas en", OUT)
