"use client";

import { Search } from "lucide-react";
import Form from "next/form";
import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";

/** Busca global do header: expande em um campo que leva a /produtos?q=… */
export function SearchButton() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const q = inputRef.current?.value.trim() ?? "";
    if (q.length === 0) {
      event.preventDefault();
    }
    setOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") setOpen(false);
  };

  const handleBlur = () => {
    if ((inputRef.current?.value.trim() ?? "") === "") setOpen(false);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Buscar produtos"
        className="text-foreground hover:text-accent focus-visible:ring-primary inline-flex size-9 cursor-pointer items-center justify-center rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
      >
        <Search className="size-4" aria-hidden />
      </button>
    );
  }

  return (
    <Form
      action="/produtos"
      onSubmit={handleSubmit}
      className="border-border focus-within:border-foreground flex h-9 w-40 items-center gap-2 border-b transition-colors sm:w-48"
    >
      <Search className="text-muted size-4 shrink-0" aria-hidden />
      <input
        ref={inputRef}
        type="search"
        name="q"
        placeholder="Buscar produtos"
        aria-label="Buscar produtos por nome"
        enterKeyHint="search"
        autoComplete="off"
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="text-foreground placeholder:text-muted h-full w-full bg-transparent text-sm focus:outline-none"
      />
    </Form>
  );
}
