import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  createCartSlice,
  type CartSlice,
} from "@/features/cart/store/cart.slice";

export type AppStore = CartSlice;

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      immer((...args) => ({
        ...createCartSlice(...args),
      })),
      {
        name: "lamora-cart",
        // Apenas itens persistem. `isOpen` reinicia em cada carga.
        partialize: (state) => ({ items: state.items }),
      },
    ),
    { name: "lamora-store" },
  ),
);
