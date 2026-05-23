"use client";

import Image from "next/image";
import { useState } from "react";
import { Text } from "@/shared/components/atoms/Text";
import { cn } from "@/shared/lib/utils";
import type { ProductImage } from "../types/product.types";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const sorted = [...images].sort((a, b) => a.position - b.position);
  const initial = sorted.find((image) => image.isPrimary) ?? sorted[0];
  const [activeId, setActiveId] = useState(initial?.id);

  const active = sorted.find((image) => image.id === activeId) ?? initial;

  if (!active) {
    return (
      <div className="bg-surface flex aspect-[4/5] items-center justify-center rounded-lg">
        <Text variant="body" tone="muted">
          Sem imagem
        </Text>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="bg-surface relative aspect-[4/5] overflow-hidden rounded-lg">
        <Image
          src={active.url}
          alt={productName}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          priority
        />
      </div>
      {sorted.length > 1 ? (
        <ul className="grid grid-cols-4 gap-2">
          {sorted.map((image) => (
            <li key={image.id}>
              <button
                type="button"
                onClick={() => setActiveId(image.id)}
                aria-label={`Ver imagem ${image.position + 1}`}
                aria-current={image.id === active.id}
                className={cn(
                  "bg-surface focus-visible:ring-primary relative block aspect-square w-full overflow-hidden rounded-md focus-visible:ring-2 focus-visible:outline-none",
                  image.id === active.id
                    ? "ring-primary ring-2"
                    : "ring-border ring-1",
                )}
              >
                <Image
                  src={image.url}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
