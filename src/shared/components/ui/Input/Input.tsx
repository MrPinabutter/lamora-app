import type { InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "border-border bg-surface text-foreground h-11 w-full rounded-md border px-3 text-sm",
        "placeholder:text-muted",
        "focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
