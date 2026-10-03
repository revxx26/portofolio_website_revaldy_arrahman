const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

const attachments = "C:/Users/rvldy/AppData/Local/Temp";
const assets = [
  { file: "codex-clipboard-141e8023-2244-418e-83ee-685ca043c1ca.png", original: "public/documents/certificates/database-sql-kominfo-2024.png", preview: "public/images/certificates/database-sql-preview.webp", width: 1000 },
  { file: "codex-clipboard-c36ff854-5076-43d8-a20a-8be13c850f53.png", original: "public/documents/certificates/ms-office-lcc-2023.png", preview: "public/images/certificates/ms-office-preview.webp", width: 1000 },
  { file: "codex-clipboard-f313e2a6-06ae-4c85-b269-407229a21221.png", original: "public/images/volunteer/power-bi-smkn-22-original.png", preview: "public/images/volunteer/power-bi-smkn-22.webp", width: 1400 },
  { file: "codex-clipboard-fdc2cd78-61cd-46cc-aa62-d825c0bd39ad.png", original: "public/images/volunteer/excel-himpaudi-cempaka-putih-original.png", preview: "public/images/volunteer/excel-himpaudi-cempaka-putih.webp", width: 1400 },
];

(async () => {
  for (const asset of assets) {
    await fs.mkdir(path.dirname(asset.original), { recursive: true });
    await fs.mkdir(path.dirname(asset.preview), { recursive: true });
    await fs.copyFile(path.join(attachments, asset.file), asset.original);
    const meta = await sharp(asset.original).metadata();
    await sharp(asset.original).resize({ width: asset.width, withoutEnlargement: true }).webp({ quality: 90 }).toFile(asset.preview);
    console.log(`${asset.original}: ${meta.width}x${meta.height}; preview ${(await fs.stat(asset.preview)).size} bytes`);
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
