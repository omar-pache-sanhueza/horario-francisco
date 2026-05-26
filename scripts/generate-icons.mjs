import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const srcPath = resolve(root, 'public/logo.png');
const outDir = resolve(root, 'public');

await mkdir(outDir, { recursive: true });

const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

// Recorta el espacio en blanco alrededor del escudo para centrarlo bien.
const trimmed = await sharp(srcPath).trim().png().toBuffer();

async function render(size, name, { pad = 0.86 } = {}) {
  const inner = Math.round(size * pad);
  const art = await sharp(trimmed)
    .resize(inner, inner, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();
  const offset = Math.round((size - inner) / 2);
  await sharp({ create: { width: size, height: size, channels: 4, background: WHITE } })
    .composite([{ input: art, top: offset, left: offset }])
    .png()
    .toFile(resolve(outDir, name));
  console.log(`generado ${name} (${size}x${size})`);
}

await render(180, 'apple-touch-icon.png');
await render(192, 'icon-192.png');
await render(512, 'icon-512.png');
await render(512, 'icon-maskable-512.png', { pad: 0.62 });
