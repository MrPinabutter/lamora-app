import { getProductBrands } from "@/features/products/services/product.service";
import { BrandsGrid } from "@/shared/components/organisms/BrandsGrid";

export async function PartnerBrands() {
  const brands = await getProductBrands();

  return <BrandsGrid eyebrow="Marcas parceiras" brands={brands} />;
}
