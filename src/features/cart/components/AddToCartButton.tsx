"use client";

import { useAppStore } from "@/store";
import { Button } from "@/shared/components/atoms/Button";

interface AddToCartButtonProps {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  imageUrl?: string;
  stock: number;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Quando `true`, abre o drawer ao adicionar. Padrão `true`. */
  openOnAdd?: boolean;
  label?: string;
}

export function AddToCartButton({
  productId,
  slug,
  name,
  brand,
  price,
  imageUrl,
  stock,
  variant = "secondary",
  size = "sm",
  className,
  openOnAdd = true,
  label = "Adicionar",
}: AddToCartButtonProps) {
  const addItem = useAppStore((state) => state.addItem);
  const open = useAppStore((state) => state.open);

  const disabled = stock <= 0;

  const handleAdd = () => {
    addItem({ id: productId, slug, name, brand, price, imageUrl, quantity: 1 });
    if (openOnAdd) open();
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleAdd}
      disabled={disabled}
      className={className}
    >
      {disabled ? "Esgotado" : label}
    </Button>
  );
}
