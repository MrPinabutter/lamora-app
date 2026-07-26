import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Text } from "@/shared/components/atoms/Text";
import { formatBRL } from "@/shared/lib/utils";
import type { Product } from "../types/product.types";

interface ProductCardProps {
  product: Product;
  /**
   * Ação inserida abaixo do card (ex.: `AddToCartButton`). Fica fora do
   * `<Link>` para evitar elementos interativos aninhados.
   */
  action?: ReactNode;
}

export function ProductCard({ product, action }: ProductCardProps) {
  const primaryImage =
    product.images.find((image) => image.isPrimary) ?? product.images[0];

  return (
    <article className="group">
      <Link
        href={`/produtos/${product.slug}`}
        className="focus-visible:ring-primary block rounded-lg focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
      >
        <div className="bg-surface relative aspect-[4/5] overflow-hidden rounded-md">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          ) : (
            <Text
              variant="caption"
              as="span"
              className="flex h-full items-center justify-center"
            >
              Sem imagem
            </Text>
          )}
        </div>
        <div className="mt-5 space-y-2">
          <Text variant="eyebrow" className="line-clamp-1">
            {product.brand}
          </Text>
          <Text
            variant="h3"
            as="h3"
            className="line-clamp-2 min-h-[2lh] font-serif text-[15px] leading-snug font-normal tracking-tight"
          >
            {product.name}
          </Text>
          <Text
            variant="caption"
            as="p"
            className="line-clamp-2 min-h-[2lh] leading-snug"
          >
            {product.shortDesc}
          </Text>
          <Text
            as="p"
            className="text-foreground pt-1.5 font-serif text-[16px] tracking-tight"
          >
            {formatBRL(product.price)}
          </Text>
        </div>
      </Link>
      {action ? <div className="mt-4">{action}</div> : null}
    </article>
  );
}
