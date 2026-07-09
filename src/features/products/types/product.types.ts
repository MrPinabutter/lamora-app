import type { CATEGORY_LABELS, NOTE_TIER_LABELS } from "@/shared/lib/constants";

export type Category = keyof typeof CATEGORY_LABELS;

export type NoteTier = keyof typeof NOTE_TIER_LABELS;

export interface ProductImage {
  id: string;
  url: string;
  position: number;
  isPrimary: boolean;
}

export interface OlfactoryNote {
  id: string;
  name: string;
  tier: NoteTier;
  /** Escala visual de 1 a 5. */
  intensity: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  category: Category;
  shortDesc: string;
  fullDesc: string;
  stock: number;
  images: ProductImage[];
  olfactory: OlfactoryNote[];
  createdAt: Date;
}

/** Critério de ordenação da listagem. */
export type SortOption = "relevance" | "price-asc" | "price-desc" | "newest";

/** Filtros aplicados à listagem, refletidos na URL. */
export interface ProductFilters {
  q?: string;
  category?: Category;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sort: SortOption;
}
