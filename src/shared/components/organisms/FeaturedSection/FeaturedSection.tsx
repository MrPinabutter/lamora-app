import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Text } from "@/shared/components/atoms/Text";

interface FeaturedSectionProps {
  eyebrow: string;
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  children: ReactNode;
}

export function FeaturedSection({
  eyebrow,
  title,
  viewAllHref,
  viewAllLabel = "Ver tudo",
  children,
}: FeaturedSectionProps) {
  return (
    <section className="border-border border-b">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <header className="mb-14 flex flex-wrap items-end justify-between gap-x-12 gap-y-6 lg:mb-20">
          <div className="max-w-md space-y-3">
            <Text variant="eyebrow">{eyebrow}</Text>
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
