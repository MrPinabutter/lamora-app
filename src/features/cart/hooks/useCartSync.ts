"use client";

import { useEffect, useRef } from "react";
import { getCartProductsAction } from "@/server/actions/cart.actions";
import { useAppStore } from "@/store";
import { useStoreHydrated } from "./useStoreHydrated";

export function useCartSync() {
  const isOpen = useAppStore((state) => state.isOpen);
  const syncItems = useAppStore((state) => state.syncItems);
  const hydrated = useStoreHydrated();
  const syncing = useRef(false);

  useEffect(() => {
    if (!isOpen || !hydrated || syncing.current) return;

    const ids = useAppStore.getState().items.map((item) => item.id);
    if (ids.length === 0) return;

    syncing.current = true;
    getCartProductsAction(ids)
      .then(syncItems)
      .catch(() => {})
      .finally(() => {
        syncing.current = false;
      });
  }, [isOpen, hydrated, syncItems]);
}
