"use client";

import { useAppStore } from "@/store";
import { useStoreHydrated } from "@/features/cart";
import { CartIconButton } from "@/shared/components/molecules/CartIconButton";

export function CartButton() {
  const open = useAppStore((state) => state.open);
  const items = useAppStore((state) => state.items);
  const hydrated = useStoreHydrated();

  const count = hydrated
    ? items.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  return <CartIconButton count={count} onClick={open} />;
}
