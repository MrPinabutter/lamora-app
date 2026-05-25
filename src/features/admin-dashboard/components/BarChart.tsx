import { Text } from "@/shared/components/atoms/Text";
import { cn } from "@/shared/lib/utils";

export interface BarChartPoint {
  label: string;
  value: number;
  /** Texto exibido como valor (default: `value` formatado). */
  display?: string;
}

interface BarChartProps {
  data: BarChartPoint[];
  orientation?: "vertical" | "horizontal";
  /** Ajuste do teto do eixo. Default: maior valor da série (mín. 1). */
  max?: number;
  emptyMessage?: string;
  className?: string;
}

export function BarChart({
  data,
  orientation = "vertical",
  max,
  emptyMessage = "Sem dados no período.",
  className,
}: BarChartProps) {
  if (data.length === 0) {
    return (
      <Text variant="caption" as="p">
        {emptyMessage}
      </Text>
    );
  }

  const ceiling = Math.max(max ?? 0, ...data.map((point) => point.value), 1);

  if (orientation === "horizontal") {
    return (
      <ul className={cn("space-y-3", className)}>
        {data.map((point) => {
          const pct = (point.value / ceiling) * 100;
          return (
            <li key={point.label} className="space-y-1">
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="text-foreground truncate">{point.label}</span>
                <span className="text-muted text-xs tabular-nums">
                  {point.display ?? point.value}
                </span>
              </div>
              <div
                className="bg-border h-2 overflow-hidden rounded-full"
                role="presentation"
              >
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

  return (
    <div className={cn("space-y-3", className)}>
      <ul className="flex h-40 items-end gap-2">
        {data.map((point) => {
          const pct = (point.value / ceiling) * 100;
          return (
            <li
              key={point.label}
              className="flex flex-1 flex-col items-center justify-end gap-2"
            >
              <span className="text-muted text-[10px] tabular-nums">
                {point.display ?? point.value}
              </span>
              <div
                className="bg-accent w-full rounded-t"
                style={{ height: `${pct}%`, minHeight: point.value > 0 ? 2 : 0 }}
                aria-hidden
              />
            </li>
          );
        })}
      </ul>
      <ul className="flex gap-2">
        {data.map((point) => (
          <li
            key={point.label}
            className="text-muted flex-1 text-center text-[10px]"
          >
            {point.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
