"use client";

import { X } from "lucide-react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { tv } from "tailwind-variants";
import { Text } from "@/shared/components/atoms/Text";
import { useDialog } from "@/shared/hooks/useDialog";

const drawer = tv({
  slots: {
    dialog:
      "bg-surface text-foreground fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-dvh w-full max-w-md shadow-xl translate-x-0 transition-transform duration-300 ease-out starting:translate-x-full backdrop:bg-black/40",
    panel: "flex h-full flex-col",
    header:
      "border-border flex items-center justify-between border-b px-5 py-4",
    closeButton:
      "text-muted hover:text-foreground inline-flex size-8 items-center justify-center rounded-full",
    closeIcon: "size-4",
    content: "flex-1 overflow-y-auto px-5 py-4",
  },
});

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Drawer({ open, onClose, title, children }: DrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useDialog(dialogRef, open);

  const styles = drawer();

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
      <div className={styles.panel()}>
        <header className={styles.header()}>
          <Text variant="h2" as="h2">
            {title ?? ""}
          </Text>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className={styles.closeButton()}
          >
            <X className={styles.closeIcon()} aria-hidden />
          </button>
        </header>
        <div className={styles.content()}>{children}</div>
      </div>
    </dialog>
  );
}
