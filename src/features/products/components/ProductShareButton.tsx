"use client";

import { Button } from "@/shared/components/atoms/Button";
import { useProductShare } from "../hooks/useProductShare";

interface ProductShareButtonProps {
  title: string;
  text: string;
}

export function ProductShareButton({ title, text }: ProductShareButtonProps) {
  const { share, status } = useProductShare({ title, text });

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={() => void share()}
      aria-live="polite"
    >
      {status === "copied" ? "Link copiado!" : "Compartilhar"}
    </Button>
  );
}
