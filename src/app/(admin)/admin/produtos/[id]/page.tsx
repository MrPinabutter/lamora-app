import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductForm } from "@/features/admin-products";
import type { AdminProductInput } from "@/features/admin-products";
import { getAdminProductById } from "@/features/admin-products/services/admin-product.service";
import { Text } from "@/shared/components/atoms/Text";

export const metadata: Metadata = {
  title: "Editar produto — Admin Lamora",
};

export const dynamic = "force-dynamic";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAdminProductPage({ params }: EditPageProps) {
  const { id } = await params;
  const product = await getAdminProductById(id);
  if (!product) notFound();

  const defaults: AdminProductInput = {
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    price: product.price,
    category: product.category,
    shortDesc: product.shortDesc,
    fullDesc: product.fullDesc,
    stock: product.stock,
    images: product.images.map((image) => ({
      url: image.url,
      position: image.position,
      isPrimary: image.isPrimary,
    })),
    olfactory: product.olfactory.map((note) => ({
      name: note.name,
      tier: note.tier,
      intensity: note.intensity,
    })),
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <Text variant="eyebrow">Catálogo</Text>
        <Text variant="h1" className="text-2xl lg:text-[1.75rem]">
          {product.name}
        </Text>
      </header>
      <ProductForm mode="edit" productId={product.id} defaults={defaults} />
    </div>
  );
}
