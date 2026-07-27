import type { CSSProperties, ReactNode } from "react";
import { Text } from "@/shared/components/atoms/Text";
import { HeroMotes } from "./HeroMotes";

type HeroVariant = "default" | "wood";

interface HeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReadonlyArray<string>;
  actions?: ReactNode;
  scrollHint?: string;
  variant?: HeroVariant;
}

const WOOD_NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

export function Hero({
  eyebrow,
  title,
  description,
  meta,
  actions,
  scrollHint,
  variant = "default",
}: HeroProps) {
  const isWood = variant === "wood";

  return (
    <section
      className={
        isWood
          ? "bg-wood text-wood-foreground relative isolate flex min-h-[92vh] flex-col overflow-hidden"
          : "border-border-soft relative border-b"
      }
    >
      {isWood ? (
        <>
          {/* <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={WOOD_BACKDROP}
          /> */}
          {/* <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-[0.3] mix-blend-multiply"
            style={{ backgroundImage: WOOD_GRAIN }}
          /> */}
          {/* <div
            aria-hidden
            className="absolute -z-10 h-[130px] w-[177px] mix-blend-multiply"
            style={{
              backgroundImage: WOOD_KNOT,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              left: "12%",
              top: "68%",
              transform: "rotate(-8deg)",
            }}
          /> */}
          {/* <div
            aria-hidden
            className="absolute -z-10 h-[85px] w-[115px] mix-blend-multiply"
            style={{
              backgroundImage: WOOD_KNOT,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              right: "9%",
              top: "16%",
              transform: "rotate(11deg)",
            }}
          /> */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay"
            style={{ backgroundImage: WOOD_NOISE }}
          />
          <HeroMotes />
          {/* Névoa branca — suaviza o veio de madeira e as motas atrás do
              texto, sem virar uma caixa sólida: só um gradiente radial que
              esmaece nas bordas. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 58% at 50% 44%, rgba(255,255,255,0.55), rgba(255,255,255,0.26) 48%, rgba(255,255,255,0) 78%)",
            }}
          />
          <div
            aria-hidden
            className="via-ember/50 absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent"
          />
        </>
      ) : null}

      <div
        className={`relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center ${
          isWood
            ? "flex-1 justify-center pt-32 pb-32 lg:pt-40"
            : "pt-24 pb-20 lg:pt-36 lg:pb-28"
        }`}
      >
        <Text
          variant="eyebrow"
          className={`hero-enter ${isWood ? "text-ember" : ""}`}
        >
          {eyebrow}
        </Text>
        <Text
          variant="display"
          style={{ "--hero-delay": "90ms" } as CSSProperties}
          className={`hero-enter mt-8 max-w-4xl font-serif text-[2.75rem] leading-[1.02] tracking-[-0.025em] text-balance sm:text-[3.5rem] lg:text-[4.75rem] xl:text-[5.25rem] ${
            isWood ? "text-wood-foreground" : ""
          }`}
        >
          {title}
        </Text>
        {description ? (
          <Text
            variant="body"
            tone="muted"
            style={{ "--hero-delay": "180ms" } as CSSProperties}
            className={`hero-enter mt-8 max-w-lg text-[15px] leading-relaxed lg:text-base ${
              isWood ? "text-wood-muted" : ""
            }`}
          >
            {description}
          </Text>
        ) : null}
        {meta && meta.length > 0 ? (
          <ul
            style={{ "--hero-delay": "260ms" } as CSSProperties}
            className={`hero-enter mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-medium tracking-[0.18em] uppercase tabular-nums ${
              isWood ? "text-wood-muted" : "text-muted"
            }`}
          >
            {meta.map((item, index) => (
              <li key={item} className="flex items-center gap-3">
                {index > 0 ? (
                  <span
                    aria-hidden
                    className={`h-px w-6 ${isWood ? "bg-ember/40" : "bg-muted-2"}`}
                  />
                ) : null}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {actions ? (
          <div
            style={{ "--hero-delay": "340ms" } as CSSProperties}
            className="hero-enter mt-11 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          >
            {actions}
          </div>
        ) : null}
      </div>

      {scrollHint ? (
        <div
          style={{ "--hero-delay": "480ms" } as CSSProperties}
          className={`hero-enter flex flex-col items-center gap-3 ${
            isWood
              ? "text-wood-muted absolute inset-x-0 bottom-9 lg:bottom-11"
              : "text-muted mt-20 lg:mt-24"
          }`}
        >
          <Text
            variant="caption"
            as="span"
            className={`text-[10px] tracking-[0.18em] uppercase ${
              isWood ? "text-wood-muted" : ""
            }`}
          >
            {scrollHint}
          </Text>
          <span
            aria-hidden
            className={`relative h-11 w-px overflow-hidden ${
              isWood ? "bg-wood-foreground/20" : "bg-muted-2"
            }`}
          >
            <span
              className={`absolute top-0 left-0 h-full w-full [transform:translateY(-100%)] animate-[scrollHint_2.4s_ease-in-out_infinite] ${
                isWood ? "bg-ember" : "bg-foreground"
              }`}
            />
          </span>
        </div>
      ) : null}
      <style>{`@keyframes scrollHint { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }`}</style>
    </section>
  );
}
