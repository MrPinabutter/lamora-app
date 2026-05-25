import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowRight } from "lucide-react";
import { Hero } from "./Hero";

const meta = {
  title: "Organisms/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: "Perfumaria · curadoria",
    title: "Fragrâncias e cuidados, escolhidos com calma.",
    description:
      "Uma seleção pensada para o seu ritmo. Crie sua conta para receber lançamentos em primeira mão e salvar suas favoritas.",
    actions: (
      <>
        <a
          href="#"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center rounded-full px-6 text-[12px] font-medium tracking-[0.18em] uppercase transition-colors"
        >
          Criar conta
        </a>
        <a
          href="#"
          className="text-foreground hover:text-accent inline-flex items-center gap-2 rounded-sm py-1 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors"
        >
          Ver catálogo
          <ArrowRight className="size-3.5" aria-hidden />
        </a>
      </>
    ),
  },
};

export const TitleOnly: Story = {
  args: {
    eyebrow: "Em breve",
    title: "Uma nova maneira de descobrir fragrâncias.",
  },
};

export const WithMultilineTitle: Story = {
  args: {
    eyebrow: "Lançamento",
    title: (
      <>
        Fragrâncias e cuidados,
        <br />
        escolhidos com calma.
      </>
    ),
    description: "Encontre o que combina com o seu ritmo.",
  },
};

export const WithMeta: Story = {
  args: {
    eyebrow: "Perfumaria · curadoria",
    title: "Fragrâncias e cuidados, escolhidos com calma.",
    description:
      "Uma seleção pensada para o seu ritmo. Crie sua conta para receber lançamentos em primeira mão.",
    meta: ["Est. 2026", "Brasil", "Curadoria independente"],
    actions: (
      <a
        href="#"
        className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center rounded-full px-6 text-[12px] font-medium tracking-[0.18em] uppercase transition-colors"
      >
        Criar conta
      </a>
    ),
  },
};
