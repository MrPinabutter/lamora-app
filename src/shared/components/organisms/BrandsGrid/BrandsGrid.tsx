import type { CSSProperties } from "react";
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
    <section className="border-border-soft border-t border-b">
      <div className="mx-auto max-w-6xl px-6 py-24 text-center lg:py-32">
        <div
          data-reveal
          className="text-muted mb-6 inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.18em] uppercase"
        >
          {index ? (
            <>
              <span className="text-foreground tabular-nums">{index}</span>
              <span aria-hidden className="bg-muted-2 h-px w-9" />
            </>
          ) : null}
          <span>{eyebrow}</span>
        </div>
        <Text
          data-reveal
          variant="h1"
          className="mx-auto max-w-2xl font-serif text-[1.875rem] tracking-[-0.02em] text-balance lg:text-[2.75rem] lg:leading-[1.1]"
          style={{ "--reveal-delay": "80ms" } as CSSProperties}
        >
          Marcas que dividem a estante{" "}
          <em className="text-accent italic">conosco.</em>
        </Text>

        <ul className="mx-auto mt-16 flex max-w-4xl flex-wrap items-center justify-center gap-x-14 gap-y-8 lg:mt-20 lg:gap-x-20">
          {brands.map((brand, position) => (
            <li
              key={brand}
              data-reveal
              style={
                { "--reveal-delay": `${position * 80}ms` } as CSSProperties
              }
            >
              <span className="text-foreground-soft hover:text-accent inline-block cursor-default font-serif text-[1.75rem] leading-none tracking-[-0.01em] transition-all duration-300 hover:-translate-y-0.5 lg:text-[2.25rem]">
                {brand}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
