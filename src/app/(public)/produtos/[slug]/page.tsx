import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  OlfactoryPyramid,
  ProductGallery,
  ProductShareButton,
} from "@/features/products";
import { getProductBySlug } from "@/features/products/services/product.service";
import { CATEGORY_LABELS } from "@/shared/lib/constants";
import { formatBRL } from "@/shared/lib/utils";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Produto não encontrado — Lamora" };

  return {
    title: `${product.name} — ${product.brand} | Lamora`,
    description: product.shortDesc,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const isPerfume = product.category === "PERFUME";

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <nav className="mb-8 text-sm">
        <Link
          href="/produtos"
          className="text-muted hover:text-accent inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Voltar para produtos
        </Link>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} productName={product.name} />

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-muted text-xs tracking-wide uppercase">
              {product.brand} · {CATEGORY_LABELS[product.category]}
            </p>
            <h1 className="font-serif text-3xl tracking-tight">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold">
              {formatBRL(product.price)}
            </p>
          </div>

          <p className="text-foreground/80 text-sm leading-relaxed">
            {product.fullDesc}
          </p>

          <ProductShareButton
            title={product.name}
            text={`${product.name} — ${product.brand}`}
          />

          {isPerfume ? <OlfactoryPyramid notes={product.olfactory} /> : null}
        </div>
      </div>
    </main>
  );
}
