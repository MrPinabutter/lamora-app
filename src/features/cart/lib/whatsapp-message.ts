import { formatBRL } from "@/shared/lib/utils";
import type { CartItem } from "../types/cart.types";

interface BuildOptions {
  items: CartItem[];
  phone: string;
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function buildWhatsappMessage(items: CartItem[]): string {
  const lines = items.map(
    (item) =>
      `• ${item.quantity}x ${item.name} — ${formatBRL(item.price * item.quantity)}`,
  );
  return [
    "Olá! Gostaria de finalizar o pedido:",
    "",
    ...lines,
    "",
    `Total: ${formatBRL(cartSubtotal(items))}`,
  ].join("\n");
}

export function buildWhatsappUrl({ items, phone }: BuildOptions): string {
  const text = buildWhatsappMessage(items);
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
