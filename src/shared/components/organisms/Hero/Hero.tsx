import type { ReactNode } from "react";
import { Text } from "@/shared/components/atoms/Text";

interface HeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /**
   * Linha editorial abaixo da descrição. Itens são intercalados com um traço
   * curto (ex.: `["EST. 2026", "Brasil", "Curadoria"]`).
   */
  meta?: ReadonlyArray<string>;
  /** Ações renderizadas após o filete vertical (ex.: par de CTAs). */
  actions?: ReactNode;
  /** Texto curto do indicador de scroll exibido ao final do hero. */
  scrollHint?: string;
}

export function Hero({
  eyebrow,
  title,
  description,
  meta,
  actions,
  scrollHint,
}: HeroProps) {
  return (
    <section className="border-border-soft border-b">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 pt-24 pb-20 text-center lg:pt-36 lg:pb-28">
        <Text variant="eyebrow">{eyebrow}</Text>
        <Text
          variant="display"
          className="mt-9 max-w-3xl font-serif text-[2.25rem] leading-[1.06] tracking-[-0.02em] text-balance lg:text-[3.5rem]"
        >
          {title}
        </Text>
        {description ? (
          <Text
            variant="body"
            tone="muted"
            className="mt-8 max-w-md text-[15px] leading-relaxed"
          >
            {description}
          </Text>
        ) : null}
        {meta && meta.length > 0 ? (
          <ul className="text-muted mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-medium tracking-[0.18em] uppercase tabular-nums">
            {meta.map((item, index) => (
              <li key={item} className="flex items-center gap-3">
                {index > 0 ? (
                  <span aria-hidden className="bg-muted-2 h-px w-6" />
                ) : null}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {actions ? (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {actions}
          </div>
        ) : null}
        {scrollHint ? (
          <div className="text-muted mt-20 flex flex-col items-center gap-3 lg:mt-24">
            <Text
              variant="caption"
              as="span"
              className="text-[10px] tracking-[0.18em] uppercase"
            >
              {scrollHint}
            </Text>
            <span
              aria-hidden
              className="bg-muted-2 relative h-11 w-px overflow-hidden"
            >
              <span className="bg-foreground absolute top-0 left-0 h-full w-full [transform:translateY(-100%)] animate-[scrollHint_2.4s_ease-in-out_infinite]" />
            </span>
          </div>
        ) : null}
      </div>
      <style>{`@keyframes scrollHint { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }`}</style>
    </section>
  );
}
