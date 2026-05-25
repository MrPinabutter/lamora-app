"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminProductSchema } from "@/features/admin-products/schemas/admin-product.schema";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/features/admin-products/services/admin-product.service";
import { getCurrentAdmin } from "@/server/auth/admin";

export type AdminProductActionResult =
  | { ok: true; id: string }
  | {
      ok: false;
      formError?: string;
      fieldErrors?: Partial<Record<string, string[]>>;
    };

function revalidatePublicCatalog(slug?: string): void {
  revalidatePath("/");
  revalidatePath("/produtos");
  if (slug) revalidatePath(`/produtos/${slug}`);
  revalidatePath("/admin/produtos");
}

async function ensureAdmin(): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/login");
}

export async function createProductAction(
  rawInput: unknown,
): Promise<AdminProductActionResult> {
  await ensureAdmin();

  const parsed = adminProductSchema.safeParse(rawInput);
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const result = await createProduct(parsed.data);
  if (!result.ok) {
    return { ok: false, fieldErrors: { slug: ["Slug já em uso"] } };
  }

  revalidatePublicCatalog(parsed.data.slug);
  return { ok: true, id: result.id };
}

export async function updateProductAction(
  id: string,
  rawInput: unknown,
): Promise<AdminProductActionResult> {
  await ensureAdmin();

  if (!id) {
    return { ok: false, formError: "Produto inválido." };
  }

  const parsed = adminProductSchema.safeParse(rawInput);
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const result = await updateProduct(id, parsed.data);
  if (!result.ok) {
    if (result.reason === "slug-taken") {
      return { ok: false, fieldErrors: { slug: ["Slug já em uso"] } };
    }
    return { ok: false, formError: "Produto não encontrado." };
  }

  revalidatePublicCatalog(parsed.data.slug);
  return { ok: true, id: result.id };
}

export async function deleteProductAction(
  id: string,
): Promise<{ ok: boolean }> {
  await ensureAdmin();

  const removed = await deleteProduct(id);
  revalidatePublicCatalog();
  return { ok: removed };
}
