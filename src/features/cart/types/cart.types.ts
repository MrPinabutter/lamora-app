export interface CartItem {
  /** Identificador do produto (mesmo `Product.id`). */
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}
