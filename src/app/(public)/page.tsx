import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  getFeaturedFragrance,
  getFeaturedProducts,
  getProductBrands,
} from "@/features/products/services/product.service";
import { readSession } from "@/server/auth/session";
import {
  Disciplines,
  type Discipline,
} from "@/shared/components/organisms/Disciplines";
import { ScrollReveal } from "@/shared/components/atoms/ScrollReveal";
import { Hero } from "@/shared/components/organisms/Hero";
import {
  Testimonials,
  type Testimonial,
} from "@/shared/components/organisms/Testimonials";
import { Faq } from "./_components/Faq";
import { FeaturedFragrance } from "./_components/FeaturedFragrance";
import { FeaturedProducts } from "./_components/FeaturedProducts";
import { Manifesto } from "./_components/Manifesto";
import { NewsletterCTA } from "./_components/NewsletterCTA";
import { PartnerBrands } from "./_components/PartnerBrands";
import { RitualSteps } from "./_components/RitualSteps";
import { ScentCompass } from "./_components/ScentCompass";

const HERO_META = ["Est. 2026", "Brasil", "Curadoria Independente"] as const;

const DISCIPLINES: ReadonlyArray<Discipline> = [
  {
    label: "Perfumes",
    description:
      "Eaux de parfum e cologne com pirâmide olfativa completa — do topo ao fundo.",
  },
  {
    label: "Hidratantes",
    description:
      "Cremes e loções para nutrir o corpo todos os dias, sem peso e sem perfume excessivo.",
  },
  {
    label: "Esfoliantes",
    description:
      "Renovação delicada com texturas que cabem na rotina do banho.",
  },
  {
    label: "Skin care",
    description:
      "Sérums, limpadores e tratamentos para o rosto — fórmulas honestas e direto ao ponto.",
  },
];

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

type SectionKey =
  | "top-sales"
  | "disciplines"
  | "fragrance"
  | "compass"
  | "principles"
  | "ritual"
  | "brands"
  | "testimonials"
  | "newsletter"
  | "faq";

export default async function HomePage() {
  const [featuredProducts, featuredFragrance, brands] = await Promise.all([
    getFeaturedProducts(4),
    getFeaturedFragrance(),
    getProductBrands(),
  ]);
  const session = await readSession();

  const visibleSections: ReadonlyArray<SectionKey> = (
    [
      featuredProducts.length > 0 ? "top-sales" : null,
      "disciplines",
      featuredFragrance ? "fragrance" : null,
      "compass",
      "principles",
      "ritual",
      brands.length > 0 ? "brands" : null,
      "testimonials",
      "newsletter",
      "faq",
    ] as ReadonlyArray<SectionKey | null>
  ).filter((key): key is SectionKey => key !== null);

  const indexFor = (key: SectionKey): string | undefined => {
    const position = visibleSections.indexOf(key);
    return position === -1 ? undefined : String(position + 1).padStart(2, "0");
  };

  const primaryCtaClass =
    "bg-wood-foreground text-wood hover:bg-[#3d2818] focus-visible:ring-ember focus-visible:ring-offset-wood inline-flex h-13 items-center justify-center rounded-full px-10 text-[12px] font-medium tracking-[0.2em] uppercase shadow-[0_16px_48px_-18px_rgba(43,28,16,0.35)] transition-all duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none";
  const secondaryCtaClass =
    "text-wood-foreground hover:text-ember focus-visible:ring-ember group inline-flex items-center gap-2 rounded-sm py-1 text-[12px] font-medium tracking-[0.2em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none";

  const heroActions = session ? (
    <>
      <Link href="/perfil" className={primaryCtaClass}>
        Meu perfil
      </Link>
      <Link href="/produtos" className={secondaryCtaClass}>
        Ver Catálogo
        <ArrowRight
          className="size-3.5 transition-transform group-hover:translate-x-1"
          aria-hidden
        />
      </Link>
    </>
  ) : (
    <>
      <Link href="/cadastro" className={primaryCtaClass}>
        Criar conta
      </Link>
      <Link href="/produtos" className={secondaryCtaClass}>
        Ver Catálogo
        <ArrowRight
          className="size-3.5 transition-transform group-hover:translate-x-1"
          aria-hidden
        />
      </Link>
    </>
  );

  return (
    <main className="page-texture relative isolate flex flex-1 flex-col overflow-hidden">
      <Hero
        variant="wood"
        eyebrow="Perfumaria · Curadoria"
        title={
          <>
            Fragrâncias e cuidados,
            <br />
            <em className="text-ember/95 font-normal italic">
              escolhidos com calma.
            </em>
          </>
        }
        description="Uma seleção pensada para o seu ritmo. Crie sua conta para receber lançamentos em primeira mão e salvar suas favoritas."
        meta={HERO_META}
        actions={heroActions}
        scrollHint="Role para descobrir"
      />
      {featuredProducts.length > 0 ? (
        <FeaturedProducts index={indexFor("top-sales")} />
      ) : null}
      <Disciplines
        index={indexFor("disciplines")}
        eyebrow="Disciplinas"
        title="O que cuidamos por aqui."
        disciplines={DISCIPLINES}
      />
      {featuredFragrance ? (
        <FeaturedFragrance index={indexFor("fragrance")} />
      ) : null}
      <ScentCompass index={indexFor("compass")} />
      <Manifesto index={indexFor("principles")} />
      <RitualSteps index={indexFor("ritual")} />
      {brands.length > 0 ? <PartnerBrands index={indexFor("brands")} /> : null}
      <Testimonials
        index={indexFor("testimonials")}
        eyebrow="Quem usa, fala"
        title="Recados de quem nos acompanha."
        testimonials={TESTIMONIALS}
      />
      <NewsletterCTA index={indexFor("newsletter")} />
      <Faq index={indexFor("faq")} />
      <ScrollReveal />
    </main>
  );
}
