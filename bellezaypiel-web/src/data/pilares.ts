import pilares from './pilares.json';

export interface ItemPilar {
  slug: string;
  nombre: string;
  resumen: string;
  evidencia: string;
  queEs: string;
  beneficios: string[];
  comoUsar: string[];
  frecuencia: string;
  precauciones: string;
  paraQuien: string;
}

export interface ColeccionPilar {
  slug: string;
  nombre: string;
  descripcion: string;
  items: ItemPilar[];
}

export const coleccionesPilares: ColeccionPilar[] = pilares.colecciones as ColeccionPilar[];

export function getColeccion(slug: string): ColeccionPilar | undefined {
  return coleccionesPilares.find((c) => c.slug === slug);
}

export function getItem(coleccionSlug: string, itemSlug: string) {
  const col = getColeccion(coleccionSlug);
  if (!col) return undefined;
  const item = col.items.find((i) => i.slug === itemSlug);
  return item ? { coleccion: col, item } : undefined;
}
