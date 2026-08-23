import { ProductGridSkeleton } from "@/features/products";
import { Text } from "@/shared/components/atoms/Text";

const FILTER_BLOCKS = Array.from({ length: 4 }, (_, index) => index);

// Exibido enquanto o segmento `/produtos` carrega — por exemplo ao chegar pela
// busca do header. Espelha o layout da página para evitar salto no conteúdo.
export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
      <header className="mb-14 space-y-3 lg:mb-20">
        <Text variant="eyebrow">Catálogo</Text>
        <Text variant="h1" className="text-3xl lg:text-[2rem]">
          Produtos
        </Text>
        <Text variant="body" tone="muted" className="max-w-md text-base">
          Nossa curadoria de perfumaria e cuidados com a pele.
        </Text>
      </header>

      <p role="status" className="sr-only">
        Carregando produtos
      </p>

      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        <aside className="lg:w-56 lg:shrink-0" aria-hidden>
          <div className="border-border space-y-8 border-t pt-5">
            {FILTER_BLOCKS.map((index) => (
              <div key={index} className="animate-pulse space-y-2">
                <div className="bg-border h-2.5 w-1/3 rounded" />
                <div className="bg-border h-11 w-full rounded-md" />
              </div>
            ))}
          </div>
        </aside>

        <div className="flex-1 space-y-8">
          <div className="flex justify-end">
            <div className="bg-border h-9 w-44 animate-pulse rounded-md" />
          </div>
          <ProductGridSkeleton />
        </div>
      </div>
    </main>
  );
}
