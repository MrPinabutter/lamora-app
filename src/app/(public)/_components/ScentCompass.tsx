"use client";

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Text } from "@/shared/components/atoms/Text";

interface Family {
  name: string;
  n: string;
  color: string;
  smokeColor?: string;
  mood: string;
  notas: ReadonlyArray<string>;
  occWhen: string;
}

const FAMILIAS: ReadonlyArray<Family> = [
  {
    name: "Cítrico",
    n: "01",
    color: "oklch(0.86 0.10 95)",
    mood: "A claridade do primeiro gole de manhã.",
    notas: ["bergamota", "limão siciliano", "mandarina", "neroli", "toranja"],
    occWhen:
      "dias quentes, manhãs longas e momentos em que a pele pede leveza.",
  },
  {
    name: "Aromático",
    n: "02",
    color: "oklch(0.82 0.07 135)",
    mood: "Ervas frescas, lembrança de jardim no fim da tarde.",
    notas: ["lavanda", "alecrim", "sálvia", "manjericão", "menta"],
    occWhen:
      "rotina ativa, escritório, qualquer hora em que se queira clareza.",
  },
  {
    name: "Floral",
    n: "03",
    color: "oklch(0.86 0.07 20)",
    mood: "Uma flor recém-aberta sobre roupa de algodão.",
    notas: ["rosa centifólia", "jasmim", "íris", "peônia", "tuberosa"],
    occWhen: "primavera, eventos íntimos, encontros que pedem suavidade.",
  },
  {
    name: "Chipre",
    n: "04",
    color: "oklch(0.74 0.06 110)",
    mood: "Sombra úmida de bosque depois da chuva.",
    notas: ["musgo de carvalho", "patchouli", "labdanum", "bergamota"],
    occWhen: "outono, ocasiões com mais peso, momentos para se demorar.",
  },
  {
    name: "Amadeirado",
    n: "05",
    color: "oklch(0.70 0.07 55)",
    smokeColor: "oklch(0.96 0.008 80)",
    mood: "Mesa de madeira quente, café que esfria devagar.",
    notas: ["cedro", "sândalo", "vetiver", "gaiac", "pau-rosa"],
    occWhen: "meias-estações, noites longas, dias em que se busca conforto.",
  },
  {
    name: "Âmbar",
    n: "06",
    color: "oklch(0.80 0.10 70)",
    mood: "Luz de vela contra parede de pedra.",
    notas: ["âmbar", "baunilha", "benjoim", "almíscar branco", "tonka"],
    occWhen: "inverno, fim de tarde, ocasiões íntimas e demoradas.",
  },
  {
    name: "Couro",
    n: "07",
    color: "oklch(0.55 0.06 45)",
    smokeColor: "oklch(0.96 0.008 80)",
    mood: "Caderno antigo, casaco esquecido na cadeira.",
    notas: ["suede", "cuir", "tabaco", "bétula", "iso-E super"],
    occWhen: "noite, ocasiões formais, quando se quer marcar presença.",
  },
  {
    name: "Verde",
    n: "08",
    color: "oklch(0.80 0.09 150)",
    mood: "Folha esmagada entre os dedos.",
    notas: ["galbanum", "folha de violeta", "chá verde", "figueira", "grama"],
    occWhen:
      "dias claros, passeios ao ar livre, quando se quer parecer recém-chegado.",
  },
];

const CX = 300;
const CY = 300;
const R_OUT = 258;
const R_IN = 90;
const R_LBL = 178;
const SEG = 360 / FAMILIAS.length;

function polar(r: number, deg: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
}

function wedgePath(a1: number, a2: number): string {
  const [x1, y1] = polar(R_OUT, a1);
  const [x2, y2] = polar(R_OUT, a2);
  const [x3, y3] = polar(R_IN, a2);
  const [x4, y4] = polar(R_IN, a1);
  return `M ${x1} ${y1} A ${R_OUT} ${R_OUT} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${R_IN} ${R_IN} 0 0 0 ${x4} ${y4} Z`;
}

interface ScentCompassProps {
  index?: string;
}

interface Particle {
  id: string;
  sx: number;
  sy: number;
  ex: number;
  ey: number;
  rx: number;
  ry: number;
  rotation: number;
  color: string;
  duration: number;
  delay: number;
  peak: number;
  whiteSmoke: boolean;
}

