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
assert.equal(projectButtons.length, 3, "Each project needs a GitHub button");
assert(projectButtons[0][1].endsWith("/telco-customer-churn-analysis"));
assert(projectButtons.slice(1).every(match => match[1] === "https://github.com/revxx26"));
assert(!/Download (?:the )?portfolio deck/i.test(html));
assert(!html.includes("DATA / PORTFOLIO"));
for (const image of html.matchAll(/<img\b[^>]*>/g)) assert(/\balt="[^"]*"/.test(image[0]), "Image lacks alt text");
const pdf = fs.readFileSync(path.join(root, "documents/cv/CV_ATS_REVALDY_ARRAHMAN.pdf"));
assert.equal(pdf.subarray(0, 5).toString(), "%PDF-", "CV must be an actual PDF");
assert(fs.existsSync(path.join(root, "404.html")), "Missing exported 404 page");
console.log(`Export verified: ${assets} local asset references, all anchor targets, 3 GitHub links, CV, metadata assets and 404.`);
