import { z } from "zod";

// Literais alinhados com o enum Prisma + `CATEGORY_LABELS` / `NOTE_TIER_LABELS`.
// Mantemos como `as const` para preservar o tipo discriminado e satisfazer o
// cliente Prisma sem perder narrowing.
const CATEGORY_VALUES = [
  "PERFUME",
  "HIDRATANTE",
  "ESFOLIANTE",
  "SKIN_CARE",
] as const;
const NOTE_TIER_VALUES = ["TOPO", "CORACAO", "FUNDO"] as const;

export const productImageSchema = z.object({
  url: z.string().url("URL inválida"),
  position: z.coerce.number().int().nonnegative(),
  isPrimary: z.boolean(),
});

export const olfactoryNoteSchema = z.object({
  name: z.string().trim().min(1, "Informe a nota"),
  tier: z.enum(NOTE_TIER_VALUES),
  intensity: z.coerce.number().int().min(1).max(5),
});

export const adminProductSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .regex(/^[a-z0-9-]+$/, "Use letras minúsculas, números e hífens"),
    name: z.string().trim().min(1, "Informe o nome"),
    brand: z.string().trim().min(1, "Informe a marca"),
    price: z.coerce.number().nonnegative("Preço inválido"),
    category: z.enum(CATEGORY_VALUES),
    shortDesc: z.string().trim().min(1, "Informe a descrição breve"),
    fullDesc: z.string().trim().min(1, "Informe a descrição completa"),
    stock: z.coerce.number().int().nonnegative("Estoque inválido"),
    images: z
      .array(productImageSchema)
      .min(1, "Inclua ao menos uma imagem")
      .refine(
        (arr) => arr.filter((image) => image.isPrimary).length === 1,
        "Marque exatamente uma imagem como principal",
      ),
    olfactory: z.array(olfactoryNoteSchema).default([]),
  })
  .superRefine((data, ctx) => {
    if (data.category !== "PERFUME" && data.olfactory.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["olfactory"],
        message: "Notas olfativas só se aplicam à categoria PERFUME",
      });
    }
  });

export type AdminProductInput = z.infer<typeof adminProductSchema>;
export type AdminProductImageInput = z.infer<typeof productImageSchema>;
export type AdminOlfactoryInput = z.infer<typeof olfactoryNoteSchema>;
