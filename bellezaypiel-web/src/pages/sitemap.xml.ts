import type { APIRoute } from 'astro';
import ingredientes from '../data/ingredientes.json';
import { categoriasDiario } from '../data/diario';
import { coleccionesPilares } from '../data/pilares';
import productos from '../data/productos-categorias.json';

const SITE = 'https://bellezaypiel.com';

const staticPaths = [
  '/',
  '/ingredientes/',
  '/catalogo/',
  '/producto/',
  '/rutina/',
  '/diario/',
  '/estudios/',
  '/metodologia/',
  '/contacto/',
  '/privacidad/',
  '/mapa-de-sitio/',
  '/instrumento/',
  '/tecnicas-faciales/',
];

export const GET: APIRoute = () => {
  const urls: string[] = [...staticPaths];

  for (const ing of ingredientes.ingredientes) {
    urls.push(`/ingredientes/${ing.slug}/`);
  }

  for (const cat of categoriasDiario) {
    urls.push(`/diario/${cat.slug}/`);
    for (const art of cat.articulos) {
      urls.push(`/diario/${cat.slug}/${art.slug}/`);
    }
  }

  for (const col of coleccionesPilares) {
    for (const item of col.items) {
      urls.push(`/${col.slug}/${item.slug}/`);
    }
  }

  for (const p of productos.categorias) {
    urls.push(`/productos/${p.slug}/`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
