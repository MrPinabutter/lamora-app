import {
  useLayoutEffect,
  useRef,
  type ChangeEvent,
  type FocusEvent,
  type InputHTMLAttributes,
} from "react";
import { formatBRL } from "@/shared/lib/utils";
import { Input } from "../Input";

interface CurrencyInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "type"
> {
  value: number;
  onValueChange: (value: number) => void;
}

export function CurrencyInput({
  value,
  onValueChange,
  ...props
}: CurrencyInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const display = formatBRL(value);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || document.activeElement !== el) return;
    const end = el.value.length;
    el.setSelectionRange(end, end);
  }, [display]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, "");
    const cents = digits === "" ? 0 : Number.parseInt(digits, 10);
    onValueChange(cents / 100);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    const end = event.target.value.length;
    event.target.setSelectionRange(end, end);
  };

  return (
    <Input
      {...props}
      ref={ref}
      type="text"
      inputMode="decimal"
      value={display}
      onChange={handleChange}
      onFocus={handleFocus}
    />
  );
}
