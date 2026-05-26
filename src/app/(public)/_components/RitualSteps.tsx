import { Check, Plus, Search } from "lucide-react";
import type { ReactNode } from "react";
import { Text } from "@/shared/components/atoms/Text";

interface Step {
  numeral: string;
  title: string;
  body: string;
  icon: ReactNode;
}

const STEPS: ReadonlyArray<Step> = [
  {
    numeral: "I",
    title: "Descoberta",
    body: "Encontramos a marca pelo cheiro, pela conversa, pela curiosidade. Nada chega por algoritmo.",
    icon: <Search className="size-3.5" aria-hidden />,
  },
  {
    numeral: "II",
    title: "Provação",
    body: "Usamos cada produto por trinta dias, em peles diferentes, em estações diferentes. Anotamos tudo.",
    icon: <Plus className="size-3.5" aria-hidden />,
  },
  {
    numeral: "III",
    title: "Acolhida",
    body: "Se o produto melhora a rotina sem pedir nada em troca, ele entra. Senão, devolvemos com gratidão.",
    icon: <Check className="size-3.5" aria-hidden />,
  },
];

interface RitualStepsProps {
  index?: string;
}

export function RitualSteps({ index }: RitualStepsProps = {}) {
  return (
    <section className="bg-background-2 border-border-soft border-t border-b">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <header className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-md space-y-6">
            <div className="text-muted flex items-center gap-3 text-[11px] font-medium tracking-[0.18em] uppercase">
              {index ? (
                <>
                  <span className="text-foreground tabular-nums">{index}</span>
                  <span aria-hidden className="bg-muted-2 h-px w-9" />
                </>
              ) : null}
              <span>Ritual de curadoria</span>
            </div>
            <Text
              variant="h1"
              className="font-serif text-3xl tracking-[-0.02em] lg:text-[2.875rem] lg:leading-[1.1]"
            >
              Como uma marca{" "}
              <em className="text-muted italic">chega à estante.</em>
            </Text>
          </div>
          <Text
            variant="body"
            tone="muted"
            className="max-w-sm text-sm leading-relaxed"
          >
            Três passos lentos. Recusamos mais marcas do que aceitamos — é o
            que mantém o catálogo enxuto.
          </Text>
        </header>

        <ol className="border-border grid border-t md:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.numeral}
              className="border-border relative space-y-3 p-10 md:border-r md:last:border-r-0 lg:p-12"
            >
              <span className="border-border text-muted absolute top-10 right-10 inline-grid size-9 place-items-center rounded-full border lg:top-12 lg:right-12">
                {step.icon}
              </span>
              <Text
                variant="display"
                as="span"
                className="block font-serif text-[5.5rem] leading-none font-light tracking-[-0.04em]"
              >
                {step.numeral}
              </Text>
              <Text
                variant="h2"
                as="h3"
                className="!mt-10 font-serif text-[1.5rem] font-normal"
              >
                {step.title}
              </Text>
              <Text
                variant="body"
                className="text-foreground-soft max-w-xs text-[13.5px] leading-[1.7]"
              >
                {step.body}
              </Text>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
