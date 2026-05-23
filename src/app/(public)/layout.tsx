import Link from "next/link";
import { Text } from "@/shared/components/atoms/Text";
import { SiteNav } from "./_components/SiteNav";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="border-border bg-background/85 sticky top-0 z-40 border-b backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            aria-label="Lamora — página inicial"
            className="focus-visible:ring-primary rounded-sm focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
          >
            <Text variant="h2" as="span" className="tracking-tight">
              Lamora
            </Text>
          </Link>
          <SiteNav />
        </nav>
      </header>
      {children}
    </>
  );
}
