import type { StateCreator } from "zustand";
import type { CartItem } from "../types/cart.types";

export interface CartSlice {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

export const createCartSlice: StateCreator<
  CartSlice,
  [["zustand/immer", never]],
  [],
  CartSlice
> = (set) => ({
  items: [],
  isOpen: false,
  addItem: (item) =>
    set((state) => {
      if (item.quantity <= 0) return;
      const existing = state.items.find((current) => current.id === item.id);
      if (existing) {
        existing.quantity += item.quantity;
        return;
      }
      state.items.push(item);
    }),
  removeItem: (id) =>
    set((state) => {
      state.items = state.items.filter((item) => item.id !== id);
    }),
  updateQuantity: (id, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
        return;
      }
      const target = state.items.find((item) => item.id === id);
      if (target) target.quantity = quantity;
    }),
  clear: () =>
    set((state) => {
      state.items = [];
    }),
  open: () =>
    set((state) => {
      state.isOpen = true;
    }),
  close: () =>
    set((state) => {
      state.isOpen = false;
    }),
});
