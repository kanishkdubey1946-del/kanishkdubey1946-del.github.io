import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const source = await readFile(`${publicDir}favicon.svg`);
for (const [name, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await sharp(source, { density: 600 }).resize(size, size).png().toFile(`${publicDir}${name}`);
}
// PNG-backed ICO entries retain crisp alpha at each browser size.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(size => sharp(source, { density: 600 }).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((image, index) => {
  const position = 6 + index * 16;
  header[position] = sizes[index];
  header[position + 1] = sizes[index];
  header.writeUInt16LE(1, position + 4);
  header.writeUInt16LE(32, position + 6);
  header.writeUInt32LE(image.length, position + 8);
  header.writeUInt32LE(offset, position + 12);
  offset += image.length;
});
await writeFile(`${publicDir}favicon.ico`, Buffer.concat([header, ...images]));
// The repository root is the GitHub Pages document root.
await writeFile(new URL('../favicon.ico', import.meta.url), Buffer.concat([header, ...images]));
console.log('Built SVG, PNG, ICO, and touch-icon identity assets.');
