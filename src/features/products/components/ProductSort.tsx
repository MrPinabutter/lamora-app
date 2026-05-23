"use client";

import type { ChangeEvent } from "react";
import { SORT_OPTIONS } from "../schemas/product.schema";
import { useProductFilters } from "../hooks/useProductFilters";
import type { SortOption } from "../types/product.types";

const SORT_ENTRIES = Object.entries(SORT_OPTIONS) as [SortOption, string][];

export function ProductSort() {
  const { filters, setFilters } = useProductFilters();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilters({ sort: event.target.value as SortOption });
  };

  return (
    <label className="flex items-center gap-3">
      <span className="text-muted text-[11px] font-medium tracking-[0.14em] whitespace-nowrap uppercase">
        Ordenar
      </span>
      <select
        value={filters.sort}
        onChange={handleChange}
        className="border-border bg-transparent text-foreground focus-visible:ring-primary h-9 rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:outline-none"
      >
        {SORT_ENTRIES.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
