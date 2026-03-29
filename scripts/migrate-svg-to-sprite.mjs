import fs from 'node:fs';
import path from 'node:path';

const root = 'd:/Frontend/Blanchard';
const indexPath = path.join(root, 'index.html');
const spritePath = path.join(root, 'IMG', 'sprite.svg');

let html = fs.readFileSync(indexPath, 'utf8');
const svgRegex = /<svg\b[^>]*>[\s\S]*?<\/svg>/g;
const blocks = [...html.matchAll(svgRegex)].map((m) => m[0]);

const symbolMap = new Map();
const symbols = [];
let symbolCounter = 1;

function normalizeSpace(str) {
  return str.replace(/\s+/g, ' ').trim();
}

function parseTagAttrs(tag) {
  const attrs = {};
  const attrRegex = /(\w[\w:-]*)\s*=\s*"([^"]*)"/g;
  for (const m of tag.matchAll(attrRegex)) {
    attrs[m[1]] = m[2];
  }
  return attrs;
}

function stripSvgXmlns(openingTag) {
  return openingTag
    .replace(/\s+xmlns="[^"]*"/g, '')
    .replace(/\s{2,}/g, ' ');
}

function extractChildren(svgInner) {
  const childRegex = /<(path|rect|circle|ellipse|line|polyline|polygon)\b[^>]*\/?>(?:<\/(?:path|rect|circle|ellipse|line|polyline|polygon)>)?/g;
  return [...svgInner.matchAll(childRegex)].map((m) => m[0]);
}

function getGeometryMarkup(childTag) {
  let tag = childTag;
  tag = tag.replace(/\sfill="[^"]*"/g, '');
  tag = tag.replace(/\sstroke="[^"]*"/g, '');
  tag = tag.replace(/\s{2,}/g, ' ');
  return tag;
}

function getFillStrokeAttrs(childTag) {
  const attrs = [];
  const fill = childTag.match(/\sfill="([^"]*)"/);
  const stroke = childTag.match(/\sstroke="([^"]*)"/);
  if (fill) attrs.push(`fill="${fill[1]}"`);
  if (stroke) attrs.push(`stroke="${stroke[1]}"`);
  return attrs.join(' ');
}

for (const block of blocks) {
  const openMatch = block.match(/^<svg\b[^>]*>/);
  if (!openMatch) continue;

  const openingTag = openMatch[0];
  const inner = block.slice(openingTag.length, -6);
  const children = extractChildren(inner);

  if (children.length === 0) {
    continue;
  }

  const useTags = children.map((child) => {
    const geom = normalizeSpace(getGeometryMarkup(child));
    let symbolId = symbolMap.get(geom);

    if (!symbolId) {
      symbolId = `icon-part-${symbolCounter++}`;
      symbolMap.set(geom, symbolId);
      symbols.push({ id: symbolId, geom });
    }

    const colorAttrs = getFillStrokeAttrs(child);
    return colorAttrs
      ? `<use href="IMG/sprite.svg#${symbolId}" ${colorAttrs}></use>`
      : `<use href="IMG/sprite.svg#${symbolId}"></use>`;
  });

  const cleanedOpening = stripSvgXmlns(openingTag);
  const replacement = `${cleanedOpening}${useTags.join('')}</svg>`;
  html = html.replace(block, replacement);
}

const spriteBody = symbols
  .map(({ id, geom }) => `  <symbol id="${id}" overflow="visible">${geom}</symbol>`)
  .join('\n');

const spriteContent = `<svg xmlns="http://www.w3.org/2000/svg">\n${spriteBody}\n</svg>\n`;

fs.writeFileSync(indexPath, html, 'utf8');
fs.writeFileSync(spritePath, spriteContent, 'utf8');

console.log(`Converted ${blocks.length} inline SVG blocks.`);
console.log(`Created ${symbols.length} unique symbol parts in IMG/sprite.svg.`);
