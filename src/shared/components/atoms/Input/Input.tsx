import { forwardRef, type InputHTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const input = tv({
  base: "border-border bg-surface text-foreground h-11 w-full rounded-md border px-3 text-sm placeholder:text-muted focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
});

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type = "text", ...props },
  ref,
) {
  return (
    <input ref={ref} type={type} className={input({ className })} {...props} />
  );
});
