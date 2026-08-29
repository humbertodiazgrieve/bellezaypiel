const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, 'src', 'pages');

const structure = {
  "yoga-facial": [
    "que-es-yoga-facial", "beneficios-yoga-facial", "yoga-facial-para-principiantes",
    "yoga-facial-antes-y-despues", "errores-comunes-yoga-facial", "contraindicaciones-yoga-facial",
  ],
  "ejercicios-faciales": [
    "papada", "ojeras", "frente", "patas-de-gallo", "mejillas",
    "pomulos", "mandibula", "cuello", "labios",
  ],
  "rutinas": [
    "rutina-yoga-facial-manana", "rutina-yoga-facial-noche",
    "rutina-yoga-facial-5-minutos", "rutina-yoga-facial-10-minutos",
    "rutina-para-principiantes", "rutina-para-papada",
    "rutina-antiarrugas", "rutina-con-gua-sha",
    "rutina-con-rodillo-facial", "rutina-skincare-y-yoga-facial",
  ],
  "masajes-faciales": [
    "masaje-facial-drenante", "masaje-lifting-facial",
    "masaje-kobido", "masaje-para-bruxismo",
    "masaje-para-ojeras", "masaje-para-papada", "masaje-facial-con-aceite",
  ],
  "herramientas": [
    "gua-sha", "rodillo-facial", "ice-roller",
    "ventosas-faciales", "microcorrientes-faciales", "face-taping",
  ],
  "cuidado-facial": [
    "tipos-de-piel", "piel-seca", "piel-grasa", "piel-mixta",
    "piel-sensible", "piel-madura", "barrera-cutanea",
    "rutina-facial-basica", "rutina-facial-de-dia", "rutina-facial-de-noche",
  ],
  "ingredientes": [
    "retinol", "retinal", "vitamina-a", "vitamina-c", "acido-hialuronico",
    "niacinamida", "peptidos", "ceramidas", "acido-glicolico",
    "acido-lactico", "acido-salicilico", "bakuchiol", "colageno",
    "elastina", "coenzima-q10", "centella-asiatica", "aloe-vera",
    "cafeina", "escualano", "glicerina", "aceites-faciales", "protector-solar",
  ],
  "productos": [
    "limpiadores-faciales", "tonicos-faciales", "esencias-faciales",
    "serums-faciales", "cremas-hidratantes", "cremas-antiedad",
    "cremas-reafirmantes", "contorno-de-ojos", "aceites-para-masaje-facial",
    "mascarillas-faciales", "exfoliantes-faciales", "protectores-solares-faciales",
    "productos-para-piel-madura", "productos-para-flacidez-facial",
    "productos-para-arrugas", "productos-para-ojeras",
    "productos-para-rostro-hinchado", "productos-para-usar-con-gua-sha",
  ],
  "problemas-faciales": [
    "flacidez-facial", "arrugas", "lineas-de-expresion",
    "inflamacion-facial", "rostro-hinchado", "papada", "ojeras",
    "bolsas-en-los-ojos", "patas-de-gallo", "piel-opaca",
    "manchas-faciales", "poros-dilatados", "piel-deshidratada", "tension-mandibular",
  ],
  "guias": [
    "yoga-facial-vs-gua-sha", "gua-sha-vs-rodillo-facial",
    "yoga-facial-vs-botox", "retinol-vs-bakuchiol",
    "vitamina-c-vs-niacinamida", "acido-hialuronico-vs-colageno",
    "serum-vs-crema", "crema-hidratante-vs-crema-antiedad",
    "lifting-facial-casero", "como-rejuvenecer-el-rostro-naturalmente",
    "mejores-productos-para-yoga-facial", "mejores-ingredientes-para-flacidez-facial",
    "mejores-ingredientes-para-arrugas", "que-usar-antes-y-despues-del-yoga-facial",
  ],
};

const SECTION_LABELS = {
  "yoga-facial": "Yoga facial",
  "ejercicios-faciales": "Ejercicios faciales",
  "rutinas": "Rutinas",
  "masajes-faciales": "Masajes faciales",
  "herramientas": "Herramientas",
  "cuidado-facial": "Cuidado facial",
  "ingredientes": "Ingredientes",
  "productos": "Productos",
  "problemas-faciales": "Problemas faciales",
  "guias": "Guías",
};

