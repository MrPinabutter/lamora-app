import Link from "next/link";
import { Text } from "@/shared/components/atoms/Text";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-background flex min-h-dvh flex-col">
      <header className="px-6 py-8 lg:px-10">
        <Link
          href="/"
          aria-label="Lamora — página inicial"
          className="focus-visible:ring-primary inline-block rounded-sm focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
        >
          <Text
            variant="h2"
            as="span"
            className="text-lg tracking-[0.32em] uppercase"
          >
            Lamora
          </Text>
        </Link>
      </header>
      <main className="flex flex-1 items-start justify-center px-6 py-12 lg:items-center lg:py-20">
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </div>
  );
}
