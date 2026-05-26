"use client";

import { useState, type FormEvent } from "react";
import { Text } from "@/shared/components/atoms/Text";

interface NewsletterCTAProps {
  index?: string;
}

// Formulário apenas visual no MVP. Quando houver provedor de e-mail
// (ex.: Resend, ConvertKit), trocar `handleSubmit` por uma Server Action que
// registre o opt-in e dispare a primeira mensagem.
export function NewsletterCTA({ index }: NewsletterCTAProps = {}) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section className="bg-background border-border-soft border-t">
      <div className="mx-auto max-w-6xl px-6 py-24 text-center lg:py-32">
        <div className="text-muted mb-7 inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.18em] uppercase">
          {index ? (
            <>
              <span className="text-foreground tabular-nums">{index}</span>
              <span aria-hidden className="bg-muted-2 h-px w-9" />
            </>
          ) : null}
          <span>Caderno de notícias</span>
        </div>
        <Text
          variant="h1"
          className="mx-auto max-w-2xl font-serif text-[2.25rem] tracking-[-0.02em] lg:text-[3rem] lg:leading-[1.1]"
        >
          Lançamentos novos,{" "}
          <em className="text-muted italic">uma carta por mês.</em>
        </Text>
        <Text
          variant="body"
          tone="muted"
          className="mx-auto mt-5 max-w-md text-sm leading-relaxed"
        >
          Sem ruído. Apenas o que entra na estante, o aroma do mês, e leituras
          curtas do Diário.
        </Text>

        {sent ? (
          <p className="text-foreground mx-auto mt-12 max-w-md font-serif text-lg italic">
            — Obrigado. Em breve, a primeira carta chega.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="border-border focus-within:border-foreground bg-primary-foreground mx-auto mt-12 flex max-w-lg items-center rounded-full border py-1.5 pr-1.5 pl-6 transition-colors"
          >
            <input
              type="email"
              required
              placeholder="seu melhor e-mail"
              aria-label="Seu e-mail"
              className="text-foreground placeholder:text-muted-2 flex-1 bg-transparent py-3 text-sm outline-none"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-foreground rounded-full px-7 py-3 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors"
            >
              Assinar
            </button>
          </form>
        )}

        <Text
          variant="caption"
          as="p"
          className="text-muted-2 mt-6 text-[11px]"
        >
          Você pode sair quando quiser. Sem vender o seu e-mail.
        </Text>
      </div>
    </section>
  );
}
