import { Text } from "@/shared/components/atoms/Text";
import { ProductCard } from "./ProductCard";
import type { Product } from "../types/product.types";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center">
        <Text variant="eyebrow">Nenhum resultado</Text>
        <Text variant="body" tone="muted" className="max-w-xs">
          Nenhum produto corresponde aos filtros selecionados. Tente ajustar a
          categoria ou a faixa de preço.
        </Text>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
