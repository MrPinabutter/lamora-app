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

export function Manifesto() {
  return (
    <section className="bg-background-2 border-border-soft border-t border-b">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <Text
              variant="eyebrow"
              as="span"
              className="mb-5 block text-[11px] tracking-[0.18em]"
            >
              — Princípios
            </Text>
            <Text
              variant="h1"
              className="font-serif text-[1.875rem] leading-[1.18] tracking-[-0.015em] lg:text-[2.125rem]"
            >
              Cuidamos da pele e do olfato{" "}
              <em className="text-muted italic">
                como quem prepara um lugar para voltar.
              </em>
            </Text>
          </div>
          <ul className="grid gap-x-14 gap-y-12 pt-2 sm:grid-cols-2">
            {VALUES.map((value) => (
              <li key={value.number} className="space-y-2">
                <Text
                  variant="caption"
                  as="span"
                  className="text-muted mb-2 block text-[11px] tracking-[0.18em] tabular-nums uppercase"
                >
                  {value.number}
                </Text>
                <Text
                  variant="h2"
                  as="h3"
                  className="font-serif text-[1.125rem] font-medium"
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
      </div>
    </section>
  );
}
