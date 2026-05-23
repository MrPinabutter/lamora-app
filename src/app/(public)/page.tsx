import Link from "next/link";
import { Text } from "@/shared/components/atoms/Text";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
      <Text variant="display">Lamora</Text>
      <Text variant="body" tone="muted" className="max-w-sm">
        Perfumaria em construção. A vitrine chega em breve.
      </Text>
      <Link
        href="/produtos"
        className="text-accent text-sm font-medium hover:underline"
      >
        Ver produtos
      </Link>
    </main>
  );
}
