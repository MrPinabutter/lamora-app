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
    <section className="border-border border-b">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <header className="mb-14 flex flex-wrap items-end justify-between gap-x-12 gap-y-6 lg:mb-20">
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
          {viewAllHref ? (
            <Link
              href={viewAllHref}
              className="text-foreground hover:text-accent focus-visible:ring-primary inline-flex items-center gap-2 rounded-sm py-1 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
            >
              {viewAllLabel}
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  );
}
