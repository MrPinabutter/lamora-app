"use client";

import { useSyncExternalStore } from "react";
import { useAppStore } from "@/store";

function subscribeHydration(onChange: () => void) {
  return useAppStore.persist.onFinishHydration(onChange);
}

function getClientSnapshot() {
  return useAppStore.persist.hasHydrated();
}

function getServerSnapshot() {
  return false;
}

/**
 * Retorna `true` quando o estado persistido do store já foi reidratado do
 * localStorage. Use para evitar mismatch de SSR: renderize valores derivados
 * de estado persistido apenas após `hydrated`.
 */
export function useStoreHydrated(): boolean {
  return useSyncExternalStore(
    subscribeHydration,
    getClientSnapshot,
    getServerSnapshot,
  );
}
