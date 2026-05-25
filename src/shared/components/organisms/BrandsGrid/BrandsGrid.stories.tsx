import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BrandsGrid } from "./BrandsGrid";

const meta = {
  title: "Organisms/BrandsGrid",
  component: BrandsGrid,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof BrandsGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: "Marcas parceiras",
    brands: [
      "Maison Lumière",
      "Atelier Côte",
      "Botânica Pura",
      "Maré Alta",
      "Dermo Lab",
    ],
  },
};

export const Few: Story = {
  args: {
    eyebrow: "Marcas parceiras",
    brands: ["Maison Lumière", "Atelier Côte"],
  },
};

export const Empty: Story = {
  args: {
    eyebrow: "Marcas parceiras",
    brands: [],
  },
};

export const WithIndex: Story = {
  args: {
    index: "03",
    eyebrow: "Marcas parceiras",
    brands: [
      "Maison Lumière",
      "Atelier Côte",
      "Botânica Pura",
      "Maré Alta",
      "Dermo Lab",
    ],
  },
};
