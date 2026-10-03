# Salin ke C:\website\portfolio

Salin **isi folder `portfolio/`**, bukan folder induk `web/` atau hanya `out/`.
File `package.json` harus berada di `C:\website\portfolio\package.json`.

## File yang ikut

- `app/`, `components/`, `content/`, `lib/`, `public/`, `scripts/`, `docs/`, `studio/`.
- File konfigurasi dan kedua `package-lock.json` (website dan Studio).
- `.node-version`, `.gitignore`, `.env.example`. Pastikan file tersembunyi ikut.

Tidak perlu menyalin `node_modules/`, `studio/node_modules/`, `.next/`, `out/`,
`studio/dist/`, `studio/.sanity/`, `.sites-runtime/`, `qa/`, `tmp/`,
`source-material/`, `*.tsbuildinfo`, dan `*.tar.gz`.
Build tidak memerlukan attachment Temp atau dokumen sumber di luar folder ini.
Script pengolahan gambar awal yang masih merujuk attachment lama tidak dipakai build.

Untuk repo GitHub terpisah, **jangan salin `.git` dari source Sites**. Copy source
ke clone repo GitHub milikmu, mempertahankan `.git` milik clone tersebut.
Sebelum push, periksa `git remote -v` mengarah ke
`github.com/revxx26/portofolio-website-revaldy-arrahman`.

`.env.local` yang kamu atur sendiri boleh dipindah secara lokal; jangan upload
ke GitHub. `.env.example` hanya contoh dan tidak otomatis dibaca Next.js.
Setelan environment Render diisi di dashboard Render, bukan mengandalkan file lokal.

## Cek salinan lokal

Gunakan Node sesuai `.node-version` (24.15.0 saat audit), lalu PowerShell:

```powershell
cd C:\website\portfolio
npm ci --include=dev
npm run cms:test
node scripts/test-analytics.cjs
npm run build
npm run verify
npm run preview
```

Buka `http://127.0.0.1:3001`. Jangan buka `out/index.html` melalui `file://`:
aset website menggunakan URL relatif terhadap origin. Hentikan preview dengan Ctrl+C.

## Sanity tetap terhubung

Data, gambar, CV dan dashboard tetap berada di project `nbm85yy3`, dataset
`production`. Memindahkan folder tidak memerlukan migrasi data atau seed.
**Jangan jalankan `cms:seed`** untuk pindah folder/deploy: seed dapat membuat
kembali dokumen awal yang sengaja dihapus.

Untuk edit konten, langsung buka [dashboard Sanity](https://revaldy-portfolio-admin.sanity.studio/),
login GitHub, edit, Publish, lalu refresh portfolio.
Untuk mengembangkan Studio lokal saja, instal terpisah:

```powershell
npm --prefix studio ci
npm --prefix studio run typecheck
npm run cms:dev
```

## Deploy Render

Upload source terbaru ke GitHub. Render membaca repo, bukan folder Windows.
Pilih Static Site, Publish Directory `out`, Build Command
`npm ci --include=dev && npm run build && npm run verify`.
Ikuti [setting environment, URL publik, dan CORS Sanity](render-deployment.md).

Salinan bersih diuji di folder QA lain tanpa cache/dependency lama pada
3 Oktober 2026. Lokasi `C:\website\portfolio` sendiri belum dibuat atau diuji;
panduan ini untuk salinan yang akan kamu lakukan nanti.
