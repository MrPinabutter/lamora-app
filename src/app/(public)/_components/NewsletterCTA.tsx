"use client";

import { type CSSProperties, useState, type FormEvent } from "react";
import { Text } from "@/shared/components/atoms/Text";
import { HeroMotes } from "@/shared/components/organisms/Hero/HeroMotes";

interface NewsletterCTAProps {
  index?: string;
}

/** Painel de madeira clara — o eco do hero que fecha a página. */
const WOOD_BACKDROP: CSSProperties = {
  backgroundColor: "var(--color-wood)",
  backgroundImage: [
    "radial-gradient(90% 90% at 50% -20%, rgba(201,168,106,0.26), rgba(201,168,106,0) 60%)",
    "radial-gradient(60% 120% at 50% 120%, rgba(156,123,120,0.12), rgba(156,123,120,0) 65%)",
    "linear-gradient(180deg, #e4d0af 0%, #ddc7a4 55%, #d2b98f 100%)",
  ].join(", "),
};

/** Veio de madeira — mesma técnica do hero (listras deslocadas por ruído,
 *  não ruído-como-alfa), com sementes diferentes para o eco não repetir o
 *  padrão do hero pixel a pixel. */
const WOOD_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='920' height='460'%3E%3Cfilter id='g' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.0028 0.32' numOctaves='2' seed='17' stitchTiles='stitch' result='n'/%3E%3CfeColorMatrix in='n' type='saturate' values='0' result='gray'/%3E%3CfeComponentTransfer in='gray' result='bands'%3E%3CfeFuncR type='discrete' tableValues='0.1 0.85 0.2 0.9 0.15 0.8 0.25 0.9 0.1'/%3E%3CfeFuncG type='discrete' tableValues='0.1 0.85 0.2 0.9 0.15 0.8 0.25 0.9 0.1'/%3E%3CfeFuncB type='discrete' tableValues='0.1 0.85 0.2 0.9 0.15 0.8 0.25 0.9 0.1'/%3E%3C/feComponentTransfer%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.009 0.015' numOctaves='2' seed='13' stitchTiles='stitch' result='warp'/%3E%3CfeDisplacementMap in='bands' in2='warp' scale='65' xChannelSelector='R' yChannelSelector='G' result='wavy'/%3E%3CfeColorMatrix in='wavy' type='matrix' values='0 0 0 0 0.16  0 0 0 0 0.09  0 0 0 0 0.04  0.17 0.17 0.17 0 0' result='tinted'/%3E%3CfeGaussianBlur in='tinted' stdDeviation='0.5'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")";

/** Nó da madeira — um único anel, não repetido em tile. */
const WOOD_KNOT =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='110'%3E%3Cdefs%3E%3CradialGradient id='k' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%233a2210' stop-opacity='0.7'/%3E%3Cstop offset='10%25' stop-color='%233a2210' stop-opacity='0.15'/%3E%3Cstop offset='18%25' stop-color='%233a2210' stop-opacity='0.5'/%3E%3Cstop offset='26%25' stop-color='%233a2210' stop-opacity='0.1'/%3E%3Cstop offset='36%25' stop-color='%233a2210' stop-opacity='0.32'/%3E%3Cstop offset='48%25' stop-color='%233a2210' stop-opacity='0.08'/%3E%3Cstop offset='62%25' stop-color='%233a2210' stop-opacity='0.2'/%3E%3Cstop offset='100%25' stop-color='%233a2210' stop-opacity='0'/%3E%3C/radialGradient%3E%3Cfilter id='warp' x='-50%25' y='-50%25' width='200%25' height='200%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02 0.03' numOctaves='2' seed='9' result='w'/%3E%3CfeDisplacementMap in='SourceGraphic' in2='w' scale='14' xChannelSelector='R' yChannelSelector='G'/%3E%3C/filter%3E%3C/defs%3E%3Cellipse cx='75' cy='55' rx='38' ry='24' fill='url(%23k)' filter='url(%23warp)'/%3E%3C/svg%3E\")";

export function NewsletterCTA({ index }: NewsletterCTAProps = {}) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section className="bg-wood text-wood-foreground border-border-soft relative isolate overflow-hidden border-t">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={WOOD_BACKDROP}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.55] mix-blend-multiply"
        style={{ backgroundImage: WOOD_GRAIN }}
      />
      <div
        aria-hidden
        className="absolute -z-10 h-[100px] w-[136px] mix-blend-multiply"
        style={{
          backgroundImage: WOOD_KNOT,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          right: "14%",
          top: "20%",
          transform: "rotate(-9deg)",
        }}
      />
      <HeroMotes />
      <div className="relative mx-auto max-w-6xl px-6 py-28 text-center lg:py-40">
        <div
          data-reveal
          className="text-ember mb-7 inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.18em] uppercase"
        >
          {index ? (
            <>
              <span className="text-wood-foreground tabular-nums">{index}</span>
              <span aria-hidden className="bg-ember/40 h-px w-9" />
            </>
          ) : null}
          <span>Caderno de notícias</span>
        </div>
        <Text
          data-reveal
          variant="h1"
          className="text-wood-foreground mx-auto max-w-3xl font-serif text-[2.5rem] tracking-[-0.02em] text-balance lg:text-[3.5rem] lg:leading-[1.08]"
          style={{ "--reveal-delay": "80ms" } as CSSProperties}
        >
          Lançamentos novos,{" "}
          <em className="text-ember italic">uma carta por mês.</em>
        </Text>
        <Text
          data-reveal
          variant="body"
          className="text-wood-muted mx-auto mt-6 max-w-md text-[15px] leading-relaxed"
          style={{ "--reveal-delay": "160ms" } as CSSProperties}
        >
          Sem ruído. Apenas o que entra na estante, o aroma do mês, e leituras
          curtas do Diário.
        </Text>

        {sent ? (
          <p className="text-wood-foreground mx-auto mt-12 max-w-md font-serif text-lg italic">
            — Obrigado. Em breve, a primeira carta chega.
          </p>
        ) : (
          <form
            data-reveal
            onSubmit={handleSubmit}
            style={{ "--reveal-delay": "240ms" } as CSSProperties}
            className="focus-within:border-ember mx-auto mt-12 flex max-w-lg items-center rounded-full border border-[rgba(107,68,35,0.25)] bg-[rgba(255,255,255,0.4)] py-1.5 pr-1.5 pl-6 backdrop-blur-sm transition-colors"
          >
            <input
              type="email"
              required
              placeholder="seu melhor e-mail"
              aria-label="Seu e-mail"
              className="text-wood-foreground placeholder:text-wood-muted/60 flex-1 bg-transparent py-3 text-sm outline-none"
            />
            <button
              type="submit"
              className="bg-ember text-wood rounded-full px-7 py-3 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors hover:bg-[#7d5029]"
            >
              Assinar
            </button>
          </form>
        )}

        <Text
          variant="caption"
          as="p"
          className="text-wood-muted/70 mt-6 text-[11px]"
        >
          Você pode sair quando quiser. Sem vender o seu e-mail.
        </Text>
      </div>
    </section>
  );
}
