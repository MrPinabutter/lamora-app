import { Text } from "@/shared/components/atoms/Text";

interface MetricCardProps {
  label: string;
  value: string | number;
  description?: string;
}

export function MetricCard({ label, value, description }: MetricCardProps) {
  return (
    <div className="border-border bg-surface rounded-md border p-6">
      <Text variant="eyebrow">{label}</Text>
      <Text
        variant="h1"
        as="p"
        className="mt-3 font-serif text-3xl leading-none tracking-tight"
      >
        {value}
      </Text>
      {description ? (
        <Text variant="caption" as="p" className="mt-3">
          {description}
        </Text>
      ) : null}
    </div>
  );
}
