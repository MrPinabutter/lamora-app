import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Testimonials } from "./Testimonials";

const meta = {
  title: "Organisms/Testimonials",
  component: Testimonials,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Testimonials>;

export default meta;

type Story = StoryObj<typeof meta>;

const SAMPLE = [
  {
    quote:
      "Encontrei um perfume que combina com o meu jeito mais discreto. A curadoria poupa tempo e acerta no tom.",
    author: "Helena R.",
    role: "Cliente desde 2025",
  },
  {
    quote:
      "Compro o hidratante de karité há meses. Cuidado simples, sem firula, com produtos que entregam o que prometem.",
    author: "Marcos P.",
    role: "Cliente recorrente",
  },
  {
    quote:
      "A entrega veio embalada com capricho e o perfume superou as descrições. Voltarei sempre.",
    author: "Ana L.",
    role: "Primeira compra",
  },
];

export const Default: Story = {
  args: {
    eyebrow: "Quem usa, fala",
    title: "Recados de quem nos acompanha.",
    testimonials: SAMPLE,
  },
};

export const Single: Story = {
  args: {
    eyebrow: "Quem usa, fala",
    title: "Uma palavra sobre a curadoria.",
    testimonials: [SAMPLE[0]!],
  },
};

export const WithIndex: Story = {
  args: {
    index: "04",
    eyebrow: "Quem usa, fala",
    title: "Recados de quem nos acompanha.",
    testimonials: SAMPLE,
  },
};
