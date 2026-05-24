import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SiteNav } from "./SiteNav";

const meta = {
  title: "Molecules/SiteNav",
  component: SiteNav,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    nextjs: { navigation: { pathname: "/produtos" } },
  },
} satisfies Meta<typeof SiteNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    links: [{ href: "/produtos", label: "Produtos" }],
  },
};

export const MultipleLinks: Story = {
  args: {
    links: [
      { href: "/produtos", label: "Produtos" },
      { href: "/marcas", label: "Marcas" },
      { href: "/sobre", label: "Sobre" },
    ],
  },
};

export const NoActive: Story = {
  parameters: { nextjs: { navigation: { pathname: "/" } } },
  args: {
    links: [
      { href: "/produtos", label: "Produtos" },
      { href: "/sobre", label: "Sobre" },
    ],
  },
};
