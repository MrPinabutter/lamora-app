import { AddToCartButton } from "@/features/cart";
import { ProductGrid } from "@/features/products";
import { getFeaturedProducts } from "@/features/products/services/product.service";
import { FeaturedSection } from "@/shared/components/organisms/FeaturedSection";

interface FeaturedProductsProps {
  index?: string;
}

export async function FeaturedProducts({ index }: FeaturedProductsProps = {}) {
  const products = await getFeaturedProducts(4);

  if (products.length === 0) return null;

  return (
    <FeaturedSection
      index={index}
      eyebrow="Em destaque"
      title="Mais vendidos"
      viewAllHref="/produtos"
    >
      <ProductGrid
        products={products}
        reveal
        renderAction={(product) => {
          const image =
            product.images.find((img) => img.isPrimary) ?? product.images[0];
          return (
            <AddToCartButton
              productId={product.id}
              slug={product.slug}
              name={product.name}
              brand={product.brand}
              price={product.price}
              imageUrl={image?.url}
              stock={product.stock}
              className="w-full"
            />
          );
        }}
      />
    </FeaturedSection>
  );
}
