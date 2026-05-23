import { NOTE_TIER_LABELS } from "@/shared/lib/constants";
import { cn } from "@/shared/lib/utils";
import type { NoteTier, OlfactoryNote } from "../types/product.types";

interface OlfactoryPyramidProps {
  notes: OlfactoryNote[];
}

const TIER_ORDER: NoteTier[] = ["TOPO", "CORACAO", "FUNDO"];
const INTENSITY_LEVELS = [1, 2, 3, 4, 5];

export function OlfactoryPyramid({ notes }: OlfactoryPyramidProps) {
  if (notes.length === 0) return null;

  return (
    <section aria-labelledby="olfactory-title" className="space-y-4">
      <h2 id="olfactory-title" className="font-serif text-xl">
        Pirâmide olfativa
      </h2>
      <div className="space-y-5">
        {TIER_ORDER.map((tier) => {
          const tierNotes = notes.filter((note) => note.tier === tier);
          if (tierNotes.length === 0) return null;

          return (
            <div key={tier} className="space-y-2">
              <h3 className="text-muted text-xs tracking-wide uppercase">
                {NOTE_TIER_LABELS[tier]}
              </h3>
              <ul className="space-y-2">
                {tierNotes.map((note) => (
                  <li
                    key={note.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="text-sm">{note.name}</span>
                    <span
                      className="flex gap-1"
                      aria-label={`Intensidade ${note.intensity} de 5`}
                    >
                      {INTENSITY_LEVELS.map((level) => (
                        <span
                          key={level}
                          className={cn(
                            "h-1.5 w-5 rounded-full",
                            level <= note.intensity
                              ? "bg-accent"
                              : "bg-border",
                          )}
                        />
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
