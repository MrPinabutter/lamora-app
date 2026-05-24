"use client";

import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAppStore } from "@/store";
import { Text } from "@/shared/components/atoms/Text";
import { formatBRL } from "@/shared/lib/utils";
import type { CartItem } from "../types/cart.types";

interface CartLineItemProps {
  item: CartItem;
  /** Chamado após navegar para o produto, p/ fechar o drawer. */
  onNavigate?: () => void;
}

export function CartLineItem({ item, onNavigate }: CartLineItemProps) {
  const updateQuantity = useAppStore((state) => state.updateQuantity);
  const removeItem = useAppStore((state) => state.removeItem);

  const subtotal = item.price * item.quantity;

  const handleDecrease = () => updateQuantity(item.id, item.quantity - 1);
  const handleIncrease = () => updateQuantity(item.id, item.quantity + 1);
  const handleRemove = () => removeItem(item.id);

  return (
    <article className="flex gap-4 py-5">
      <Link
        href={`/produtos/${item.slug}`}
        onClick={onNavigate}
        className="bg-surface focus-visible:ring-primary relative block size-20 shrink-0 overflow-hidden rounded-md focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <Text variant="eyebrow">{item.brand}</Text>
            <Link
              href={`/produtos/${item.slug}`}
              onClick={onNavigate}
              className="hover:text-accent focus-visible:ring-primary block truncate rounded-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <Text variant="h3" as="span" className="text-[13px]">
                {item.name}
              </Text>
            </Link>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            aria-label={`Remover ${item.name} do carrinho`}
            className="text-muted hover:text-foreground focus-visible:ring-primary -mt-1 inline-flex size-7 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <X className="size-3.5" aria-hidden />
          </button>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div
            role="group"
            aria-label={`Quantidade de ${item.name}`}
            className="border-border inline-flex items-center rounded-full border"
          >
            <button
              type="button"
              onClick={handleDecrease}
              aria-label="Diminuir quantidade"
              className="text-foreground hover:bg-foreground/5 focus-visible:ring-primary inline-flex size-8 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <Minus className="size-3.5" aria-hidden />
            </button>
            <span
              aria-live="polite"
              className="text-foreground min-w-6 text-center text-[13px] tabular-nums"
            >
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrease}
              aria-label="Aumentar quantidade"
              className="text-foreground hover:bg-foreground/5 focus-visible:ring-primary inline-flex size-8 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <Plus className="size-3.5" aria-hidden />
            </button>
          </div>
          <Text variant="body" className="text-[13px] tabular-nums">
            {formatBRL(subtotal)}
          </Text>
        </div>
      </div>
    </article>
  );
}
