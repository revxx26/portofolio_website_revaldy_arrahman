import {defineType, defineField} from 'sanity';

const localized = (name: string, title: string, required = false) => defineField({
  name, title, type: 'localizedText', validation: rule => required ? rule.required() : rule,
});
const image = (name: string, title: string, required = false) => defineField({name, title, type: 'portfolioImage', validation: rule => required ? rule.required() : rule});
const text = (name: string, title: string, required = false) => defineField({name, title, type: 'string', validation: rule => required ? rule.required() : rule});
const link = (name: string, title: string) => defineField({name, title, type: 'url', validation: rule => rule.uri({scheme: ['https']})});
const list = (name: string, title: string, localizedItems = false) => defineField({name, title, type: 'array', of: [{type: localizedItems ? 'localizedText' : 'string'}], validation: rule => rule.unique()});
const month = (name: string, title: string, required = true) => defineField({name, title, type: 'string', description: 'YYYY-MM, misalnya 2025-05. Kosongkan akhir untuk pekerjaan yang masih berlangsung.', validation: rule => required ? rule.required().regex(/^\d{4}-(0[1-9]|1[0-2])$/) : rule.regex(/^\d{4}-(0[1-9]|1[0-2])$/)});
const gallery = () => defineField({name: 'gallery', title: 'Galeri gambar tambahan', type: 'array', of: [{type: 'projectFigure'}], validation: rule => rule.max(20), description: 'Gambar utama otomatis menjadi foto pertama. Tambahkan foto asli lain di sini; gunakan caption EN/ID.'});
const common = [
  defineField({name: 'order', title: 'Urutan tampil', type: 'number', initialValue: 10, validation: rule => rule.required().integer().min(0)}),
  defineField({name: 'archived', title: 'Sembunyikan dari website', type: 'boolean', initialValue: false, description: 'Publish setelah mengubah ini. Matikan untuk menampilkan lagi.'}),
];
const documentType = (name: string, title: string, fields: ReturnType<typeof defineField>[]) => defineType({
  name, title, type: 'document', fields: [...common, ...fields],
  orderings: [{title: 'Urutan website', name: 'websiteOrder', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title.en', name: 'name', archived: 'archived', media: 'image'}, prepare: ({title, name, archived, media}) => ({title: title || name || 'Untitled', subtitle: archived ? 'Disembunyikan' : 'Tampil setelah Publish', media})},
});

export const schemaTypes = [
  defineType({name: 'localizedText', title: 'English / Indonesia', type: 'object', fields: [
    defineField({name: 'en', title: 'English', type: 'text', rows: 3, validation: rule => rule.required()}),
    defineField({name: 'id', title: 'Bahasa Indonesia', type: 'text', rows: 3, description: 'Jika kosong, website memakai teks English.'}),
  ]}),
  defineType({name: 'portfolioImage', title: 'Gambar', type: 'image', options: {hotspot: true}, fields: [
    defineField({name: 'localUrl', title: 'Original website asset', type: 'string', hidden: true, readOnly: true}),
    defineField({name: 'width', type: 'number', hidden: true, readOnly: true}),
    defineField({name: 'height', type: 'number', hidden: true, readOnly: true}),
  ]}),
  defineType({name: 'portfolioFile', title: 'File', type: 'file', options: {accept: '.pdf'}, fields: [
    defineField({name: 'localUrl', type: 'string', hidden: true, readOnly: true}),
  ]}),
  defineType({name: 'projectFigure', title: 'Gambar pendukung', type: 'object', fields: [image('image', 'Gambar', true), localized('alt', 'Deskripsi gambar', true), localized('caption', 'Caption', true)], preview: {select: {title: 'caption.en', media: 'image'}}}),
  defineType({name: 'portfolioSettings', title: 'Profile & CV', type: 'document', fields: [
    defineField({name: 'initialized', title: 'CMS aktif', type: 'boolean', initialValue: true, hidden: true, readOnly: true}),
    text('name', 'Nama', true), defineField({name: 'email', title: 'Email', type: 'email', validation: rule => rule.required()}),
    link('linkedin', 'LinkedIn'), text('linkedinLabel', 'Nama LinkedIn'), link('github', 'GitHub'), text('githubLabel', 'Username GitHub'),
    image('photo', 'Foto profil'), defineField({name: 'cv', title: 'CV (PDF)', type: 'portfolioFile'}),
    localized('greeting', 'Sapaan'), localized('headline', 'Role / judul utama'), localized('intro', 'Perkenalan'), localized('opportunity', 'Peluang yang dicari'),
    localized('aboutTitle', 'Judul About'), localized('aboutIntro', 'About paragraf utama'), localized('aboutBody', 'About paragraf kedua'),
    text('university', 'Universitas'), image('universityLogo', 'Logo universitas'), localized('degree', 'Program studi'), text('gpa', 'IPK'), localized('semester', 'Semester'),
    localized('contactIntro', 'Perkenalan Contact'),
    defineField({name: 'analyticsId', title: 'Google Analytics Measurement ID', type: 'string', description: 'Opsional. Contoh G-XXXXXXXXXX, dari GA4 > Admin > Data streams > Web. Kosongkan untuk mematikan analytics. Statistik hanya terlihat di akun Google Analytics pemilik.', validation: rule => rule.regex(/^G-[A-Z0-9]{4,20}$/)}),
  ], preview: {select: {title: 'name'}}}),
  documentType('project', 'Projects', [
    localized('title', 'Nama project', true), localized('category', 'Kategori', true), localized('description', 'Ringkasan', true), localized('contribution', 'Kontribusi saya'),
    link('github', 'Link GitHub'), link('demo', 'Link live demo / dashboard (opsional)'), list('tools', 'Tools'), image('image', 'Gambar utama', true), localized('imageAlt', 'Deskripsi gambar', true), localized('figureLabel', 'Caption gambar'),
    localized('objective', 'Tujuan'), localized('source', 'Sumber data'), list('process', 'Langkah pengerjaan', true), localized('output', 'Hasil pengerjaan'), localized('insight', 'Temuan'), localized('limitation', 'Batasan hasil'),
    text('metric', 'Angka utama'), localized('metricLabel', 'Keterangan angka'),
    defineField({name: 'additionalImages', title: 'Gambar pendukung', type: 'array', of: [{type: 'projectFigure'}]}),
  ]),
  documentType('experience', 'Experience', [
    localized('title', 'Organisasi / perusahaan', true), localized('role', 'Role', true), localized('typeLabel', 'Jenis pengalaman'), image('logo', 'Logo'), localized('logoAlt', 'Deskripsi logo'),
    month('start', 'Mulai'), localized('startLabel', 'Tanggal mulai yang ditampilkan', true), month('end', 'Selesai', false), localized('endLabel', 'Tanggal selesai / Present', true),
    localized('description', 'Deskripsi', true), list('workflow', 'Tahapan workflow', true), localized('note', 'Catatan'),
  ]),
  documentType('volunteer', 'Volunteer', [
    localized('title', 'Nama kegiatan', true), localized('organization', 'Organisasi', true), localized('role', 'Role'), localized('context', 'Program / konteks'),
    month('date', 'Bulan kegiatan'), localized('dateLabel', 'Tanggal yang ditampilkan', true), localized('description', 'Deskripsi', true),
    image('image', 'Foto untuk card', true), image('original', 'Foto ukuran penuh (opsional)'), localized('imageAlt', 'Deskripsi foto', true), gallery(),
  ]),
  documentType('certification', 'Certifications', [
    localized('title', 'Nama resmi sertifikat', true), localized('issuer', 'Penerbit', true), localized('program', 'Program'), localized('type', 'Jenis sertifikat'),
    defineField({name: 'date', title: 'Tanggal', type: 'date', validation: rule => rule.required()}), localized('dateLabel', 'Tanggal yang ditampilkan', true), localized('dateType', 'Label tanggal (Issued / Test date)'),
    localized('description', 'Deskripsi'), image('image', 'Preview sertifikat', true), image('certificate', 'Sertifikat ukuran penuh (opsional)'), localized('imageAlt', 'Deskripsi sertifikat', true), gallery(),
  ]),
  documentType('skill', 'Skills', [
    text('name', 'Nama tool', true), image('logo', 'Logo'), defineField({name: 'icon', title: 'Ikon pengganti', type: 'string', options: {list: [{title: 'Database', value: 'database'}, {title: 'AI / Bot', value: 'bot'}]}, initialValue: 'database'}),
  ]),
];
