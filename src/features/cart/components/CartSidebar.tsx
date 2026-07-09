"use client";

import { useAppStore } from "@/store";
import { Drawer } from "@/shared/components/organisms/Drawer/Drawer";
import { Text } from "@/shared/components/atoms/Text";
import { CartLineItem } from "./CartLineItem";
import { CartSummary } from "./CartSummary";
import { useCartSync } from "../hooks/useCartSync";
import { useStoreHydrated } from "../hooks/useStoreHydrated";

interface CartSidebarProps {
  storePhone: string;
}

export function CartSidebar({ storePhone }: CartSidebarProps) {
  const isOpen = useAppStore((state) => state.isOpen);
  const items = useAppStore((state) => state.items);
  const close = useAppStore((state) => state.close);
  const hydrated = useStoreHydrated();
  useCartSync();

  const showEmpty = hydrated && items.length === 0;

  return (
    <Drawer open={isOpen} onClose={close} title="Carrinho">
      {showEmpty ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 py-12 text-center">
          <Text variant="eyebrow">Vazio por enquanto</Text>
          <Text variant="body" tone="muted" className="max-w-xs">
            Adicione produtos para enviar seu pedido pelo WhatsApp.
          </Text>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <ul className="divide-border flex-1 divide-y">
            {items.map((item) => (
              <li key={item.id}>
                <CartLineItem item={item} onNavigate={close} />
              </li>
            ))}
          </ul>
          {items.length > 0 ? (
            <div className="pt-6">
              <CartSummary
                items={items}
                storePhone={storePhone}
                onCheckout={close}
              />
            </div>
          ) : null}
        </div>
      )}
    </Drawer>
  );
}
