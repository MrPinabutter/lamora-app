import { z } from "zod";
import { CATEGORY_LABELS } from "@/shared/lib/constants";
import type {
  Category,
  ProductFilters,
  SortOption,
} from "../types/product.types";

const CATEGORY_VALUES = Object.keys(CATEGORY_LABELS) as [
  Category,
  ...Category[],
];

export const SORT_OPTIONS: Record<SortOption, string> = {
  relevance: "Relevância",
  "price-asc": "Menor preço",
  "price-desc": "Maior preço",
  newest: "Novidades",
};

const SORT_VALUES = Object.keys(SORT_OPTIONS) as [SortOption, ...SortOption[]];

const emptyToUndefined = (value: unknown): unknown =>
  value === "" || value === null ? undefined : value;

const optionalPrice = z.preprocess(
  emptyToUndefined,
  z.coerce.number().nonnegative().optional().catch(undefined),
);

export const productFiltersSchema = z.object({
  category: z.preprocess(
    emptyToUndefined,
    z.enum(CATEGORY_VALUES).optional().catch(undefined),
  ),
  brand: z.preprocess(
    emptyToUndefined,
    z.string().trim().min(1).optional().catch(undefined),
  ),
  minPrice: optionalPrice,
  maxPrice: optionalPrice,
  sort: z.preprocess(emptyToUndefined, z.enum(SORT_VALUES).catch("relevance")),
});

type RawSearchParams = Record<string, string | string[] | undefined>;

export function parseProductFilters(raw: RawSearchParams): ProductFilters {
  const normalized: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(raw)) {
    normalized[key] = Array.isArray(value) ? value[0] : value;
  }

  const result = productFiltersSchema.safeParse(normalized);
  return result.success ? result.data : { sort: "relevance" };
}
