const PLACEHOLDERS = Array.from({ length: 8 }, (_, index) => index);

export function ProductGridSkeleton() {
  return (
    <div
      className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4"
      aria-hidden
    >
      {PLACEHOLDERS.map((index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-border aspect-[4/5] rounded-md" />
          <div className="mt-5 space-y-2">
            <div className="bg-border h-2.5 w-1/3 rounded" />
            <div className="bg-border h-3 w-2/3 rounded" />
            <div className="bg-border h-3 w-1/4 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
