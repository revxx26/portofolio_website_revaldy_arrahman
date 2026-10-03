# Sanity CMS — Revaldy portfolio

Project: `nbm85yy3`, dataset: `production`.
Website masih menggunakan static export (`out/`), termasuk di Render Static Site.
Sanity Studio adalah dashboard terpisah dengan login akun Sanity.
Dashboard: https://revaldy-portfolio-admin.sanity.studio/
Login pemilik project menggunakan **GitHub**.

## Mengelola konten

- **Profile & CV:** foto, PDF CV, kontak, headline, About, pendidikan.
- **Projects:** ringkasan, tools, kontribusi, GitHub, studi kasus, screenshot.
- **Experience:** organisasi, role, logo, periode, deskripsi, workflow.
- **Volunteer:** organisasi, role, bulan kegiatan, foto, deskripsi.
- **Certifications:** nama resmi, penerbit, tanggal, preview dan gambar asli.
- **Skills:** nama, logo, ikon pengganti.

Isi kolom English dan Bahasa Indonesia. Jika terjemahan kosong, English dipakai.
Nama resmi sertifikat dan angka hasil analisis harus sesuai bukti aslinya.
`Urutan tampil` mengatur posisi card; angka lebih kecil tampil lebih dulu.
`Sembunyikan dari website` menyimpan konten tetapi menghilangkannya dari halaman.
Klik **Publish** setelah mengedit, lalu refresh portfolio. Draft tidak tampil.
Gambar hanya diperbesar lewat ikon/button; card tetap memakai viewer di halaman.

## Pindah folder / komputer

```powershell
cd C:\website\portfolio
npm ci --include=dev
npm --prefix studio ci
npm run cms:login
```

Login memakai akun yang memiliki akses ke project `nbm85yy3`.
Data, aset, dan dashboard yang sudah terbit tetap berada di Sanity. Pindah
folder tidak memerlukan seed atau deploy ulang Studio. Untuk edit konten biasa,
cukup buka dashboard yang sudah terbit dan login GitHub.

## Setup dataset baru saja

`npm run cms:seed` hanya untuk inisialisasi dataset baru. Project saat ini sudah
diinisialisasi; jangan menjalankannya ketika memindahkan folder atau deploy Render.
Seed menggunakan `createIfNotExists`: dokumen yang sudah ada tidak ditimpa.
**Jangan menjalankan seed lagi setelah sengaja menghapus dokumen awal** karena
seed dapat membuat kembali ID awal yang telah dihapus. Gunakan untuk setup saja.
File di `public/` di-upload ke Sanity sebelum data awal dipublikasikan.

Studio lokal: `npm run cms:dev` (alamat localhost ditampilkan terminal).
Studio produksi diterbitkan lewat `cms:deploy`; perubahan konten sehari-hari
tidak memerlukan deploy Studio ataupun perubahan kode.

## Akses data dan CORS

Dataset `production` harus dapat dibaca publik untuk pembaruan di static site.
Konten published dan asset di dataset publik dapat diakses di luar website;
simpan hanya konten yang memang ingin dipublikasikan. Jangan upload dokumen rahasia.
Admin tetap memerlukan login, dan website tidak memiliki token tulis/read privat.

Tambahkan origin website secara tepat di Sanity → API → CORS origins:

```powershell
cd studio
npx sanity cors add https://revaldy-arrahman-data-portfolio.revaldyarrhmn.chatgpt.site --no-credentials
npx sanity cors add http://127.0.0.1:3000 --no-credentials
```

Untuk Render tambahkan origin `https://NAMA-SITE.onrender.com` yang benar setelah
URL-nya diketahui. Origin localhost preview juga perlu ditambahkan sesuai port.
Studio hosting mengatur origin autentikasinya melalui deploy Sanity.
Jangan mengaktifkan credentials untuk origin portfolio publik atau wildcard.

## Perilaku saat gagal

Website membaca published content dari Sanity CDN ketika dibuka. HTML statis
memakai snapshot terbaru saat build; rebuild memperbarui snapshot untuk crawler.
Saat dataset belum diinisialisasi atau permintaan gagal, konten bawaan tetap tampil.
Ketika CMS aktif, daftar kosong adalah daftar kosong: project yang dihapus atau
diarsipkan tidak diisi ulang dari data bawaan. Satu payload divalidasi sebelum
diterapkan; payload rusak mempertahankan snapshot sebelumnya.

Konfigurasi dapat diubah lewat `.env.local` berdasarkan `.env.example`.
ID project/dataset bukan kredensial. Token API tidak boleh memakai prefix
`NEXT_PUBLIC_` atau `SANITY_STUDIO_`, dan tidak boleh masuk Git.

Verifikasi: `npm run cms:test`, `npm run typecheck`, `npm run build`,
`npm run verify`, `npm --prefix studio run typecheck`, `npm run cms:build`.

Patch dependency alat admin pada 3 Oktober 2026 menggunakan overrides terbatas
di `studio/package.json`: adm-zip 0.6.1 dan undici 7.30.0 pada dts-plugin,
js-yaml 3.15.2 dan smol-toml 1.9.0 pada framework detection, serta uuid 11.1.1
pada typeid-js. Versi Sanity tetap 6.17.0. Simpan `studio/package-lock.json`
bersama manifest agar `npm --prefix studio ci` menggunakan versi teruji.
