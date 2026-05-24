import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { ProductGridSkeleton } from "@/features/products";
import { Hero } from "@/shared/components/organisms/Hero";
import {
  Testimonials,
  type Testimonial,
} from "@/shared/components/organisms/Testimonials";
import { FeaturedProducts } from "./_components/FeaturedProducts";
import { PartnerBrands } from "./_components/PartnerBrands";

const TESTIMONIALS: ReadonlyArray<Testimonial> = [
  {
    quote:
      "Encontrei um perfume que combina com o meu jeito mais discreto. A curadoria poupa tempo e acerta no tom.",
    author: "Helena R.",
    role: "Cliente desde 2025",
  },
  {
    quote:
      "Compro o hidratante de karité há meses. Cuidado simples, sem firula, com produtos que entregam o que prometem.",
    author: "Marcos P.",
    role: "Cliente recorrente",
  },
  {
    quote:
      "A entrega veio embalada com capricho e o perfume superou as descrições. Voltarei sempre.",
    author: "Ana L.",
    role: "Primeira compra",
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero
        eyebrow="Perfumaria · curadoria"
        title="Fragrâncias e cuidados, escolhidos com calma."
        description="Uma seleção pensada para o seu ritmo. Crie sua conta para receber lançamentos em primeira mão e salvar suas favoritas."
        actions={
          <>
            <Link
              href="/cadastro"
              className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary focus-visible:ring-offset-background inline-flex h-11 items-center justify-center rounded-full px-6 text-[12px] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Criar conta
            </Link>
            <Link
              href="/produtos"
              className="text-foreground hover:text-accent focus-visible:ring-primary inline-flex items-center gap-2 rounded-sm py-1 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
            >
              Ver catálogo
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </>
        }
      />
      <Suspense
        fallback={
          <section className="border-border border-b">
            <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
              <ProductGridSkeleton />
            </div>
          </section>
        }
      >
        <FeaturedProducts />
      </Suspense>
      <PartnerBrands />
      <Testimonials
        eyebrow="Quem usa, fala"
        title="Recados de quem nos acompanha."
        testimonials={TESTIMONIALS}
      />
    </main>
  );
}
