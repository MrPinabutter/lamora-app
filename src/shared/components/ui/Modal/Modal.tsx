"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/shared/lib/utils";
import { useDialog } from "@/shared/hooks/useDialog";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useDialog(dialogRef, open);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      className={cn(
        "bg-surface text-foreground relative m-auto w-full max-w-md rounded-xl p-6 shadow-xl",
        "opacity-100 transition-opacity duration-200 starting:opacity-0",
        "backdrop:bg-black/40",
      )}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="text-muted hover:text-foreground absolute top-4 right-4 text-lg"
      >
        ✕
      </button>
      {title ? (
        <h2 className="text-foreground mb-4 pr-8 font-serif text-xl">
          {title}
        </h2>
      ) : null}
      {children}
    </dialog>
  );
}
