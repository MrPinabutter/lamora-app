"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parseProductFilters } from "../schemas/product.schema";
import type { ProductFilters } from "../types/product.types";

const FILTER_KEYS = ["category", "brand", "minPrice", "maxPrice"] as const;

export function useProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = parseProductFilters(
    Object.fromEntries(searchParams.entries()),
  );

  const pushParams = (params: URLSearchParams) => {
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const setFilters = (next: Partial<ProductFilters>) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(next)) {
      const isEmpty =
        value === undefined ||
        value === "" ||
        (typeof value === "number" && Number.isNaN(value));

      if (isEmpty) params.delete(key);
      else params.set(key, String(value));
    }

    pushParams(params);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    for (const key of FILTER_KEYS) params.delete(key);
    pushParams(params);
  };

  return { filters, setFilters, clearFilters };
}
