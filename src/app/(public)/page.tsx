import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Text } from "@/shared/components/atoms/Text";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center lg:py-32">
      <Text variant="eyebrow">Perfumaria · curadoria</Text>
      <div className="space-y-6">
        <Text variant="display" className="text-3xl lg:text-4xl">
          Fragrâncias e cuidados,
          <br />
          escolhidos com calma.
        </Text>
        <Text
          variant="body"
          tone="muted"
          className="mx-auto max-w-md text-base leading-relaxed"
        >
          A vitrine completa chega em breve. Enquanto isso, conheça as primeiras
          peças da nossa seleção.
        </Text>
      </div>
      <Link
        href="/produtos"
        className="text-foreground hover:text-accent focus-visible:ring-primary inline-flex items-center gap-2 rounded-sm py-1 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
      >
        Ver produtos
        <ArrowRight className="size-3.5" aria-hidden />
      </Link>
    </main>
  );
}
