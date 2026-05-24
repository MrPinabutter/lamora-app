"use client";

import { ShoppingBag } from "lucide-react";

interface CartIconButtonProps {
  /** Quantidade total de itens. Use `0` para esconder a badge. */
  count: number;
  onClick: () => void;
}

export function CartIconButton({ count, onClick }: CartIconButtonProps) {
  const label =
    count > 0 ? `Abrir carrinho (${count} itens)` : "Abrir carrinho";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="text-foreground hover:text-accent focus-visible:ring-primary relative -mr-2 inline-flex size-9 cursor-pointer items-center justify-center rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
    >
      <ShoppingBag className="size-4" aria-hidden />
      {count > 0 ? (
        <span
          aria-hidden
          className="bg-accent text-accent-foreground absolute -top-0.5 -right-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-medium tabular-nums"
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}
