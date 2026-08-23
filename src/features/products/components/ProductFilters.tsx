"use client";

import type { FormEvent } from "react";
import { Button } from "@/shared/components/atoms/Button";
import { Input } from "@/shared/components/atoms/Input";
import { Text } from "@/shared/components/atoms/Text";
import { CATEGORY_LABELS } from "@/shared/lib/constants";
import { useProductFilters } from "../hooks/useProductFilters";
import type { Category } from "../types/product.types";

interface ProductFiltersProps {
  brands: string[];
}

const CATEGORY_ENTRIES = Object.entries(CATEGORY_LABELS) as [Category, string][];

const FIELD_CLASS =
  "border-border bg-surface text-foreground placeholder:text-muted focus-visible:ring-primary h-11 w-full rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:outline-none";
const LABEL_CLASS = "text-foreground mb-1.5 block text-xs font-medium";

function isCategory(value: FormDataEntryValue | null): value is Category {
  return typeof value === "string" && value in CATEGORY_LABELS;
}

function readPrice(value: FormDataEntryValue | null): number | undefined {
  if (typeof value !== "string" || value.trim() === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

export function ProductFilters({ brands }: ProductFiltersProps) {
  const { filters, setFilters, clearFilters, isPending } = useProductFilters();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const q = data.get("q");
    const category = data.get("category");
    const brand = data.get("brand");

    setFilters({
      q: typeof q === "string" && q.trim().length > 0 ? q.trim() : undefined,
      category: isCategory(category) ? category : undefined,
      brand: typeof brand === "string" && brand.length > 0 ? brand : undefined,
      minPrice: readPrice(data.get("minPrice")),
      maxPrice: readPrice(data.get("maxPrice")),
    });
  };

  const hasActiveFilters =
    filters.q !== undefined ||
    filters.category !== undefined ||
    filters.brand !== undefined ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined;

  // Remonta o formulário (inputs não-controlados) quando os filtros mudam
  // por fora — por exemplo ao limpar.
  const formKey = [
    filters.q,
    filters.category,
    filters.brand,
    filters.minPrice,
    filters.maxPrice,
  ].join("|");

  return (
    <form
      key={formKey}
      onSubmit={handleSubmit}
      aria-busy={isPending || undefined}
      className="space-y-8"
    >
      <div className="border-border space-y-1 border-t pt-5">
        <Text variant="eyebrow">Filtros</Text>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="filter-q" className={LABEL_CLASS}>
            Nome
          </label>
          <Input
            id="filter-q"
            type="search"
            name="q"
            placeholder="Buscar por nome"
            defaultValue={filters.q ?? ""}
          />
        </div>

        <div>
          <label htmlFor="filter-category" className={LABEL_CLASS}>
            Categoria
          </label>
          <select
            id="filter-category"
            name="category"
            defaultValue={filters.category ?? ""}
            className={FIELD_CLASS}
          >
            <option value="">Todas</option>
            {CATEGORY_ENTRIES.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-brand" className={LABEL_CLASS}>
            Marca
          </label>
          <select
            id="filter-brand"
            name="brand"
            defaultValue={filters.brand ?? ""}
            className={FIELD_CLASS}
          >
            <option value="">Todas</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className={LABEL_CLASS}>Faixa de preço (R$)</legend>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              name="minPrice"
              min={0}
              step="0.01"
              placeholder="Mín."
              defaultValue={filters.minPrice ?? ""}
              aria-label="Preço mínimo"
            />
            <span className="text-muted text-sm" aria-hidden>
              –
            </span>
            <Input
              type="number"
              name="maxPrice"
              min={0}
              step="0.01"
              placeholder="Máx."
              defaultValue={filters.maxPrice ?? ""}
              aria-label="Preço máximo"
            />
          </div>
        </fieldset>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <Button type="submit" size="sm" loading={isPending}>
          {isPending ? "Aplicando…" : "Aplicar filtros"}
        </Button>
        {hasActiveFilters ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            disabled={isPending}
          >
            Limpar filtros
          </Button>
        ) : null}
      </div>
    </form>
  );
}
