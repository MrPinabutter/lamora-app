"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/shared/components/atoms/Button";
import { Text } from "@/shared/components/atoms/Text";
import { CATEGORY_LABELS } from "@/shared/lib/constants";
import { formatBRL } from "@/shared/lib/utils";
import { deleteProductAction } from "@/server/actions/admin-product.actions";
import type { AdminProductListRow } from "../services/admin-product.service";

interface AdminProductListProps {
  products: AdminProductListRow[];
}

export function AdminProductList({ products }: AdminProductListProps) {
  const [pending, startTransition] = useTransition();

  if (products.length === 0) {
    return (
      <div className="border-border rounded-md border border-dashed p-12 text-center">
        <Text variant="eyebrow">Nenhum produto</Text>
        <Text variant="caption" as="p" className="mt-2">
          Crie o primeiro produto para começar.
        </Text>
      </div>
    );
  }

  const handleDelete = (id: string, name: string) => {
    if (!window.confirm(`Excluir "${name}"? Esta ação não pode ser desfeita.`)) {
      return;
    }
    startTransition(async () => {
      await deleteProductAction(id);
    });
  };

  return (
    <ul className="divide-border border-border divide-y rounded-md border">
      {products.map((product) => (
        <li
          key={product.id}
          className="flex items-center gap-4 px-4 py-3 sm:px-6"
        >
          <div className="bg-background relative size-14 shrink-0 overflow-hidden rounded">
            {product.primaryImageUrl ? (
              <Image
                src={product.primaryImageUrl}
                alt=""
                fill
                sizes="56px"
                className="object-cover"
                unoptimized
              />
            ) : null}
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <Text variant="eyebrow">{product.brand}</Text>
            <Text
              variant="h3"
              as="p"
              className="truncate font-serif text-[15px] leading-snug font-normal"
            >
              {product.name}
            </Text>
            <Text variant="caption" as="p">
              {CATEGORY_LABELS[product.category]} ·{" "}
              {formatBRL(product.price)} · estoque {product.stock}
            </Text>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={`/admin/produtos/${product.id}`}
              className="text-foreground hover:bg-foreground/5 focus-visible:ring-primary inline-flex h-9 items-center gap-1 rounded-full px-3 text-sm focus-visible:ring-2 focus-visible:outline-none"
            >
              <Pencil className="size-4" aria-hidden />
              Editar
            </Link>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(product.id, product.name)}
              disabled={pending}
              aria-label={`Excluir ${product.name}`}
            >
              <Trash2 className="size-4" aria-hidden />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
