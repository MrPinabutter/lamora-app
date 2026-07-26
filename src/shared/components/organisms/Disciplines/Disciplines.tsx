import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { Text } from "@/shared/components/atoms/Text";

export interface Discipline {
  label: string;
  description: string;
}

interface DisciplinesProps {
  eyebrow: string;
  title: string;
  disciplines: ReadonlyArray<Discipline>;
  /** Marcador editorial (ex.: `"01"`). */
  index?: string;
}

export function Disciplines({
  eyebrow,
  title,
  disciplines,
  index,
}: DisciplinesProps) {
  return (
    <section className="border-border-soft border-b">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <header
          data-reveal
          className="mb-14 flex flex-col gap-8 lg:mb-20 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
        >
          <div className="max-w-md space-y-6">
            <div className="text-muted flex items-center gap-3 text-[11px] font-medium tracking-[0.18em] uppercase">
              {index ? (
                <>
                  <span className="text-foreground tabular-nums">{index}</span>
                  <span aria-hidden className="bg-muted-2 h-px w-9" />
                </>
              ) : null}
              <span>{eyebrow}</span>
            </div>
            <Text
              variant="h1"
              className="font-serif text-3xl tracking-[-0.02em] lg:text-[2.875rem] lg:leading-[1.1]"
            >
              {title}
            </Text>
          </div>
          <Text
            variant="body"
            tone="muted"
            className="max-w-sm text-sm leading-relaxed"
          >
            Quatro disciplinas, mesma intenção — produtos que entram na rotina
            sem ocupar mais espaço do que precisam.
          </Text>
        </header>
        <ul className="border-border grid border-t border-l md:grid-cols-2 lg:grid-cols-4">
          {disciplines.map((discipline, position) => (
            <li
              key={discipline.label}
              data-reveal
              style={
                { "--reveal-delay": `${position * 90}ms` } as CSSProperties
              }
              className="border-border bg-surface hover:bg-surface-2 group relative flex min-h-[280px] flex-col border-r border-b p-8 transition-colors lg:p-10"
            >
              <span
                aria-hidden
                className="bg-accent absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <Text
                variant="caption"
                as="span"
                className="text-muted text-[11px] tracking-[0.18em] tabular-nums uppercase"
              >
                {String(position + 1).padStart(2, "0")}
              </Text>
              <div className="mt-auto pt-16">
                <Text
                  variant="h2"
                  as="h3"
                  className="font-serif text-[1.625rem] leading-snug font-normal transition-colors group-hover:text-accent"
                >
                  {discipline.label}
                </Text>
                <Text
                  variant="body"
                  tone="muted"
                  className="mt-3 text-[13px] leading-relaxed"
                >
                  {discipline.description}
                </Text>
                <span className="text-accent mt-6 inline-flex translate-y-1 items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  Explorar
                  <ArrowRight className="size-3" aria-hidden />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
