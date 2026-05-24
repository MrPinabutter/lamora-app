"use client";

import { useAppStore } from "@/store";
import { Text } from "@/shared/components/atoms/Text";
import { formatBRL } from "@/shared/lib/utils";
import {
  buildWhatsappUrl,
  cartSubtotal,
} from "../lib/whatsapp-message";
import type { CartItem } from "../types/cart.types";

interface CartSummaryProps {
  items: CartItem[];
  storePhone: string;
  /** Chamado após o usuário acionar o envio para o WhatsApp. */
  onCheckout?: () => void;
}

export function CartSummary({ items, storePhone, onCheckout }: CartSummaryProps) {
  const clear = useAppStore((state) => state.clear);

  const total = cartSubtotal(items);
  const href = buildWhatsappUrl({ items, phone: storePhone });

  const handleCheckout = () => {
    onCheckout?.();
  };

  return (
    <div className="space-y-5">
      <div className="border-border flex items-baseline justify-between gap-4 border-t pt-5">
        <Text variant="eyebrow">Total</Text>
        <Text variant="lead" as="p" className="font-serif text-xl tabular-nums">
          {formatBRL(total)}
        </Text>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        onClick={handleCheckout}
        className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary focus-visible:ring-offset-background inline-flex h-11 w-full items-center justify-center rounded-full px-5 text-[12px] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        Finalizar via WhatsApp
      </a>

      <button
        type="button"
        onClick={clear}
        className="text-muted hover:text-foreground focus-visible:ring-primary inline-flex w-full justify-center rounded-sm py-1 text-[11px] font-medium tracking-[0.14em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
      >
        Esvaziar carrinho
      </button>
    </div>
  );
}