function titleFromSlug(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function makeTemplate(title, section, sectionLabel) {
  return `---
import Layout from '../../layouts/Layout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
---

<Layout title="${title} — Bellezaypiel">
  <div style="background:var(--color-bg);min-height:100vh;">
    <Header />
    
    <div style="position:relative;padding:52px 56px 0;overflow:hidden;max-width:1280px;margin:0 auto;">
      <div style="position:absolute;right:-90px;top:-120px;width:300px;height:300px;border-radius:50%;background:var(--color-accent-100);opacity:.6;"></div>
      <div style="position:relative;display:flex;gap:8px;font-size:13.5px;color:var(--color-neutral-700);margin-bottom:20px;">
        <a href="/" style="color:var(--color-neutral-700);">Inicio</a><span>/</span><a href="/${section}/" style="color:var(--color-neutral-700);">${sectionLabel}</a><span>/</span><span style="font-weight:600;color:var(--color-text);">${title}</span>
      </div>
      <h1 style="position:relative;font-family:var(--font-heading);font-size:52px;line-height:1.08;letter-spacing:-.028em;margin:0;max-width:24ch;">${title}</h1>
      <p style="position:relative;font-size:17px;line-height:1.7;color:#3a3733;margin:22px 0 0;max-width:58ch;">
        Contenido en desarrollo para <strong>${title}</strong>. Pronto encontrarás aquí información basada en evidencia, revisada por profesionales.
      </p>
    </div>
    
    <div style="padding:60px 56px 0;max-width:1280px;margin:0 auto;">
      <div style="background:var(--color-neutral-100);border-radius:28px;padding:40px;max-width:64ch;">
        <h2 style="font-family:var(--font-heading);font-size:25px;margin:0 0 16px;">Estamos trabajando en esta página</h2>
        <p style="font-size:16px;line-height:1.7;color:#3a3733;margin:0 0 20px;">
          Bellezaypiel publica contenido revisado con calma. Cada ficha, rutina o guía pasa por un proceso de revisión de estudios antes de llegar aquí.
        </p>
        <p style="font-size:16px;line-height:1.7;color:#3a3733;margin:0 0 20px;">
          Mientras tanto, puedes explorar:
        </p>
        <ul style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:10px;font-size:15px;color:#3a3733;">
          <li><a href="/ingredientes/" style="font-weight:600;">Fichas de ingrediente</a> — 31 moléculas con nivel de evidencia</li>
          <li><a href="/rutina/" style="font-weight:600;">Armar mi rutina</a> — Test de 6 pasos personalizado</li>
          <li><a href="/catalogo/" style="font-weight:600;">Catálogo de productos</a> — 86 probados con rigor</li>
          <li><a href="/diario/" style="font-weight:600;">Diario</a> — Lecturas largas sin calendario forzado</li>
        </ul>
      </div>
    </div>
    
    <div style="padding:70px 56px 64px;max-width:1280px;margin:0 auto;">
      <div style="background:var(--color-accent-100);border-radius:40px;padding:44px 48px;display:grid;grid-template-columns:1fr auto;gap:36px;align-items:center;">
        <div>
          <h3 style="font-family:var(--font-heading);font-size:27px;line-height:1.16;margin:0;">El resumen del mes, en cinco minutos de lectura</h3>
          <p style="font-size:15.5px;line-height:1.65;color:#4a463f;margin:14px 0 0;max-width:50ch;">Un correo al mes con lo que salió publicado, lo que cambia una rutina real y lo que puedes ignorar sin culpa.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:stretch;width:380px;">
          <input type="email" placeholder="tu@correo.com" aria-label="Correo electrónico" style="flex:1;border-radius:999px;min-height:46px;padding:6px 14px;font:inherit;font-size:14px;color:var(--color-text);background:var(--color-surface);border:1px solid var(--color-divider);" />
          <button type="button" style="border-radius:999px;padding:0 24px;min-height:46px;background:var(--color-accent);color:var(--color-bg);font-family:var(--font-heading);font-size:14px;border:none;cursor:pointer;">Suscribirme</button>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</Layout>
`;
}

for (const [section, pages] of Object.entries(structure)) {
  const sectionDir = path.join(BASE_DIR, section);
  fs.mkdirSync(sectionDir, { recursive: true });
  
  for (const page of pages) {
    const filePath = path.join(sectionDir, `${page}.astro`);
    const title = titleFromSlug(page);
    const sectionLabel = SECTION_LABELS[section] || section;
    const content = makeTemplate(title, section, sectionLabel);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Created: ${section}/${page}.astro`);
  }
}

console.log('\nDone! All pages created.');
