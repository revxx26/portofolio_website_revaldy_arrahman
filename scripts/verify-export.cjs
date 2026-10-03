const fs = require("node:fs");

const path = require("node:path");

const assert = require("node:assert/strict");



const root = path.resolve("out");

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);

assert.equal(new Set(ids).size, ids.length, "Duplicate element IDs");

assert.equal((html.match(/<h1\b/g) || []).length, 1, "Expected one main heading");

const attributes = [...html.matchAll(/\b(?:src|href)="([^"]+)"/g)].map(match => match[1].replaceAll("&amp;", "&"));

let assets = 0;

for (const value of attributes) {

  if (value.startsWith("#")) {

    assert(ids.includes(value.slice(1)), `Missing anchor target: ${value}`);

  } else if (value.startsWith("/") && !value.startsWith("//")) {

    const filename = decodeURIComponent(value.split(/[?#]/)[0]);

    const target = path.join(root, filename.endsWith("/") ? filename + "index.html" : filename);

    assert(fs.existsSync(target), `Missing exported asset: ${value}`);

    assets++;

  }

}

const projectButtons = [...html.matchAll(/<a class="button project-github"[^>]*href="([^"]+)"/g)];

// CMS collections and optional links can change without changing this verifier.

assert(projectButtons.every(match => new URL(match[1]).protocol === "https:"), "Project links must use HTTPS");

assert(!/Download (?:the )?portfolio deck/i.test(html));

assert(!html.includes("DATA / PORTFOLIO"));

assert(!html.includes("Copy email"), "Copy email button must remain removed");

assert(html.includes('aria-label="English"') && html.includes('aria-label="Bahasa Indonesia"'), "Language controls missing");

assert(html.includes('class="theme-toggle"'), "Theme control missing");

for (const image of html.matchAll(/<img\b[^>]*>/g)) assert(/\balt="[^"]*"/.test(image[0]), "Image lacks alt text");

const pdf = fs.readFileSync(path.join(root, "documents/cv/CV_ATS_REVALDY_ARRAHMAN.pdf"));

assert.equal(pdf.subarray(0, 5).toString(), "%PDF-", "CV must be an actual PDF");

assert(fs.existsSync(path.join(root, "404.html")), "Missing exported 404 page");

const sectionOrder = ["home", "about", "projects", "experience", "volunteer", "certifications", "skills", "contact"];

let previousSection = -1;

for (const id of sectionOrder) {

  const position = html.indexOf(`<section id="${id}"`);

  assert(position > previousSection, `Missing or out-of-order section: ${id}`);

  previousSection = position;

}







assert(ids.includes("image-preview-dialog"), "Image viewer dialog missing");


assert(!/<a\b[^>]*href="\/(?:images\/(?:projects|volunteer)|documents\/certificates)\//.test(html), "Images must open through preview buttons, not image links");

for (const asset of ["images/projects/customer-churn-dashboard.jpg", "images/projects/mbg-confusion-matrix.png", "images/projects/mbg-word-clouds.png", "images/projects/east-java-regional-analysis.png", "images/projects/east-java-evaluation.png", "images/volunteer/power-bi-smkn-22-original.png", "images/volunteer/excel-himpaudi-cempaka-putih-original.png", "documents/certificates/database-sql-kominfo-2024.png", "documents/certificates/ms-office-lcc-2023.png"]) {

  assert(fs.existsSync(path.join(root, asset)), `Missing original viewer image: ${asset}`);

}


assert(!/<iframe/.test(html),'Tableau must not load until requested');

assert(html.includes('property="og:image"') && html.includes('name="twitter:card" content="summary_large_image"'),'Social metadata missing');

const social=fs.readFileSync(path.join(root,'images/social/portfolio-preview.png'));

assert.equal(social.readUInt32BE(16),1200);assert.equal(social.readUInt32BE(20),630);



console.log(`Export verified: ${assets} local asset references, all anchor targets, ${projectButtons.length} GitHub links, CV, metadata assets and 404.`);

