const sharp = require("sharp");
const fs = require("node:fs/promises");

async function optimizeImages() {
  const images = [
    ...["ubsi", "kementan", "palapa"].map(name => ({
      source: `public/images/organizations/${name}-transparent.png`,
      output: `public/images/organizations/${name}-128.webp`,
      width: 128,
      lossless: true,
    })),
    {
      source: "public/images/profile/revaldy-arrahman-transparent.png",
      output: "public/images/profile/revaldy-arrahman-760.webp",
      width: 760,
      lossless: false,
    },
  ];
  for (const image of images) {
    await sharp(image.source).resize({ width: image.width, withoutEnlargement: true })
      .webp({ lossless: image.lossless, quality: 90, alphaQuality: 100 }).toFile(image.output);
    const original = (await fs.stat(image.source)).size;
    const optimized = (await fs.stat(image.output)).size;
    console.log(`${image.output}: ${original} -> ${optimized} bytes`);
  }
}

optimizeImages().catch(error => { console.error(error); process.exitCode = 1; });
