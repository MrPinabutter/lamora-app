"use client";

import { X } from "lucide-react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { tv } from "tailwind-variants";
import { useDialog } from "@/shared/hooks/useDialog";

const modal = tv({
  slots: {
    dialog:
      "bg-surface text-foreground relative m-auto w-full max-w-md rounded-xl p-6 shadow-xl opacity-100 transition-opacity duration-200 starting:opacity-0 backdrop:bg-black/40",
    closeButton:
      "text-muted hover:text-foreground absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-full",
    closeIcon: "size-4",
    title: "text-foreground mb-4 pr-8 font-serif text-xl",
  },
});

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useDialog(dialogRef, open);

  const styles = modal();

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      className={styles.dialog()}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className={styles.closeButton()}
      >
        <X className={styles.closeIcon()} aria-hidden />
      </button>
      {title ? <h2 className={styles.title()}>{title}</h2> : null}
      {children}
    </dialog>
  );
}
