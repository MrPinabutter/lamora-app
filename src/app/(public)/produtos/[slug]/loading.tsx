const THUMBNAILS = Array.from({ length: 4 }, (_, index) => index);

// Exibido ao abrir um produto a partir da listagem, enquanto os dados chegam.
// Espelha a estrutura de `page.tsx` (galeria + coluna de informações).
export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pt-10 pb-24 lg:pt-14 lg:pb-32">
      <p role="status" className="sr-only">
        Carregando produto
      </p>

      <div className="mb-12 lg:mb-16" aria-hidden>
        <div className="bg-border h-3 w-44 animate-pulse rounded" />
      </div>

      <div
        className="grid animate-pulse gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20"
        aria-hidden
      >
        <div className="space-y-4">
          <div className="bg-border aspect-[4/5] rounded-md" />
          <div className="grid grid-cols-4 gap-3">
            {THUMBNAILS.map((index) => (
              <div key={index} className="bg-border aspect-square rounded-sm" />
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <div className="space-y-4">
            <div className="bg-border h-2.5 w-32 rounded" />
            <div className="bg-border h-8 w-3/4 rounded" />
            <div className="bg-border h-4 w-full rounded" />
            <div className="bg-border h-4 w-2/3 rounded" />
          </div>

          <div className="border-border flex items-baseline justify-between gap-4 border-t pt-6">
            <div className="bg-border h-7 w-28 rounded" />
            <div className="bg-border h-3 w-24 rounded" />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-border h-11 w-52 rounded-full" />
            <div className="bg-border h-11 w-11 rounded-full" />
          </div>

          <div className="border-border space-y-3 border-t pt-10">
            <div className="bg-border h-2.5 w-40 rounded" />
            <div className="bg-border h-4 w-full rounded" />
            <div className="bg-border h-4 w-full rounded" />
            <div className="bg-border h-4 w-1/2 rounded" />
          </div>
        </div>
      </div>
    </main>
  );
}
