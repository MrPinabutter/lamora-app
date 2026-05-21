"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/shared/lib/utils";
import { useDialog } from "@/shared/hooks/useDialog";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Drawer({ open, onClose, title, children }: DrawerProps) {
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
        "bg-surface text-foreground fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-dvh w-full max-w-md shadow-xl",
        "translate-x-0 transition-transform duration-300 ease-out starting:translate-x-full",
        "backdrop:bg-black/40",
      )}
    >
      <div className="flex h-full flex-col">
        <header className="border-border flex items-center justify-between border-b px-5 py-4">
          <h2 className="font-serif text-lg">{title ?? ""}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="text-muted hover:text-foreground text-lg"
          >
            ✕
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </dialog>
  );
}
