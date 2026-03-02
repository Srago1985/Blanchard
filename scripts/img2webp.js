const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const IMG_DIR = "IMG";
const ALLOWED = ["jpg", "jpeg", "png"];

function processHtml(filePath) {
  let html = fs.readFileSync(filePath, "utf8");

  const regex = new RegExp(
    `<img\\s+([^>]*?)src=["'](${IMG_DIR}/[^"']+)\\.(${ALLOWED.join(
      "|"
    )})["']([^>]*)>`,
    "gi"
  );

  html = html.replace(regex, (match, before, src, ext, after) => {
    const webp = `${src}.webp`;

    return `
<picture>
  <source srcset="${webp}" type="image/webp">
  <img ${before}src="${src}.${ext}"${after}>
</picture>`;
  });

  fs.writeFileSync(filePath, html, "utf8");
}

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      // НЕ заходим в IMG, там нет HTML
      if (file !== IMG_DIR) walk(full);
    } else if (path.extname(full) === ".html") {
      processHtml(full);
    }
  }
}

walk(ROOT);
