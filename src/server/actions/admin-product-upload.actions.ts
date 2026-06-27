"use server";

import { z } from "zod";
import {
  createProductImageUploadUrl,
  PRODUCT_IMAGE_CONTENT_TYPES,
} from "@/shared/lib/s3";
import { getCurrentAdmin } from "@/server/auth/admin";

const requestUploadSchema = z.object({
  contentType: z.enum(PRODUCT_IMAGE_CONTENT_TYPES),
});

export type ProductImageUploadResult =
  | { ok: true; uploadUrl: string; publicUrl: string }
  | { ok: false; error: string };

export async function requestProductImageUploadAction(
  rawInput: unknown,
): Promise<ProductImageUploadResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { ok: false, error: "Acesso não autorizado." };
  }

  const parsed = requestUploadSchema.safeParse(rawInput);
  if (!parsed.success) {
    return { ok: false, error: "Tipo de arquivo não suportado." };
  }

  try {
    const urls = await createProductImageUploadUrl(parsed.data.contentType);
    return { ok: true, ...urls };
  } catch {
    return { ok: false, error: "Não foi possível preparar o upload." };
  }
}