export function ScentCompass({ index }: ScentCompassProps = {}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [particles, setParticles] = useState<ReadonlyArray<Particle>>([]);
  const skipInitialBurstRef = useRef(true);
  const family = FAMILIAS[activeIdx] ?? FAMILIAS[0]!;

  const wedges = useMemo(
    () =>
      FAMILIAS.map((f, i) => {
        const a1 = i * SEG - SEG / 2;
        const a2 = a1 + SEG;
        const midA = a1 + SEG / 2;
        const [lx, ly] = polar(R_LBL, midA);
        return {
          path: wedgePath(a1, a2),
          lx,
          ly,
          name: f.name,
          color: f.color,
        };
      }),
    [],
  );

  const handleSelect = useCallback((i: number) => {
    setActiveIdx(i);
  }, []);

  const burstParticles = useCallback((idx: number) => {
    const f = FAMILIAS[idx];
    if (!f) return;
    const smokeFill = f.smokeColor ?? f.color;
    const isWhiteSmoke = f.smokeColor !== undefined;
    const wedgeAngle = idx * SEG;
    const count = 28;
    const burstId = `${idx}-${Date.now().toString(36)}`;
    const next: Particle[] = Array.from({ length: count }, (_, i) => {
      const spread = (Math.random() - 0.5) * 46;
      const angle = wedgeAngle + spread;
      const startR = R_IN + 2 + Math.random() * 22;
      const endR = R_OUT + 14 + Math.random() * 22;
      const [sx, sy] = polar(startR, angle);
      const [ex, ey] = polar(endR, angle);
      const r = 3.5 + Math.random() * 6.5;
      const aspect = 0.7 + Math.random() * 0.6;
      return {
        id: `${burstId}-${i}`,
        sx,
        sy,
        ex,
        ey,
        rx: r * aspect,
        ry: r / aspect,
        rotation: Math.random() * 360,
        color: smokeFill,
        duration: 2800 + Math.random() * 2400,
        delay: Math.random() * 1600,
        peak: isWhiteSmoke
          ? 0.32 + Math.random() * 0.3
          : 0.13 + Math.random() * 0.22,
        whiteSmoke: isWhiteSmoke,
      };
    });
    setParticles((prev) => {
      const merged = [...prev, ...next];
      // cap total in-flight particles so rapid sweeps stay calm
      return merged.length > 96 ? merged.slice(merged.length - 96) : merged;
    });
  }, []);

  useEffect(() => {
    if (skipInitialBurstRef.current) {
      skipInitialBurstRef.current = false;
      return;
    }
    const timer = window.setTimeout(() => burstParticles(activeIdx), 90);
    return () => window.clearTimeout(timer);
  }, [activeIdx, burstParticles]);

  const handleParticleEnd = useCallback((id: string) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <section
      id="bussula"
      className="border-border-soft from-background to-background-2 relative overflow-hidden border-t border-b bg-gradient-to-b"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <header
          data-reveal
          className="mb-12 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
        >
          <div className="max-w-md space-y-6">
            <div className="text-muted flex items-center gap-3 text-[11px] font-medium tracking-[0.18em] uppercase">
              {index ? (
                <>
                  <span className="text-foreground tabular-nums">{index}</span>
                  <span aria-hidden className="bg-muted-2 h-px w-9" />
                </>
              ) : null}
              <span>Bússola olfativa</span>
            </div>
            <Text
              variant="h1"
              className="font-serif text-3xl tracking-[-0.02em] lg:text-[2.875rem] lg:leading-[1.1]"
            >
              Encontre a família{" "}
              <em className="text-muted italic">que combina com você.</em>
            </Text>
          </div>
          <Text
            variant="body"
            tone="muted"
            className="max-w-sm text-sm leading-relaxed"
          >
            Oito famílias, mesmas regras de curadoria. Toque uma fatia para
            conhecer as notas, a sensação e quando ela costuma funcionar
            melhor.
          </Text>
        </header>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-[480px] lg:max-w-[560px] xl:max-w-[620px]">
            <svg
              viewBox="0 0 600 600"
              role="img"
              aria-label={`Roda olfativa — família selecionada: ${family.name}`}
              className="text-foreground block h-auto w-full"
            >
              <defs>
                <filter
                  id="scent-smoke-filter"
                  x="-25%"
                  y="-25%"
                  width="150%"
                  height="150%"
                  colorInterpolationFilters="sRGB"
                >
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.022"
                    numOctaves="2"
                    seed="7"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="11"
                    xChannelSelector="R"
                    yChannelSelector="G"
                    result="displaced"
                  />
                  <feGaussianBlur in="displaced" stdDeviation="2.6" />
                </filter>
              </defs>
              <circle
                cx={CX}
                cy={CY}
                r={R_OUT + 4}
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.35}
                strokeWidth={0.5}
              />

              <g>
                {wedges.map((w, i) => {
                  const isActive = i === activeIdx;
                  return (
                    <path
                      key={`w-${w.name}`}
                      d={w.path}
                      fill={w.color}
                      fillOpacity={isActive ? 0.55 : 0.14}
                      stroke="currentColor"
                      strokeOpacity={isActive ? 0.75 : 0.4}
                      strokeWidth={0.5}
                      style={{
                        cursor: "pointer",
                        transition:
                          "fill-opacity 0.5s cubic-bezier(0.4,0,0.2,1), stroke-opacity 0.35s",
                      }}
                      onMouseEnter={() => handleSelect(i)}
                      onClick={() => handleSelect(i)}
                      aria-label={`Selecionar família ${w.name}`}
                    />
                  );
                })}
              </g>

              <g
                aria-hidden
                style={{ pointerEvents: "none" }}
                filter="url(#scent-smoke-filter)"
              >
                {particles.map((p) => (
                  <g
                    key={p.id}
                    className="scent-particle"
                    data-smoke={p.whiteSmoke ? "white" : undefined}
                    style={
                      {
                        animation: `scent-smoke-pos ${p.duration}ms cubic-bezier(0.22, 0.6, 0.36, 1) ${p.delay}ms both`,
                        "--sx": `${p.sx}px`,
                        "--sy": `${p.sy}px`,
                        "--ex": `${p.ex}px`,
                        "--ey": `${p.ey}px`,
                      } as CSSProperties
                    }
                    onAnimationEnd={(e) => {
                      if (e.target === e.currentTarget)
                        handleParticleEnd(p.id);
                    }}
                  >
                    <g
                      className="scent-particle-grow"
                      style={
                        {
                          animation: `scent-smoke-grow ${p.duration}ms linear ${p.delay}ms both`,
                          "--peak": p.peak,
                        } as CSSProperties
                      }
                    >
                      <ellipse
                        rx={p.rx}
                        ry={p.ry}
                        fill={p.color}
                        transform={`rotate(${p.rotation})`}
                      />
                    </g>
                  </g>
                ))}
              </g>

              <g style={{ pointerEvents: "none" }}>
                {wedges.map((w, i) => {
                  const isActive = i === activeIdx;
                  return (
                    <text
                      key={`l-${w.name}`}
                      x={w.lx}
                      y={w.ly}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontFamily={
                        isActive
                          ? "var(--font-serif)"
                          : "var(--font-serif)"
                      }
                      fontSize={isActive ? 17 : 13.5}
                      fontStyle={isActive ? "italic" : "normal"}
                      fontWeight={isActive ? 500 : 400}
                      letterSpacing={isActive ? "0.02em" : "0.18em"}
                      fill={isActive ? "currentColor" : "var(--color-muted)"}
                      style={{
                        textTransform: isActive ? "none" : "uppercase",
                        transition:
                          "fill 0.35s, font-size 0.35s, letter-spacing 0.35s, font-style 0.35s",
                      }}
                    >
                      {w.name}
                    </text>
                  );
                })}
              </g>

              <g
                style={{
                  transformOrigin: `${CX}px ${CY}px`,
                  transform: `rotate(${activeIdx * SEG}deg)`,
                  transition:
                    "transform 0.8s cubic-bezier(0.34,1.12,0.64,1)",
                }}
              >
                <circle cx={CX} cy={CY - R_OUT - 4} r={2.4} fill="currentColor" />
              </g>

              <circle
                cx={CX}
                cy={CY}
                r={R_IN - 4}
                fill="var(--color-background)"
              />
              <circle
                cx={CX}
                cy={CY}
                r={R_IN - 4}
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.35}
                strokeWidth={0.5}
              />
              <text
                x={CX}
                y={CY - 20}
                textAnchor="middle"
                fontFamily="var(--font-sans)"
                fontSize={10}
                letterSpacing="0.28em"
                fill="var(--color-muted)"
                style={{ textTransform: "uppercase" }}
              >
                Família
              </text>
              <text
                x={CX}
                y={CY + 10}
                textAnchor="middle"
                fontFamily="var(--font-serif)"
                fontSize={34}
                fontStyle="italic"
                letterSpacing="-0.01em"
                fill="currentColor"
              >
                {family.name}
              </text>
              <text
                x={CX}
                y={CY + 35}
                textAnchor="middle"
                fontFamily="var(--font-sans)"
                fontSize={10}
                letterSpacing="0.28em"
                fill="var(--color-muted)"
                style={{ textTransform: "uppercase" }}
              >
                No. {family.n}
              </text>
            </svg>
          </div>

          <div
            key={family.n}
            className="lg:min-h-[480px] lg:pl-2 animate-[scent-fade_0.45s_cubic-bezier(0.4,0,0.2,1)_both]"
          >
            <div className="mb-5 flex items-center gap-3.5">
              <span
                className="border-border block size-10 rounded-full border"
                style={{ background: family.color }}
                aria-hidden
              />
              <span className="text-foreground text-[11px] font-medium tracking-[0.18em] uppercase">
                No. {family.n}
              </span>
              <span aria-hidden className="bg-muted-2 h-px w-9" />
              <span className="text-muted text-[11px] font-medium tracking-[0.18em] uppercase">
                Família olfativa
              </span>
            </div>

            <Text
              variant="h1"
              as="h3"
              className="font-serif text-[2rem] leading-[1.05] tracking-[-0.02em] lg:text-[3rem]"
            >
              {family.name}
              <em className="text-muted mt-1 block text-[0.7em] italic">
                uma família para se demorar.
              </em>
            </Text>

            <p className="text-foreground-soft mt-6 max-w-md font-serif text-[17px] leading-[1.5] italic lg:text-[19px]">
              “{family.mood}”
            </p>

            <div className="border-border mt-8 border-t pt-6">
              <span className="text-muted mb-3.5 block text-[11px] tracking-[0.18em] uppercase">
                Notas típicas
              </span>
              <ul className="flex flex-wrap gap-2">
                {family.notas.map((nota, i) => (
                  <li
                    key={nota}
                    className="border-border bg-background-2 text-foreground-soft rounded-full border px-3.5 py-2 font-serif text-[14px] italic"
                    style={{
                      animation: `scent-chip 0.55s cubic-bezier(0.4,0,0.2,1) both`,
                      animationDelay: `${i * 55}ms`,
                    }}
                  >
                    {nota}
                  </li>
                ))}
              </ul>
            </div>

            <p className="border-border-soft text-foreground-soft mt-7 max-w-md border-t pt-5 text-[13.5px] leading-[1.75]">
              <em className="text-foreground font-serif italic">
                Quando vestir:
              </em>{" "}
              {family.occWhen}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scent-fade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scent-chip {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .scent-particle {
          will-change: transform;
          transform-box: view-box;
          transform-origin: 0 0;
          mix-blend-mode: multiply;
        }
        .scent-particle[data-smoke="white"] {
          mix-blend-mode: screen;
        }
        .scent-particle-grow {
          will-change: transform, opacity;
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes scent-smoke-pos {
          from { transform: translate(var(--sx), var(--sy)); }
          to   { transform: translate(var(--ex), var(--ey)); }
        }
        @keyframes scent-smoke-grow {
          0% {
            transform: scale(0.45);
            opacity: 0;
          }
          14% {
            opacity: var(--peak, 0.3);
          }
          82% {
            opacity: calc(var(--peak, 0.3) * 0.35);
          }
          100% {
            transform: scale(3.2);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .scent-particle { display: none; }
        }
      `}</style>
    </section>
  );
}
