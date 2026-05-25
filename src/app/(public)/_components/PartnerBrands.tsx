import { getProductBrands } from "@/features/products/services/product.service";
import { BrandsGrid } from "@/shared/components/organisms/BrandsGrid";

interface PartnerBrandsProps {
  index?: string;
}

export async function PartnerBrands({ index }: PartnerBrandsProps = {}) {
  const brands = await getProductBrands();

  return <BrandsGrid index={index} eyebrow="Marcas parceiras" brands={brands} />;
}
