import type { CSSProperties, ReactNode } from "react";
import { Text } from "@/shared/components/atoms/Text";
import { ProductCard } from "./ProductCard";
import type { Product } from "../types/product.types";

interface ProductGridProps {
  products: Product[];
  /** Render-prop opcional para uma ação por card (ex.: adicionar ao carrinho). */
  renderAction?: (product: Product) => ReactNode;
  /**
   * Anima cada card em cascata quando ele entra na viewport (via `data-reveal`
   * + ScrollReveal). Desligado por padrão — o catálogo mostra os produtos sem
   * movimento; a home usa a cascata como momento de entrada.
   */
  reveal?: boolean;
}

export function ProductGrid({
  products,
  renderAction,
  reveal = false,
}: ProductGridProps) {
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
      {products.map((product, position) => (
        <li
          key={product.id}
          data-reveal={reveal ? "" : undefined}
          style={
            reveal
              ? ({ "--reveal-delay": `${(position % 4) * 90}ms` } as CSSProperties)
              : undefined
          }
        >
          <ProductCard
            product={product}
            action={renderAction?.(product)}
          />
        </li>
      ))}
    </ul>
  );
}
