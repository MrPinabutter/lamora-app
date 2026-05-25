import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Disciplines } from "./Disciplines";

const meta = {
  title: "Organisms/Disciplines",
  component: Disciplines,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Disciplines>;

export default meta;

type Story = StoryObj<typeof meta>;

const SAMPLE = [
  {
    label: "Perfumes",
    description:
      "Eaux de parfum e cologne com pirâmide olfativa completa, do topo ao fundo.",
  },
  {
    label: "Hidratantes",
    description:
      "Cremes e loções para nutrir o corpo todos os dias, sem peso e sem perfume excessivo.",
  },
  {
    label: "Esfoliantes",
    description:
      "Renovação delicada com texturas que cabem na rotina do banho.",
  },
  {
    label: "Skin care",
    description:
      "Sérums, limpadores e tratamentos para o rosto — fórmulas honestas e direto ao ponto.",
  },
];

export const Default: Story = {
  args: {
    index: "01",
    eyebrow: "Disciplinas",
    title: "O que cuidamos por aqui.",
    disciplines: SAMPLE,
  },
};

export const WithoutIndex: Story = {
  args: {
    eyebrow: "Disciplinas",
    title: "Quatro frentes da curadoria.",
    disciplines: SAMPLE,
  },
};

export const TwoColumn: Story = {
  args: {
    eyebrow: "Categorias",
    title: "Dois núcleos centrais.",
    disciplines: SAMPLE.slice(0, 2),
  },
};
