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
import { Text } from "@/shared/components/atoms/Text";
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

function stockNote(stock: number): {
  label: string;
  tone: "muted" | "accent";
} | null {
  if (stock <= 0) return { label: "Esgotado", tone: "muted" };
  if (stock < 5) return { label: `Últimas ${stock} unidades`, tone: "accent" };
  return null;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const isPerfume = product.category === "PERFUME";
  const stock = stockNote(product.stock);
  const brandHref = `/produtos?brand=${encodeURIComponent(product.brand)}`;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 pt-8 pb-20">
      <nav className="mb-10">
        <Link
          href="/produtos"
          className="text-muted hover:text-foreground focus-visible:ring-primary inline-flex items-center gap-2 rounded-sm py-1 text-[11px] font-medium tracking-[0.14em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          Voltar para produtos
        </Link>
      </nav>

      <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <ProductGallery images={product.images} productName={product.name} />

        <div className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <header className="space-y-3">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <Link
                href={brandHref}
                className="hover:text-foreground focus-visible:ring-primary rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
              >
                <Text variant="eyebrow" as="span">
                  {product.brand}
                </Text>
              </Link>
              <Text variant="eyebrow" as="span" aria-hidden>
                ·
              </Text>
              <Text variant="eyebrow" as="span">
                {CATEGORY_LABELS[product.category]}
              </Text>
            </div>
            <Text variant="h1">{product.name}</Text>
            {product.shortDesc ? (
              <Text variant="body" tone="muted" className="max-w-prose">
                {product.shortDesc}
              </Text>
            ) : null}
          </header>

          <div className="border-border flex items-baseline justify-between gap-4 border-y py-5">
            <Text variant="lead" as="p" className="font-semibold">
              {formatBRL(product.price)}
            </Text>
            {stock ? (
              <Text variant="caption" tone={stock.tone}>
                {stock.label}
              </Text>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <ProductShareButton
              title={product.name}
              text={`${product.name} — ${product.brand}`}
            />
          </div>

          {product.fullDesc ? (
            <section className="space-y-3">
              <Text variant="h3" as="h2">
                Sobre a fragrância
              </Text>
              <Text variant="body" tone="muted" className="max-w-prose">
                {product.fullDesc}
              </Text>
            </section>
          ) : null}

          {isPerfume && product.olfactory.length > 0 ? (
            <div className="border-border border-t pt-8">
              <OlfactoryPyramid notes={product.olfactory} />
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
