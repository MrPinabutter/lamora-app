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
      <div className="mx-auto max-w-6xl px-6 py-24 text-center lg:py-28">
        <div className="text-muted mb-12 inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.18em] uppercase lg:mb-16">
          {index ? (
            <>
              <span className="text-foreground tabular-nums">{index}</span>
              <span aria-hidden className="bg-muted-2 h-px w-9" />
            </>
          ) : null}
          <span>{eyebrow}</span>
        </div>
        <ul className="grid grid-cols-2 items-center justify-items-center gap-x-12 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
          {brands.map((brand) => (
            <li key={brand}>
              <span className="text-foreground-soft hover:text-foreground inline-block cursor-default font-serif text-[1.375rem] leading-none tracking-[-0.01em] transition-all hover:-translate-y-0.5">
                {brand}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
