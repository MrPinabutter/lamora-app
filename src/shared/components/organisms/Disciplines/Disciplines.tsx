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
    <section className="border-border border-b">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <header className="mb-14 flex flex-col gap-8 lg:mb-20 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-md space-y-3">
            <div className="text-muted flex items-center gap-3 text-[11px] font-medium tracking-[0.14em] uppercase">
              {index ? (
                <>
                  <span className="text-foreground tabular-nums">{index}</span>
                  <span aria-hidden className="bg-border h-px w-6" />
                </>
              ) : null}
              <span>{eyebrow}</span>
            </div>
            <Text variant="h1" className="text-2xl lg:text-[1.75rem]">
              {title}
            </Text>
          </div>
          <Text
            variant="caption"
            as="p"
            className="text-muted max-w-sm leading-relaxed"
          >
            Quatro disciplinas, mesma intenção — produtos que entram na rotina
            sem ocupar mais espaço do que precisam.
          </Text>
        </header>
        <ul className="grid gap-px overflow-hidden md:grid-cols-2 lg:grid-cols-4">
          {disciplines.map((discipline, position) => (
            <li
              key={discipline.label}
              className="border-border bg-background flex flex-col gap-4 border-t py-8 md:border-l md:px-8 md:first:border-l-0 lg:px-10"
            >
              <Text
                variant="caption"
                as="p"
                className="text-foreground tabular-nums"
              >
                {String(position + 1).padStart(2, "0")}
              </Text>
              <Text
                variant="h2"
                as="h3"
                className="font-serif text-[1.0625rem]"
              >
                {discipline.label}
              </Text>
              <Text
                variant="body"
                tone="muted"
                className="text-[13px] leading-relaxed"
              >
                {discipline.description}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
