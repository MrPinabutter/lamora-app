import type { Metadata } from "next";
import Link from "next/link";
import { AdminProductList } from "@/features/admin-products";
import { listAdminProducts } from "@/features/admin-products/services/admin-product.service";
import { Text } from "@/shared/components/atoms/Text";

export const metadata: Metadata = {
  title: "Produtos — Admin Lamora",
};

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await listAdminProducts();

  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between gap-6">
        <div className="space-y-2">
          <Text variant="eyebrow">Catálogo</Text>
          <Text variant="h1" className="text-2xl lg:text-[1.75rem]">
            Produtos
          </Text>
        </div>
        <Link
          href="/admin/produtos/novo"
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary focus-visible:ring-offset-background inline-flex h-11 items-center rounded-full px-5 text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Novo produto
        </Link>
      </header>
      <AdminProductList products={products} />
    </div>
  );
}
