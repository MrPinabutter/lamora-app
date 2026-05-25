"use client";

import Image from "next/image";
import { ArrowDown, ArrowUp, Star, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/atoms/Button";
import { Text } from "@/shared/components/atoms/Text";
import type { AdminProductImageInput } from "../schemas/admin-product.schema";

interface ImageReorderProps {
  images: AdminProductImageInput[];
  onMove: (from: number, to: number) => void;
  onSetPrimary: (index: number) => void;
  onRemove: (index: number) => void;
}

export function ImageReorder({
  images,
  onMove,
  onSetPrimary,
  onRemove,
}: ImageReorderProps) {
  if (images.length === 0) {
    return (
      <div className="border-border rounded-md border border-dashed p-6 text-center">
        <Text variant="caption" as="p">
          Nenhuma imagem adicionada ainda.
        </Text>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {images.map((image, index) => {
        const isFirst = index === 0;
        const isLast = index === images.length - 1;

        return (
          <li
            key={`${image.url}-${index}`}
            className="border-border bg-surface flex items-center gap-4 rounded-md border p-3"
          >
            <div className="bg-background relative h-16 w-16 shrink-0 overflow-hidden rounded">
              <Image
                src={image.url}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <Text
                variant="caption"
                as="p"
                className="truncate text-foreground"
              >
                {image.url}
              </Text>
              <Text variant="caption" as="p">
                Posição {index + 1}
                {image.isPrimary ? " · principal" : ""}
              </Text>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onMove(index, index - 1)}
                disabled={isFirst}
                aria-label="Mover para cima"
              >
                <ArrowUp className="size-4" aria-hidden />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onMove(index, index + 1)}
                disabled={isLast}
                aria-label="Mover para baixo"
              >
                <ArrowDown className="size-4" aria-hidden />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onSetPrimary(index)}
                disabled={image.isPrimary}
                aria-label="Definir como imagem principal"
                aria-pressed={image.isPrimary}
              >
                <Star
                  className={
                    image.isPrimary
                      ? "size-4 fill-accent text-accent"
                      : "size-4"
                  }
                  aria-hidden
                />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemove(index)}
                aria-label="Remover imagem"
              >
                <Trash2 className="size-4" aria-hidden />
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
