import type { StateCreator } from "zustand";
import type { CartItem, CartProductSnapshot } from "../types/cart.types";

export interface CartSlice {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  syncItems: (products: CartProductSnapshot[]) => void;
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
        const { quantity, ...snapshot } = item;
        Object.assign(existing, snapshot);
        existing.quantity += quantity;
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
  syncItems: (products) =>
    set((state) => {
      const freshById = new Map(
        products.map((product) => [product.id, product]),
      );
      state.items = state.items.flatMap((item) => {
        const fresh = freshById.get(item.id);
        if (!fresh) return [];
        return [{ ...fresh, quantity: item.quantity }];
      });
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
