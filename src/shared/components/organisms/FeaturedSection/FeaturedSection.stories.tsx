import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FeaturedSection } from "./FeaturedSection";

const meta = {
  title: "Organisms/FeaturedSection",
  component: FeaturedSection,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof FeaturedSection>;

export default meta;

type Story = StoryObj<typeof meta>;

const placeholder = (
  <div className="bg-surface text-muted grid grid-cols-2 gap-x-6 gap-y-12 rounded-md p-12 text-center sm:grid-cols-3 lg:grid-cols-4">
    <span>Slot do conteúdo</span>
    <span>(grid de cards)</span>
    <span>...</span>
    <span>...</span>
  </div>
);

export const Default: Story = {
  args: {
    eyebrow: "Em destaque",
    title: "Mais vendidos",
    viewAllHref: "/produtos",
    children: placeholder,
  },
};

export const WithoutViewAll: Story = {
  args: {
    eyebrow: "Novidades",
    title: "Lançamentos da semana",
    children: placeholder,
  },
};

export const WithIndex: Story = {
  args: {
    index: "02",
    eyebrow: "Em destaque",
    title: "Mais vendidos",
    viewAllHref: "/produtos",
    children: placeholder,
  },
};
