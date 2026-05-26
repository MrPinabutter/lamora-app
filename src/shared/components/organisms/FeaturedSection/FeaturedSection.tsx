import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Text } from "@/shared/components/atoms/Text";

interface FeaturedSectionProps {
  eyebrow: string;
  title: string;
  /** Marcador editorial (ex.: `"02"`) renderizado antes do eyebrow. */
  index?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  children: ReactNode;
}

export function FeaturedSection({
  eyebrow,
  title,
  index,
  viewAllHref,
  viewAllLabel = "Ver tudo",
  children,
}: FeaturedSectionProps) {
  return (
    <section className="border-border-soft border-b">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <header className="mb-14 flex flex-wrap items-end justify-between gap-x-12 gap-y-6 lg:mb-20">
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
          {viewAllHref ? (
            <Link
              href={viewAllHref}
              className="text-foreground hover:text-accent focus-visible:ring-primary group inline-flex items-center gap-2 rounded-sm py-1 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
            >
              {viewAllLabel}
              <ArrowRight
                className="size-3.5 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  );
}
