"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { parseProductFilters } from "../schemas/product.schema";
import type { ProductFilters } from "../types/product.types";

const FILTER_KEYS = ["q", "category", "brand", "minPrice", "maxPrice"] as const;

export function useProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const filters = parseProductFilters(
    Object.fromEntries(searchParams.entries()),
  );

  // A transição mantém a lista anterior na tela durante a navegação e expõe
  // `isPending`, que os controles usam para sinalizar que a busca está em curso.
  const pushParams = (params: URLSearchParams) => {
    const query = params.toString();
    startTransition(() => {
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
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

  return { filters, setFilters, clearFilters, isPending };
}
