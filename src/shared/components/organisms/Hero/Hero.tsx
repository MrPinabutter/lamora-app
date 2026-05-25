import type { ReactNode } from "react";
import { Text } from "@/shared/components/atoms/Text";

interface HeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /**
   * Strip editorial logo abaixo do título — array de rótulos curtos exibidos
   * com middledots entre si (ex.: `["EST. 2026", "Brasil", "Curadoria"]`).
   */
  meta?: ReadonlyArray<string>;
  /** Ações renderizadas abaixo da descrição (ex.: pares de CTA). */
  actions?: ReactNode;
}

export function Hero({
  eyebrow,
  title,
  description,
  meta,
  actions,
}: HeroProps) {
  return (
    <section className="border-border border-b">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 px-6 py-28 text-center lg:py-40">
        <Text variant="eyebrow">{eyebrow}</Text>
        <Text
          variant="display"
          className="max-w-2xl text-balance text-[2rem] leading-[1.05] lg:text-[2.5rem]"
        >
          {title}
        </Text>
        {description ? (
          <Text
            variant="body"
            tone="muted"
            className="max-w-md text-base leading-relaxed"
          >
            {description}
          </Text>
        ) : null}
        {meta && meta.length > 0 ? (
          <ul className="text-muted flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-medium tracking-[0.18em] uppercase tabular-nums">
            {meta.map((item, index) => (
              <li
                key={item}
                className="flex items-center gap-3"
                aria-hidden={index === 0 ? undefined : "true"}
              >
                {index > 0 ? (
                  <span aria-hidden className="bg-border h-px w-3" />
                ) : null}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {actions ? (
          <>
            <span
              aria-hidden
              className="bg-border mt-2 h-px w-12 lg:w-16"
            />
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {actions}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
