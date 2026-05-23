import { Loader2 } from "lucide-react";
import { tv } from "tailwind-variants";

const spinner = tv({
  base: "size-5 animate-spin text-current",
});

interface SpinnerProps {
  className?: string;
  label?: string;
}

export function Spinner({ className, label = "Carregando" }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className="inline-flex">
      <Loader2 className={spinner({ className })} aria-hidden />
    </span>
  );
}
