import { Text } from "@/shared/components/atoms/Text";
import { NOTE_TIER_LABELS } from "@/shared/lib/constants";
import { cn } from "@/shared/lib/utils";
import type { OlfactoryRank } from "../services/analytics.service";

interface OlfactoryChartProps {
  notes: OlfactoryRank[];
  emptyMessage?: string;
}

const TIER_DOT: Record<OlfactoryRank["tier"], string> = {
  TOPO: "bg-accent/40",
  CORACAO: "bg-accent/70",
  FUNDO: "bg-accent",
};

export function OlfactoryChart({
  notes,
  emptyMessage = "Sem notas registradas.",
}: OlfactoryChartProps) {
  if (notes.length === 0) {
    return (
      <Text variant="caption" as="p">
        {emptyMessage}
      </Text>
    );
  }

  const ceiling = Math.max(...notes.map((note) => note.count), 1);

  return (
    <ul className="space-y-3">
      {notes.map((note) => {
        const pct = (note.count / ceiling) * 100;
        return (
          <li key={`${note.name}-${note.tier}`} className="space-y-1">
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="flex items-center gap-2">
                <span
                  className={cn("size-2 rounded-full", TIER_DOT[note.tier])}
                  aria-hidden
                />
                <span className="text-foreground">{note.name}</span>
                <span className="text-muted text-xs">
                  {NOTE_TIER_LABELS[note.tier]}
                </span>
              </span>
              <span className="text-muted text-xs tabular-nums">
                {note.count}
              </span>
            </div>
            <div className="bg-border h-2 overflow-hidden rounded-full">
              <div
                className="bg-accent h-full rounded-full"
                style={{ width: `${pct}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
