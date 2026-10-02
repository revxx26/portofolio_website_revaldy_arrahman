const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const root = path.resolve("out");
const port = Number(process.env.PORT || 3001);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".txt": "text/plain", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".pdf": "application/pdf" };
http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
    const target = path.resolve(root, "." + pathname, pathname.endsWith("/") ? "index.html" : "");
    if (target !== root && !target.startsWith(root + path.sep)) {
      response.writeHead(403).end();
      return;
    }
    let data;
    try { data = await fs.readFile(target); }
    catch { response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" }).end(await fs.readFile(path.join(root, "404.html"))); return; }
    response.writeHead(200, { "Content-Type": types[path.extname(target)] || "application/octet-stream", "Cache-Control": "no-store" });
    response.end(request.method === "HEAD" ? undefined : data);
  } catch { response.writeHead(400).end(); }
}).listen(port, "127.0.0.1", () => console.log(`Production export preview: http://127.0.0.1:${port}`));
