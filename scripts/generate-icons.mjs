import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const svgPath = resolve(root, 'public/app-icon.svg');
const outDir = resolve(root, 'public');

await mkdir(outDir, { recursive: true });
const svg = await readFile(svgPath);

async function render(size, name, { maskablePad = false } = {}) {
  if (maskablePad) {
    const inner = Math.round(size * 0.7);
    const offset = Math.round((size - inner) / 2);
    const art = await sharp(svg).resize(inner, inner).png().toBuffer();
    await sharp({
      create: { width: size, height: size, channels: 4, background: { r: 30, g: 58, b: 138, alpha: 1 } },
    })
      .composite([{ input: art, top: offset, left: offset }])
      .png()
      .toFile(resolve(outDir, name));
  } else {
    await sharp(svg).resize(size, size).png().toFile(resolve(outDir, name));
  }
  console.log(`generado ${name} (${size}x${size})`);
}

await render(180, 'apple-touch-icon.png');
await render(192, 'icon-192.png');
await render(512, 'icon-512.png');
await render(512, 'icon-maskable-512.png', { maskablePad: true });
