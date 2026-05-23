"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Text } from "@/shared/components/atoms/Text";
import { cn } from "@/shared/lib/utils";

const NAV_LINKS = [{ href: "/produtos", label: "Produtos" }] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-8">
      {NAV_LINKS.map(({ href, label }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className="focus-visible:ring-primary group inline-flex flex-col items-center gap-1 rounded-sm py-1 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
            >
              <Text
                variant="eyebrow"
                as="span"
                className={cn(
                  "transition-colors",
                  active
                    ? "text-foreground"
                    : "group-hover:text-foreground",
                )}
              >
                {label}
              </Text>
              <span
                aria-hidden
                className={cn(
                  "h-px w-5 transition-colors",
                  active ? "bg-accent" : "bg-transparent",
                )}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
