import { ArrowRight, Plus } from "lucide-react";
import { Text } from "@/shared/components/atoms/Text";

interface FaqItem {
  question: string;
  answer: string;
}

const ITEMS: ReadonlyArray<FaqItem> = [
  {
    question: "Como funciona a curadoria de marcas?",
    answer:
      "Toda marca passa por descoberta, provação e acolhida. Apenas produtos que ficamos usando por trinta dias entram no catálogo. Detalhamos o processo na seção Ritual de curadoria.",
  },
  {
    question: "Posso experimentar antes de comprar um perfume?",
    answer:
      "Sim. Oferecemos kits de amostras 2 ml por R$ 29 que dão crédito integral na compra de um frasco maior dentro de 60 dias.",
  },
  {
    question: "Vocês entregam para todo o Brasil?",
    answer:
      "Sim, com frete grátis a partir de R$ 350. Pedidos saem da nossa unidade em São Paulo em até 48h úteis e a embalagem é pensada para viajar sem amassar.",
  },
  {
    question: "Os produtos são testados em animais?",
    answer:
      "Não. Trabalhamos apenas com marcas cruelty-free e damos preferência a fórmulas veganas — o ícone aparece em cada ficha de produto.",
  },
  {
    question: "Como funciona a troca ou devolução?",
    answer:
      "Você tem 30 dias para trocar. Se o produto foi aberto, pedimos que tenha menos de 30% do conteúdo usado — o resto a gente resolve por e-mail, sem complicar.",
  },
];

export function Faq() {
  return (
    <section className="bg-background-2 border-border-soft border-t">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
          <div>
            <div className="text-muted mb-6 flex items-center gap-3 text-[11px] font-medium tracking-[0.18em] uppercase">
              <span className="text-foreground tabular-nums">08</span>
              <span aria-hidden className="bg-muted-2 h-px w-9" />
              <span>Perguntas</span>
            </div>
            <Text
              variant="h1"
              className="font-serif text-[2rem] tracking-[-0.02em] lg:text-[2.5rem] lg:leading-[1.12]"
            >
              Tudo que costumam{" "}
              <em className="text-muted italic">nos perguntar.</em>
            </Text>
            <Text
              variant="body"
              tone="muted"
              className="mt-6 max-w-xs text-sm leading-relaxed"
            >
              Quase tudo tem resposta aqui. Se faltar alguma, escreva —
              respondemos pessoalmente em até um dia útil.
            </Text>
            <a
              href="mailto:ola@lamora.com.br"
              className="text-foreground hover:text-accent focus-visible:ring-primary group mt-8 inline-flex items-center gap-2 rounded-sm py-1 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
            >
              Falar com a gente
              <ArrowRight
                className="size-3.5 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </a>
          </div>

          <div className="border-border border-t">
            {ITEMS.map((item, index) => (
              <details
                key={item.question}
                open={index === 0}
                className="border-border group border-b"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-left">
                  <Text
                    variant="h2"
                    as="span"
                    className="font-serif text-[1.25rem] font-normal tracking-[-0.005em]"
                  >
                    {item.question}
                  </Text>
                  <Plus
                    className="text-foreground size-5 shrink-0 transition-transform duration-300 group-open:rotate-45"
                    aria-hidden
                  />
                </summary>
                <Text
                  variant="body"
                  className="text-foreground-soft max-w-xl pb-7 text-[13.5px] leading-[1.7]"
                >
                  {item.answer}
                </Text>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
