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
import { Text } from "@/shared/components/atoms/Text";

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
    <main className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
      <header className="mb-14 space-y-3 lg:mb-20">
        <Text variant="eyebrow">Catálogo</Text>
        <Text variant="h1" className="text-3xl lg:text-[2rem]">
          Produtos
        </Text>
        <Text variant="body" tone="muted" className="max-w-md text-base">
          Nossa curadoria de perfumaria e cuidados com a pele.
        </Text>
      </header>

      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        <aside className="lg:w-56 lg:shrink-0">
          <ProductFilters brands={brands} />
        </aside>

        <div className="flex-1 space-y-8">
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
