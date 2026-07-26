import type { CSSProperties } from "react";
import { Text } from "@/shared/components/atoms/Text";

const VALUES = [
  {
    number: "01",
    title: "Honestidade olfativa",
    body: "Descrições reais, sem rótulos vagos. Você sabe o que está sentindo antes de comprar.",
  },
  {
    number: "02",
    title: "Pequenas tiragens",
    body: "Trabalhamos com lotes curtos. Quando entra uma marca, ela cabe na nossa estante.",
  },
  {
    number: "03",
    title: "Conforto antes de tudo",
    body: "Texturas que se acomodam na pele. Fragrâncias que respeitam quem está por perto.",
  },
  {
    number: "04",
    title: "Amostragem generosa",
    body: "Toda compra acompanha uma amostra escolhida a dedo para o seu próximo gesto.",
  },
] as const;

interface ManifestoProps {
  index?: string;
}

export function Manifesto({ index }: ManifestoProps = {}) {
  return (
    <section className="bg-background-2 border-border-soft relative overflow-hidden border-t border-b">
      {index ? (
        <span
          aria-hidden
          className="section-numeral pointer-events-none absolute -top-8 -right-2 select-none text-[10rem] leading-none sm:text-[15rem] lg:text-[24rem]"
        >
          {index}
        </span>
      ) : null}
      <div className="relative mx-auto max-w-6xl px-6 py-28 lg:py-40">
        <div data-reveal className="max-w-4xl">
          <div className="text-muted mb-8 flex items-center gap-3 text-[11px] font-medium tracking-[0.18em] uppercase">
            {index ? (
              <>
                <span className="text-foreground tabular-nums">{index}</span>
                <span aria-hidden className="bg-muted-2 h-px w-9" />
              </>
            ) : null}
            <span>Princípios</span>
          </div>
          <Text
            variant="h1"
            className="font-serif text-[2rem] leading-[1.08] tracking-[-0.02em] text-balance sm:text-[2.75rem] lg:text-[3.75rem]"
          >
            Cuidamos da pele e do olfato como quem{" "}
            <span className="text-accent">prepara um lugar para voltar.</span>
          </Text>
        </div>
        <ul className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {VALUES.map((value, position) => (
            <li
              key={value.number}
              data-reveal
              style={
                { "--reveal-delay": `${position * 90}ms` } as CSSProperties
              }
              className="border-border/70 space-y-3 border-t pt-6"
            >
              <Text
                variant="caption"
                as="span"
                className="text-accent block font-serif text-[1.75rem] leading-none italic"
              >
                {value.number}
              </Text>
              <Text
                variant="h2"
                as="h3"
                className="!mt-5 font-serif text-[1.1875rem] font-medium"
              >
                {value.title}
              </Text>
              <Text
                variant="body"
                className="text-foreground-soft text-[13.5px] leading-relaxed"
              >
                {value.body}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
