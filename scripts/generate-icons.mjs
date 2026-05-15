import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, 'public/logo.webp');
const outDir = resolve(root, 'public');

await mkdir(outDir, { recursive: true });

const bg = { r: 255, g: 255, b: 255, alpha: 1 };

async function render(size, name, { padded = false, maskable = false } = {}) {
  const inner = maskable ? Math.round(size * 0.6) : (padded ? Math.round(size * 0.78) : size);
  const logo = await sharp(src)
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const offset = Math.round((size - inner) / 2);
  await sharp({
    create: { width: size, height: size, channels: 4, background: bg },
  })
    .composite([{ input: logo, top: offset, left: offset }])
    .png()
    .toFile(resolve(outDir, name));

  console.log(`generado ${name} (${size}x${size})`);
}

await render(180, 'apple-touch-icon.png', { padded: true });
await render(192, 'icon-192.png', { padded: true });
await render(512, 'icon-512.png', { padded: true });
await render(512, 'icon-maskable-512.png', { maskable: true });
