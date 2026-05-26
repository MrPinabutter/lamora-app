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
    <section className="bg-background-2 border-border-soft border-t border-b">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <header className="mb-12 max-w-md space-y-6 lg:mb-16">
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
        </header>
        <ul className="border-border grid border-t md:grid-cols-3">
          {testimonials.map((testimonial, position) => (
            <li
              key={testimonial.author}
              className="border-border space-y-10 p-10 md:border-r md:last:border-r-0"
            >
              <Text
                variant="caption"
                as="p"
                className="text-muted text-[11px] tracking-[0.18em] tabular-nums uppercase"
              >
                {String(position + 1).padStart(2, "0")}
              </Text>
              <Text
                variant="lead"
                as="blockquote"
                className="font-serif text-[1.15rem] leading-[1.5] italic text-balance"
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
