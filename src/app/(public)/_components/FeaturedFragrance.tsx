import Image from "next/image";
import { AddToCartButton } from "@/features/cart";
import { getFeaturedFragrance } from "@/features/products/services/product.service";
import type { NoteTier, OlfactoryNote } from "@/features/products";
import { Text } from "@/shared/components/atoms/Text";
import { formatBRL } from "@/shared/lib/utils";

const TIER_LABELS: Record<NoteTier, string> = {
  TOPO: "Topo",
  CORACAO: "Coração",
  FUNDO: "Fundo",
};

function joinNotes(notes: ReadonlyArray<OlfactoryNote>): string {
  return notes.map((note) => note.name.toLowerCase()).join(", ");
}

interface FeaturedFragranceProps {
  index?: string;
}

export async function FeaturedFragrance({
  index,
}: FeaturedFragranceProps = {}) {
  const fragrance = await getFeaturedFragrance();
  if (!fragrance) return null;

  const primary =
    fragrance.images.find((image) => image.isPrimary) ?? fragrance.images[0];

  // Agrupa notas pelos três níveis da pirâmide, mantendo apenas os que
  // tiverem entradas. Sem essa filtragem, a coluna mostraria "—" para
  // perfumes que não usem alguma das camadas.
  const tiers = (
    Object.entries(TIER_LABELS) as ReadonlyArray<[NoteTier, string]>
  )
    .map(([key, label]) => ({
      key,
      label,
      notes: fragrance.olfactory.filter((note) => note.tier === key),
    }))
    .filter((tier) => tier.notes.length > 0);

  return (
    <section className="bg-background-2 border-border-soft border-t border-b">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="grid items-stretch gap-16 lg:grid-cols-2 lg:gap-24">
          <div
            data-reveal
            className="bg-surface-2 group relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[640px]"
          >
            {primary ? (
              <Image
                src={primary.url}
                alt={fragrance.name}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
            ) : null}
            {index ? (
              <span className="text-foreground/60 absolute top-6 left-6 text-[10px] tracking-[0.22em] uppercase">
                No. {index}
              </span>
            ) : null}
            <span className="text-foreground/60 absolute top-6 right-6 text-[10px] tracking-[0.22em] uppercase">
              Eau de Parfum
            </span>
            <span className="absolute right-6 bottom-6 text-[10px] tracking-[0.22em] text-amber-100/60 uppercase">
              Lamora · BR
            </span>
          </div>

          <div
            data-reveal
            className="flex flex-col justify-center [--reveal-delay:140ms]"
          >
            <div className="text-muted flex items-center gap-3 text-[11px] font-medium tracking-[0.18em] uppercase">
              {index ? (
                <>
                  <span className="text-foreground tabular-nums">{index}</span>
                  <span aria-hidden className="bg-muted-2 h-px w-9" />
                </>
              ) : null}
              <span className="text-foreground">Aroma do mês</span>
            </div>

            <Text
              variant="caption"
              as="p"
              className="text-muted mt-7 text-[11px] tracking-[0.22em] uppercase"
            >
              {fragrance.brand}
            </Text>

            <Text
              variant="h1"
              className="mt-5 font-serif text-[2.25rem] leading-[1.06] tracking-[-0.02em] lg:text-[3rem]"
            >
              {fragrance.name.split(" ")[0]}
              <br />
              <em className="text-muted italic">
                {fragrance.name.split(" ").slice(1).join(" ") ||
                  fragrance.shortDesc.split(",")[0]}
                .
              </em>
            </Text>

            <Text
              variant="body"
              className="text-foreground-soft mt-5 max-w-md text-sm leading-[1.75]"
            >
              {fragrance.fullDesc}
            </Text>

            {tiers.length > 0 ? (
              <dl className="border-border mt-10 border-t">
                {tiers.map((tier) => (
                  <div
                    key={tier.key}
                    className="border-border-soft grid grid-cols-[120px_1fr] gap-8 border-b py-5 last:border-b-0"
                  >
                    <dt className="text-muted text-[11px] font-medium tracking-[0.18em] uppercase">
                      {tier.label}
                    </dt>
                    <dd className="text-foreground font-serif text-[15px] italic">
                      {joinNotes(tier.notes)}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <div className="text-muted mt-10 flex flex-wrap items-end gap-x-10 gap-y-4 text-[11px] tracking-[0.14em] uppercase">
              <span className="flex flex-col gap-1">
                <strong className="text-foreground font-medium">
                  Concentração
                </strong>
                Eau de Parfum
              </span>
              <span className="flex flex-col gap-1">
                <strong className="text-foreground font-medium">Volume</strong>
                50 ml
              </span>
              <span className="flex flex-col gap-1">
                <strong className="text-foreground font-medium">
                  Curadoria
                </strong>
                Lamora
              </span>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <span className="font-serif text-[1.75rem] leading-none">
                {formatBRL(fragrance.price)}
              </span>
              <AddToCartButton
                productId={fragrance.id}
                slug={fragrance.slug}
                name={fragrance.name}
                brand={fragrance.brand}
                price={fragrance.price}
                imageUrl={primary?.url}
                stock={fragrance.stock}
                variant="primary"
                size="md"
                label="Adicionar à sacola"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
