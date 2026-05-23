import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const text = tv({
  base: "text-foreground",
  variants: {
    variant: {
      display: "font-serif text-4xl leading-[1.05] tracking-tight",
      h1: "font-serif text-2xl leading-[1.15] tracking-tight",
      h2: "font-serif text-xl leading-[1.2]",
      h3: "text-sm font-medium leading-snug",
      lead: "text-base leading-relaxed",
      body: "text-sm leading-relaxed",
      caption: "text-muted text-xs leading-normal",
      eyebrow:
        "text-muted text-[11px] font-medium tracking-[0.14em] uppercase",
    },
    tone: {
      default: "",
      muted: "text-muted",
      accent: "text-accent",
    },
  },
  defaultVariants: { variant: "body", tone: "default" },
});

type Variant = NonNullable<VariantProps<typeof text>["variant"]>;
type Tone = NonNullable<VariantProps<typeof text>["tone"]>;

const DEFAULT_TAG = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  lead: "p",
  body: "p",
  caption: "span",
  eyebrow: "p",
} as const satisfies Record<Variant, ElementType>;

type TextOwnProps<E extends ElementType> = {
  as?: E;
  variant?: Variant;
  tone?: Tone;
  className?: string;
  children?: ReactNode;
};

export type TextProps<E extends ElementType = "p"> = TextOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof TextOwnProps<E>>;

export function Text<E extends ElementType = "p">({
  as,
  variant = "body",
  tone = "default",
  className,
  ...rest
}: TextProps<E>) {
  const Component: ElementType = as ?? DEFAULT_TAG[variant];
  return (
    <Component className={text({ variant, tone, className })} {...rest} />
  );
}
