import type { ReactNode } from "react";
import { Text } from "@/shared/components/atoms/Text";

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function Field({ label, htmlFor, error, hint, children }: FieldProps) {
  const messageId = error ? `${htmlFor}-error` : hint ? `${htmlFor}-hint` : undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="text-foreground block text-[11px] font-medium tracking-[0.14em] uppercase"
      >
        {label}
      </label>
      {children}
      {error ? (
        <Text
          variant="caption"
          as="p"
          tone="accent"
          id={messageId}
          role="alert"
        >
          {error}
        </Text>
      ) : hint ? (
        <Text variant="caption" as="p" id={messageId}>
          {hint}
        </Text>
      ) : null}
    </div>
  );
}
