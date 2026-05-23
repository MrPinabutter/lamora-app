import { Text } from "@/shared/components/atoms/Text";
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
    <section aria-labelledby="olfactory-title" className="space-y-6">
      <Text variant="eyebrow" id="olfactory-title" as="h2">
        Pirâmide olfativa
      </Text>
      <div className="space-y-8">
        {TIER_ORDER.map((tier) => {
          const tierNotes = notes.filter((note) => note.tier === tier);
          if (tierNotes.length === 0) return null;

          return (
            <div key={tier} className="space-y-3">
              <Text
                variant="caption"
                as="h3"
                className="text-foreground font-medium"
              >
                {NOTE_TIER_LABELS[tier]}
              </Text>
              <ul className="space-y-2.5">
                {tierNotes.map((note) => (
                  <li
                    key={note.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <Text variant="body" as="span">
                      {note.name}
                    </Text>
                    <span
                      className="flex gap-1"
                      aria-label={`Intensidade ${note.intensity} de 5`}
                    >
                      {INTENSITY_LEVELS.map((level) => (
                        <span
                          key={level}
                          className={cn(
                            "h-1 w-4 rounded-full",
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
