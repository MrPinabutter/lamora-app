import Image from "next/image";
import Link from "next/link";
import { Text } from "@/shared/components/atoms/Text";
import { formatBRL } from "@/shared/lib/utils";
import type { Product } from "../types/product.types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage =
    product.images.find((image) => image.isPrimary) ?? product.images[0];

  return (
    <article className="group">
      <Link
        href={`/produtos/${product.slug}`}
        className="focus-visible:ring-primary block rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <div className="bg-surface relative aspect-[4/5] overflow-hidden rounded-lg">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
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
        <div className="mt-3 space-y-1">
          <Text variant="eyebrow">{product.brand}</Text>
          <Text variant="h3">{product.name}</Text>
          <Text variant="caption" as="p" className="line-clamp-2 leading-snug">
            {product.shortDesc}
          </Text>
          <Text variant="body" className="pt-1 font-semibold">
            {formatBRL(product.price)}
          </Text>
        </div>
      </Link>
    </article>
  );
}
