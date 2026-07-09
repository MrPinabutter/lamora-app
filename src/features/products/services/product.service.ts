import "server-only";
import { cache } from "react";
import { db } from "@/server/db";
import type {
  Product,
  ProductFilters,
  SortOption,
} from "../types/product.types";

const PRODUCT_INCLUDE = {
  images: { orderBy: { position: "asc" } },
  olfactory: { orderBy: { intensity: "desc" } },
} as const;

function orderByForSort(sort: SortOption) {
  switch (sort) {
    case "price-asc":
      return { price: "asc" } as const;
    case "price-desc":
      return { price: "desc" } as const;
    case "newest":
    case "relevance":
      return { createdAt: "desc" } as const;
  }
}

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: { toNumber: () => number };
  category: Product["category"];
  shortDesc: string;
  fullDesc: string;
  stock: number;
  createdAt: Date;
  images: Product["images"];
  olfactory: Product["olfactory"];
};

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    price: row.price.toNumber(),
    category: row.category,
    shortDesc: row.shortDesc,
    fullDesc: row.fullDesc,
    stock: row.stock,
    createdAt: row.createdAt,
    images: row.images.map((image) => ({
      id: image.id,
      url: image.url,
      position: image.position,
      isPrimary: image.isPrimary,
    })),
    olfactory: row.olfactory.map((note) => ({
      id: note.id,
      name: note.name,
      tier: note.tier,
      intensity: note.intensity,
    })),
  };
}

export async function getProducts(filters: ProductFilters): Promise<Product[]> {
  const price = {
    ...(filters.minPrice !== undefined ? { gte: filters.minPrice } : {}),
    ...(filters.maxPrice !== undefined ? { lte: filters.maxPrice } : {}),
  };

  const rows = await db.product.findMany({
    where: {
      ...(filters.q
        ? { name: { contains: filters.q, mode: "insensitive" } }
        : {}),
      ...(filters.category ? { category: filters.category } : {}),
      ...(filters.brand
        ? { brand: { equals: filters.brand, mode: "insensitive" } }
        : {}),
      ...(Object.keys(price).length > 0 ? { price } : {}),
    },
    orderBy: orderByForSort(filters.sort),
    include: PRODUCT_INCLUDE,
  });

  return rows.map(toProduct);
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return [];

  const rows = await db.product.findMany({
    where: { id: { in: ids } },
    include: PRODUCT_INCLUDE,
  });

  return rows.map(toProduct);
}

export const getProductBySlug = cache(
  async (slug: string): Promise<Product | null> => {
    const row = await db.product.findUnique({
      where: { slug },
      include: PRODUCT_INCLUDE,
    });

    return row ? toProduct(row) : null;
  },
);

export const getProductBrands = cache(async (): Promise<string[]> => {
  const rows = await db.product.findMany({
    distinct: ["brand"],
    select: { brand: true },
    orderBy: { brand: "asc" },
  });

  return rows.map((row) => row.brand);
});

// Sem dados de vendas no MVP: usamos os mais recentes como proxy.
// Quando houver pedidos (v2), trocar por contagem de itens vendidos.
export const getFeaturedProducts = cache(
  async (limit = 4): Promise<Product[]> => {
    const rows = await db.product.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      include: PRODUCT_INCLUDE,
    });

    return rows.map(toProduct);
  },
);

// "Aroma do mês" da landing: o PERFUME mais recente do catálogo, com
// pirâmide olfativa completa. Curadoria manual via reordenação no admin.
export const getFeaturedFragrance = cache(
  async (): Promise<Product | null> => {
    const row = await db.product.findFirst({
      where: { category: "PERFUME" },
      orderBy: { createdAt: "desc" },
      include: PRODUCT_INCLUDE,
    });
    return row ? toProduct(row) : null;
  },
);
