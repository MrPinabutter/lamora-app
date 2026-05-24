import type { ReactNode } from "react";
import { Text } from "@/shared/components/atoms/Text";

interface HeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Ações renderizadas abaixo da descrição (ex.: pares de CTA). */
  actions?: ReactNode;
}

export function Hero({ eyebrow, title, description, actions }: HeroProps) {
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
        {actions ? (
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {actions}
          </div>
        ) : null}
      </div>
    </section>
  );
}
