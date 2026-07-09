"use server";

import type { CartProductSnapshot } from "@/features/cart/types/cart.types";
import { getProductsByIds } from "@/features/products/services/product.service";

// Limite defensivo para chamadas diretas ao endpoint; um carrinho real
// nunca chega perto disso.
const MAX_IDS = 100;

/**
 * Retorna os dados atuais de catálogo dos produtos informados. Produtos que
 * não existem mais simplesmente não aparecem no retorno. Dados públicos
 * (os mesmos das páginas de produto) — não exige sessão.
 */
export async function getCartProductsAction(
  ids: string[],
): Promise<CartProductSnapshot[]> {
  const unique = [...new Set(ids)]
    .filter((id): id is string => typeof id === "string")
    .slice(0, MAX_IDS);

  const products = await getProductsByIds(unique);

  return products.map((product) => {
    const image =
      product.images.find((img) => img.isPrimary) ?? product.images[0];
    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      price: product.price,
      imageUrl: image?.url,
    };
  });
}
