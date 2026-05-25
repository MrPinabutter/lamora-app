import type { Metadata } from "next";
import { ProductForm } from "@/features/admin-products";
import type { AdminProductInput } from "@/features/admin-products";
import { Text } from "@/shared/components/atoms/Text";

export const metadata: Metadata = {
  title: "Novo produto — Admin Lamora",
};

const EMPTY_PRODUCT: AdminProductInput = {
  slug: "",
  name: "",
  brand: "",
  price: 0,
  category: "PERFUME",
  shortDesc: "",
  fullDesc: "",
  stock: 0,
  images: [],
  olfactory: [],
};

export default function NewAdminProductPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <Text variant="eyebrow">Catálogo</Text>
        <Text variant="h1" className="text-2xl lg:text-[1.75rem]">
          Novo produto
        </Text>
      </header>
      <ProductForm mode="create" defaults={EMPTY_PRODUCT} />
    </div>
  );
}
