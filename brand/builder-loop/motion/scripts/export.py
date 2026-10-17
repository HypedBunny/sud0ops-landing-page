"""Optional deterministic media rebuild; does not install any dependencies.
Requires Python Pillow + Playwright, a Chromium browser, and ffmpeg on PATH.
Run: python scripts/build-demo.py && python scripts/export.py
Override browser executable with the CHROMIUM_PATH environment variable.
"""
from pathlib import Path
import io, os, shutil, subprocess, tempfile
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'exports'


def main():
    ffmpeg = shutil.which('ffmpeg')
    if not ffmpeg:
        raise SystemExit('ffmpeg is required on PATH for MP4 export.')
    OUT.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='sud0ops-v3-') as work:
        work = Path(work)
        frames = []
        loop = []
        with sync_playwright() as p:
            executable = os.environ.get('CHROMIUM_PATH') or shutil.which('chromium') or p.chromium.executable_path
            browser = p.chromium.launch(headless=True, executable_path=executable)
            page = browser.new_page(viewport={'width': 720, 'height': 720}, device_scale_factor=1)
            page.set_content((ROOT / 'OPEN-MOTION.html').read_text())
            page.add_style_tag(content='html,body{margin:0;padding:0;background:#0F172A}main{margin:0;padding:0;max-width:none}main>*{display:none!important}main>.stage{display:block!important;border:0}.stage #art{width:720px;height:720px;}')
            for i in range(192):
                page.evaluate('(t)=>renderAt(t)', i / 30)
                png = page.screenshot()
                (work / f'{i:04d}.png').write_bytes(png)
                frames.append(Image.open(io.BytesIO(png)).convert('RGB').resize((540, 540), Image.Resampling.LANCZOS))
            for i in range(36):
                page.evaluate('(t)=>renderAt(t,{loading:true})', 4.4 + i * .04)
                loop.append(Image.open(io.BytesIO(page.screenshot())).convert('RGB').resize((480, 480), Image.Resampling.LANCZOS))
            browser.close()
        subprocess.run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-framerate', '30', '-i', str(work / '%04d.png'), '-frames:v', '192', '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-y', str(OUT / 'builder-loop-spiral-v3.mp4')], check=True)
        def palette_for(ims):
            sheet = Image.new('RGB', (128 * 8, 128 * 4))
            for j in range(32):
                im = ims[int(j * (len(ims) - 1) / 31)]
                sheet.paste(im.resize((128, 128)), ((j % 8) * 128, (j // 8) * 128))
            return sheet.quantize(colors=256)
        pal = palette_for(frames)
        quantized = [f.quantize(palette=pal, dither=Image.Dither.NONE) for f in frames]
        quantized[0].save(OUT / 'builder-loop-spiral-v3.gif', save_all=True, append_images=quantized[1:], duration=[30, 40, 30] * 64, disposal=1, optimize=False)
        frames[0].save(OUT / 'builder-loop-spiral-v3.webp', save_all=True, append_images=frames[1:], duration=[33, 34, 33] * 64, loop=1, quality=88, method=4)
        pal = palette_for(loop)
        q = [f.quantize(palette=pal, dither=Image.Dither.NONE) for f in loop]
        q[0].save(OUT / 'infinity-loading-v3.gif', save_all=True, append_images=q[1:], duration=40, loop=0, disposal=1, optimize=False)
    print('Rebuilt MP4, one-shot GIF/WebP, and repeating loading GIF.')


if __name__ == '__main__':
    main()
