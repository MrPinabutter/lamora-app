export interface CartItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

export type CartProductSnapshot = Omit<CartItem, "quantity">;
