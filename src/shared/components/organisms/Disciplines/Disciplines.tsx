import { ArrowRight } from "lucide-react";
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
        <header className="mb-14 flex flex-col gap-8 lg:mb-20 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
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
              className="border-border bg-surface hover:bg-surface-2 group flex min-h-[240px] flex-col border-r border-b p-8 transition-colors lg:p-9"
            >
              <Text
                variant="caption"
                as="span"
                className="text-muted text-[11px] tracking-[0.18em] tabular-nums uppercase"
              >
                {String(position + 1).padStart(2, "0")}
              </Text>
              <Text
                variant="h2"
                as="h3"
                className="mt-16 font-serif text-[1.375rem] leading-snug font-normal"
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
              <span className="text-muted mt-auto inline-flex items-center gap-2 pt-6 text-[11px] font-medium tracking-[0.18em] uppercase opacity-0 transition-opacity group-hover:opacity-100">
                Explorar
                <ArrowRight className="size-3" aria-hidden />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
