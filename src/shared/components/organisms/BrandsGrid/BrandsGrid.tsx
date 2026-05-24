import { Text } from "@/shared/components/atoms/Text";

interface BrandsGridProps {
  eyebrow: string;
  brands: ReadonlyArray<string>;
}

export function BrandsGrid({ eyebrow, brands }: BrandsGridProps) {
  if (brands.length === 0) return null;

  return (
    <section className="border-border border-b">
      <div className="mx-auto max-w-6xl px-6 py-24 text-center lg:py-28">
        <Text variant="eyebrow" className="mb-14 lg:mb-16">
          {eyebrow}
        </Text>
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
