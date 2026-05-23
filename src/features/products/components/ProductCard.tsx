import Image from "next/image";
import Link from "next/link";
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
            <span className="text-muted flex h-full items-center justify-center text-xs">
              Sem imagem
            </span>
          )}
        </div>
        <div className="mt-3 space-y-1">
          <p className="text-muted text-xs tracking-wide uppercase">
            {product.brand}
          </p>
          <h3 className="text-foreground text-sm font-medium">
            {product.name}
          </h3>
          <p className="text-muted line-clamp-2 text-xs leading-relaxed">
            {product.shortDesc}
          </p>
          <p className="text-foreground pt-1 text-sm font-semibold">
            {formatBRL(product.price)}
          </p>
        </div>
      </Link>
    </article>
  );
}
