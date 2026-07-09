import "server-only";
import { db } from "@/server/db";
import type { AdminProductInput } from "../schemas/admin-product.schema";

// Códigos de erro do Prisma usados nesta camada
// (https://www.prisma.io/docs/reference/api-reference/error-reference).
const PRISMA_UNIQUE_VIOLATION = "P2002";
const PRISMA_RECORD_NOT_FOUND = "P2025";

function prismaErrorCode(error: unknown): string | null {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code: unknown }).code;
    return typeof code === "string" ? code : null;
  }
  return null;
}

export interface AdminProductListRow {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  category: AdminProductInput["category"];
  stock: number;
  primaryImageUrl: string | null;
  createdAt: Date;
}

export interface AdminProductDetail extends AdminProductListRow {
  shortDesc: string;
  fullDesc: string;
  images: Array<{
    id: string;
    url: string;
    position: number;
    isPrimary: boolean;
  }>;
  olfactory: Array<{
    id: string;
    name: string;
    tier: "TOPO" | "CORACAO" | "FUNDO";
    intensity: number;
  }>;
}

export type AdminProductMutationResult =
  | { ok: true; id: string }
  | { ok: false; reason: "slug-taken" | "not-found" };

export interface AdminProductListFilters {
  q?: string;
  category?: AdminProductInput["category"];
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
}

export async function listAdminProducts(
  filters: AdminProductListFilters = {},
): Promise<AdminProductListRow[]> {
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
    orderBy: { createdAt: "desc" },
    include: {
      images: {
        where: { isPrimary: true },
        select: { url: true },
        take: 1,
      },
    },
  });

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    price: row.price.toNumber(),
    category: row.category,
    stock: row.stock,
    primaryImageUrl: row.images[0]?.url ?? null,
    createdAt: row.createdAt,
  }));
}

export async function getAdminProductById(
  id: string,
): Promise<AdminProductDetail | null> {
  const row = await db.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: { position: "asc" } },
      olfactory: { orderBy: { intensity: "desc" } },
    },
  });
  if (!row) return null;

  const primary = row.images.find((image) => image.isPrimary);

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    price: row.price.toNumber(),
    category: row.category,
    stock: row.stock,
    shortDesc: row.shortDesc,
    fullDesc: row.fullDesc,
    primaryImageUrl: primary?.url ?? row.images[0]?.url ?? null,
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

export async function createProduct(
  input: AdminProductInput,
): Promise<AdminProductMutationResult> {
  try {
    const product = await db.product.create({
      data: {
        slug: input.slug,
        name: input.name,
        brand: input.brand,
        price: input.price,
        category: input.category,
        shortDesc: input.shortDesc,
        fullDesc: input.fullDesc,
        stock: input.stock,
        images: {
          create: input.images.map((image, index) => ({
            url: image.url,
            position: index,
            isPrimary: image.isPrimary,
          })),
        },
        olfactory:
          input.category === "PERFUME" && input.olfactory.length > 0
            ? {
                create: input.olfactory.map((note) => ({
                  name: note.name,
                  tier: note.tier,
                  intensity: note.intensity,
                })),
              }
            : undefined,
      },
      select: { id: true },
    });
    return { ok: true, id: product.id };
  } catch (error) {
    if (prismaErrorCode(error) === PRISMA_UNIQUE_VIOLATION) {
      return { ok: false, reason: "slug-taken" };
    }
    throw error;
  }
}

export async function updateProduct(
  id: string,
  input: AdminProductInput,
): Promise<AdminProductMutationResult> {
  const existing = await db.product.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!existing) return { ok: false, reason: "not-found" };

  try {
    // Atualiza o produto e substitui imagens/olfativas em uma transação.
    // Diff de IDs seria mais elegante, mas a UI permite reordenar/remover
    // livremente — apagar e recriar mantém o código pequeno e consistente.
    await db.$transaction([
      db.productImage.deleteMany({ where: { productId: id } }),
      db.olfactoryNote.deleteMany({ where: { productId: id } }),
      db.product.update({
        where: { id },
        data: {
          slug: input.slug,
          name: input.name,
          brand: input.brand,
          price: input.price,
          category: input.category,
          shortDesc: input.shortDesc,
          fullDesc: input.fullDesc,
          stock: input.stock,
          images: {
            create: input.images.map((image, index) => ({
              url: image.url,
              position: index,
              isPrimary: image.isPrimary,
            })),
          },
          olfactory:
            input.category === "PERFUME" && input.olfactory.length > 0
              ? {
                  create: input.olfactory.map((note) => ({
                    name: note.name,
                    tier: note.tier,
                    intensity: note.intensity,
                  })),
                }
              : undefined,
        },
      }),
    ]);
    return { ok: true, id };
  } catch (error) {
    if (prismaErrorCode(error) === PRISMA_UNIQUE_VIOLATION) {
      return { ok: false, reason: "slug-taken" };
    }
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    await db.product.delete({ where: { id } });
    return true;
  } catch (error) {
    if (prismaErrorCode(error) === PRISMA_RECORD_NOT_FOUND) {
      return false;
    }
    throw error;
  }
}
