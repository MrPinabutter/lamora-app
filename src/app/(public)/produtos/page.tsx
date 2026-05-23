import type { Metadata } from "next";
import { Suspense } from "react";
import {
  ProductFilters,
  ProductGrid,
  ProductGridSkeleton,
  ProductSort,
  parseProductFilters,
} from "@/features/products";
import {
  getProductBrands,
  getProducts,
} from "@/features/products/services/product.service";
import type { ProductFilters as ProductFiltersValue } from "@/features/products/types/product.types";

export const metadata: Metadata = {
  title: "Produtos — Lamora",
  description:
    "Perfumes, hidratantes, esfoliantes e skin care com curadoria minimalista.",
};

interface ProductsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

async function ProductResults({ filters }: { filters: ProductFiltersValue }) {
  const products = await getProducts(filters);
  return <ProductGrid products={products} />;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const filters = parseProductFilters(await searchParams);
  const brands = await getProductBrands();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="mb-8 space-y-1">
        <h1 className="font-serif text-3xl tracking-tight">Produtos</h1>
        <p className="text-muted text-sm">
          Nossa curadoria de perfumaria e cuidados com a pele.
        </p>
      </header>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="lg:w-64 lg:shrink-0">
          <ProductFilters brands={brands} />
        </aside>

        <div className="flex-1 space-y-6">
          <div className="flex justify-end">
            <ProductSort />
          </div>
          <Suspense
            key={JSON.stringify(filters)}
            fallback={<ProductGridSkeleton />}
          >
            <ProductResults filters={filters} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
