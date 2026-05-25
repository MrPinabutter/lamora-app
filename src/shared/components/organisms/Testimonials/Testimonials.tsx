import { Text } from "@/shared/components/atoms/Text";

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface TestimonialsProps {
  eyebrow: string;
  title: string;
  testimonials: ReadonlyArray<Testimonial>;
  /** Marcador editorial (ex.: `"04"`). */
  index?: string;
}

export function Testimonials({
  eyebrow,
  title,
  testimonials,
  index,
}: TestimonialsProps) {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <header className="mb-14 max-w-md space-y-3 lg:mb-20">
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
        </header>
        <ul className="grid gap-12 md:grid-cols-3 md:gap-10">
          {testimonials.map((testimonial, position) => (
            <li
              key={testimonial.author}
              className="border-border space-y-6 border-t pt-8"
            >
              <Text
                variant="caption"
                as="p"
                className="tabular-nums"
              >
                {String(position + 1).padStart(2, "0")}
              </Text>
              <Text
                variant="lead"
                as="blockquote"
                className="font-serif text-[1.0625rem] leading-relaxed text-balance"
              >
                “{testimonial.quote}”
              </Text>
              <footer className="space-y-1">
                <Text variant="h3" as="p" className="text-[13px]">
                  {testimonial.author}
                </Text>
                <Text variant="caption">{testimonial.role}</Text>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
