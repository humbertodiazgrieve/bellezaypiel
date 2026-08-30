// Genera un SVG único por página, con variaciones por hash del slug.
// Uso: node generate-images.cjs
const fs = require('fs');
const path = require('path');

const root = __dirname;
const outBase = path.join(root, 'public', 'images');

const diarioYM = require(path.join(root, 'src/data/diario-yoga-masajes.json'));
const diarioEC = require(path.join(root, 'src/data/diario-ejercicios-cuidado.json'));
const diarioRP = require(path.join(root, 'src/data/diario-rutinas-problemas.json'));
const diarioG = require(path.join(root, 'src/data/diario-guias.json'));
const pilares = require(path.join(root, 'src/data/pilares.json'));

// Hash simple y determinista
function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

const palettes = [
  { bg: '#f5ead8', c1: '#c67139', c2: '#7a8a5e' },
  { bg: '#ebddc5', c1: '#7a8a5e', c2: '#c67139' },
  { bg: '#f0e6d2', c1: '#a05a2c', c2: '#8a9a6e' },
  { bg: '#f8f1e3', c1: '#b06a45', c2: '#6a7a4e' },
  { bg: '#ece0cc', c1: '#96621f', c2: '#7a8a5e' },
  { bg: '#f5ead8', c1: '#7a8a5e', c2: '#d08149' },
];

// Motivos decorativos distintos según el índice
function motif(h, c1, c2) {
  const kind = h % 6;
  switch (kind) {
    case 0: // círculos concéntricos
      return `<circle cx="400" cy="260" r="150" fill="none" stroke="${c1}" stroke-width="6" opacity="0.5"/>
<circle cx="400" cy="260" r="105" fill="none" stroke="${c2}" stroke-width="5" opacity="0.6"/>
<circle cx="400" cy="260" r="60" fill="${c1}" opacity="0.35"/>`;
    case 1: // ondas
      return `<path d="M 120 300 Q 250 200 400 300 T 680 300" fill="none" stroke="${c1}" stroke-width="7" opacity="0.5"/>
<path d="M 120 340 Q 250 240 400 340 T 680 340" fill="none" stroke="${c2}" stroke-width="6" opacity="0.55"/>
<path d="M 120 260 Q 250 160 400 260 T 680 260" fill="none" stroke="${c2}" stroke-width="4" opacity="0.4"/>`;
    case 2: // arco (amanecer)
      return `<path d="M 200 340 A 200 200 0 0 1 600 340" fill="${c1}" opacity="0.3"/>
<path d="M 260 340 A 140 140 0 0 1 540 340" fill="${c2}" opacity="0.35"/>
<line x1="120" y1="340" x2="680" y2="340" stroke="${c1}" stroke-width="5" opacity="0.5"/>`;
    case 3: // hoja/gota
      return `<path d="M 400 130 C 480 220 520 280 520 340 C 520 410 466 460 400 460 C 334 460 280 410 280 340 C 280 280 320 220 400 130 Z" fill="${c1}" opacity="0.32"/>
<path d="M 400 180 C 400 300 400 380 400 430" stroke="${c2}" stroke-width="5" opacity="0.6" fill="none"/>`;
    case 4: // lunas
      return `<path d="M 480 160 A 160 160 0 1 0 480 420 A 130 130 0 1 1 480 160 Z" fill="${c1}" opacity="0.32"/>
<circle cx="290" cy="350" r="36" fill="${c2}" opacity="0.4"/>`;
    default: // puntos en arco
      return `<circle cx="220" cy="340" r="42" fill="${c1}" opacity="0.35"/>
<circle cx="400" cy="270" r="58" fill="${c2}" opacity="0.35"/>
<circle cx="580" cy="340" r="42" fill="${c1}" opacity="0.35"/>`;
  }
}

function svgFor(title, slug, paletteIdx) {
  const h = hash(slug);
  const p = palettes[(paletteIdx + h) % palettes.length];
  const motifSvg = motif(h, p.c1, p.c2);
  const short = title.length > 34 ? title.slice(0, 34) + '…' : title;
  const esc = short.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 533">
<rect width="800" height="533" fill="${p.bg}"/>
<circle cx="700" cy="80" r="140" fill="${p.c2}" opacity="0.14"/>
<circle cx="60" cy="480" r="110" fill="${p.c1}" opacity="0.12"/>
${motifSvg}
<text x="400" y="500" font-family="Georgia, serif" font-size="30" fill="#5a4a3a" text-anchor="middle" opacity="0.85">${esc}</text>
</svg>
`;
}

let count = 0;

function write(dir, slug, title, paletteIdx) {
  const dirPath = path.join(outBase, ...dir);
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(path.join(dirPath, `${slug}.svg`), svgFor(title, slug, paletteIdx));
  count++;
}

const allDiario = [
  ...diarioYM.categorias,
  ...diarioEC.categorias,
  ...diarioRP.categorias,
  ...diarioG.categorias,
];

allDiario.forEach((cat, ci) => {
  cat.articulos.forEach((art) => {
    write(['diario', cat.slug], art.slug, art.titulo, ci);
  });
});

pilares.colecciones.forEach((col, ci) => {
  col.items.forEach((item) => {
    write([col.slug], item.slug, item.nombre, ci + 10);
  });
});

console.log(`Generadas ${count} imágenes SVG en public/images/`);
