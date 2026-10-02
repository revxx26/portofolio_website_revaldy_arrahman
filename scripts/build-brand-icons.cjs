const fs = require("node:fs/promises");
const sharp = require("sharp");

async function buildIcons() {
  const source = "public/images/brand/revaldy-character-head-source.png";
  const outputs = [
    [256, "public/images/brand/revaldy-character-head.png"],
    [32, "public/favicon-32.png"],
    [64, "public/favicon-64.png"],
    [180, "public/apple-touch-icon.png"],
  ];
  for (const [size, path] of outputs) {
    await sharp(source).resize(size, size, { kernel: "nearest" }).png({ compressionLevel: 9 }).toFile(path);
  }

  // ICO supports embedded PNG images, with 32px and 64px entries.
  const sizes = [32, 64];
  const images = await Promise.all(sizes.map(size => fs.readFile(`public/favicon-${size}.png`)));
  const directory = Buffer.alloc(6 + images.length * 16);
  directory.writeUInt16LE(1, 2);
  directory.writeUInt16LE(images.length, 4);
  let offset = directory.length;
  images.forEach((image, index) => {
    const entry = 6 + index * 16;
    directory[entry] = sizes[index];
    directory[entry + 1] = sizes[index];
    directory.writeUInt16LE(1, entry + 4);
    directory.writeUInt16LE(32, entry + 6);
    directory.writeUInt32LE(image.length, entry + 8);
    directory.writeUInt32LE(offset, entry + 12);
    offset += image.length;
  });
  await fs.writeFile("public/favicon.ico", Buffer.concat([directory, ...images]));
}

buildIcons().catch(error => { console.error(error); process.exitCode = 1; });
