import "server-only";
import { db } from "@/server/db";

export type AdminUserStatus = "ACTIVE" | "ANONYMIZED";

export interface AdminCartLine {
  productId: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
}

export interface AdminCartSummary {
  itemCount: number;
  total: number;
  lines: AdminCartLine[];
  updatedAt: Date | null;
}

export interface AdminUserRow {
  id: string;
  email: string;
  createdAt: Date;
  status: AdminUserStatus;
  isAdmin: boolean;
  cart: AdminCartSummary;
}

export async function listAdminUsers(): Promise<AdminUserRow[]> {
  const rows = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      createdAt: true,
      status: true,
      isAdmin: true,
      cart: {
        select: {
          updatedAt: true,
          items: { select: { productId: true, quantity: true } },
        },
      },
    },
  });

  // Busca em lote todos os produtos referenciados nos carrinhos para evitar
  // N+1. Carrinho ainda é client-only (Task 04 persiste no localStorage), por
  // isso a tabela costuma vir vazia — a UI lida com `lines === []`.
  const productIds = Array.from(
    new Set(
      rows.flatMap((row) => row.cart?.items.map((item) => item.productId) ?? []),
    ),
  );
  const products =
    productIds.length > 0
      ? await db.product.findMany({
          where: { id: { in: productIds } },
          select: { id: true, name: true, brand: true, price: true },
        })
      : [];

  const productMap = new Map(
    products.map((product) => [
      product.id,
      {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price.toNumber(),
      },
    ]),
  );

  return rows.map((row) => {
    const items = row.cart?.items ?? [];
    const lines: AdminCartLine[] = items
      .map((item) => {
        const product = productMap.get(item.productId);
        if (!product) return null;
        return {
          productId: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          quantity: item.quantity,
        };
      })
      .filter((line): line is AdminCartLine => line !== null);

    const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
    const total = lines.reduce(
      (sum, line) => sum + line.price * line.quantity,
      0,
    );

    return {
      id: row.id,
      email: row.email,
      createdAt: row.createdAt,
      status: row.status,
      isAdmin: row.isAdmin,
      cart: {
        itemCount,
        total,
        lines,
        updatedAt: row.cart?.updatedAt ?? null,
      },
    };
  });
}
