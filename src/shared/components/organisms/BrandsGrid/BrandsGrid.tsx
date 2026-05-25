import { Text } from "@/shared/components/atoms/Text";

interface BrandsGridProps {
  eyebrow: string;
  brands: ReadonlyArray<string>;
  /** Marcador editorial (ex.: `"03"`). */
  index?: string;
}

export function BrandsGrid({ eyebrow, brands, index }: BrandsGridProps) {
  if (brands.length === 0) return null;

  return (
    <section className="border-border border-b">
      <div className="mx-auto max-w-6xl px-6 py-24 text-center lg:py-28">
        <div className="text-muted mb-14 inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.14em] uppercase lg:mb-16">
          {index ? (
            <>
              <span className="text-foreground tabular-nums">{index}</span>
              <span aria-hidden className="bg-border h-px w-6" />
            </>
          ) : null}
          <span>{eyebrow}</span>
        </div>
        <ul className="grid grid-cols-2 items-center justify-items-center gap-x-12 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
          {brands.map((brand) => (
            <li key={brand}>
              <Text
                variant="h2"
                as="span"
                tone="muted"
                className="font-serif text-base tracking-[0.04em]"
              >
                {brand}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
