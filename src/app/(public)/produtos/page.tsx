import type { Metadata } from "next";
import { Suspense } from "react";
import { AddToCartButton } from "@/features/cart";
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
  getRandomProducts,
} from "@/features/products/services/product.service";
import type {
  Product,
  ProductFilters as ProductFiltersValue,
} from "@/features/products/types/product.types";
import { Text } from "@/shared/components/atoms/Text";

export const metadata: Metadata = {
  title: "Produtos — Lamora",
  description:
    "Perfumes, hidratantes, esfoliantes e skin care com curadoria minimalista.",
};

interface ProductsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function renderAddToCart(product: Product) {
  const image =
    product.images.find((img) => img.isPrimary) ?? product.images[0];
  return (
    <AddToCartButton
      productId={product.id}
      slug={product.slug}
      name={product.name}
      brand={product.brand}
      price={product.price}
      imageUrl={image?.url}
      stock={product.stock}
      className="w-full"
    />
  );
}

async function ProductResults({ filters }: { filters: ProductFiltersValue }) {
  const products = await getProducts(filters);

  if (products.length === 0 && filters.q) {
    const suggestions = await getRandomProducts(filters);
    return (
      <div className="space-y-10">
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <Text variant="eyebrow">Nenhum resultado</Text>
          <Text variant="body" tone="muted" className="max-w-sm">
            Não encontramos produtos para &ldquo;{filters.q}&rdquo;. Confira
            sugestões parecidas do nosso catálogo.
          </Text>
        </div>
        {suggestions.length > 0 ? (
          <ProductGrid products={suggestions} renderAction={renderAddToCart} />
        ) : null}
      </div>
    );
  }

  return <ProductGrid products={products} renderAction={renderAddToCart} />;
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
