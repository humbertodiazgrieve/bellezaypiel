import yogaMasajes from './diario-yoga-masajes.json';
import ejerciciosCuidado from './diario-ejercicios-cuidado.json';
import rutinasProblemas from './diario-rutinas-problemas.json';
import guias from './diario-guias.json';

export interface SeccionArticulo {
  titulo: string;
  contenido: string;
}

export interface Articulo {
  slug: string;
  titulo: string;
  excerpt: string;
  fecha: string;
  lectura: string;
  secciones: SeccionArticulo[];
}

export interface CategoriaDiario {
  slug: string;
  nombre: string;
  descripcion: string;
  articulos: Articulo[];
}

export const categoriasDiario: CategoriaDiario[] = [
  ...yogaMasajes.categorias,
  ...ejerciciosCuidado.categorias,
  ...rutinasProblemas.categorias,
  ...guias.categorias,
] as CategoriaDiario[];

export function getCategoria(slug: string): CategoriaDiario | undefined {
  return categoriasDiario.find((c) => c.slug === slug);
}

export function getArticulo(categoriaSlug: string, articuloSlug: string) {
  const cat = getCategoria(categoriaSlug);
  if (!cat) return undefined;
  const articulo = cat.articulos.find((a) => a.slug === articuloSlug);
  return articulo ? { categoria: cat, articulo } : undefined;
}

export function getAllArticulos() {
  return categoriasDiario.flatMap((c) =>
    c.articulos.map((a) => ({ categoria: c, articulo: a }))
  );
}
