const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { parse } = require("acorn");

// Safari 16.3 cannot parse class static blocks, even inside an unused module.
// Inspect the emitted framework/runtime chunks as well as our application code.
function assertCompatible(source, filename) {
  const nodes = [parse(source, { ecmaVersion: "latest", sourceType: "script" })];
  while (nodes.length) {
    const node = nodes.pop();
    assert(node.type !== "StaticBlock", `${filename}: class static block requires Safari 16.4+`);
    if (node.regex) {
      assert(!/\(\?<([=!])/.test(node.regex.pattern), `${filename}: regexp lookbehind requires Safari 16.4+`);
      assert(!node.regex.flags.includes("v"), `${filename}: regexp v flag is unsupported in Safari 16.3`);
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) {
        for (const child of value) if (child && typeof child.type === "string") nodes.push(child);
      } else if (value && typeof value.type === "string") nodes.push(value);
    }
  }
}

function verifyExport(root = path.resolve("out")) {
  let count = 0;
  function visit(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(filename);
      else if (entry.name.endsWith(".js")) {
        assertCompatible(fs.readFileSync(filename, "utf8"), path.relative(root, filename));
        count++;
      }
    }
  }
  visit(path.join(root, "_next", "static"));
  assert(count > 0, "Missing browser JavaScript bundles");
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) {
    if (match[1].trim()) assertCompatible(match[1], "index.html inline script");
  }
  console.log(`Browser compatibility verified: ${count} bundles and inline scripts contain no class static blocks or unsupported regexp literals (Safari 16.3).`);
}

if (require.main === module) verifyExport();
module.exports = { assertCompatible, verifyExport };
