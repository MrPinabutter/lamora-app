"use client";

import Link from "next/link";
import type { ComponentPropsWithRef } from "react";
import { cn } from "@/shared/lib/utils";

type CheckboxProps = Omit<
  ComponentPropsWithRef<"input">,
  "type" | "className"
>;

interface LgpdConsentProps extends CheckboxProps {
  error?: string;
}

export function LgpdConsent({ error, ...inputProps }: LgpdConsentProps) {
  return (
    <div className="space-y-2">
      <label className="text-foreground flex items-start gap-3 text-sm leading-relaxed">
        <input
          type="checkbox"
          className={cn(
            "border-border text-primary focus-visible:ring-primary mt-1 size-4 rounded-sm border focus-visible:ring-2 focus-visible:ring-offset-2",
            error && "border-accent",
          )}
          aria-invalid={error ? "true" : undefined}
          {...inputProps}
        />
        <span className="text-foreground/85">
          Li e aceito os{" "}
          <Link
            href="/termos"
            className="hover:text-accent underline underline-offset-4"
          >
            termos de uso
          </Link>{" "}
          e a{" "}
          <Link
            href="/privacidade"
            className="hover:text-accent underline underline-offset-4"
          >
            política de privacidade
          </Link>
          . Usamos data de nascimento para verificar idade e telefone para
          contato sobre o pedido.
        </span>
      </label>
      {error ? (
        <p
          role="alert"
          className="text-accent ml-7 text-xs leading-relaxed"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
