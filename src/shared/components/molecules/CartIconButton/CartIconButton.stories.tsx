import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CartIconButton } from "./CartIconButton";

const meta = {
  title: "Molecules/CartIconButton",
  component: CartIconButton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { onClick: () => {} },
} satisfies Meta<typeof CartIconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = { args: { count: 0 } };

export const WithItems: Story = { args: { count: 3 } };

export const LargeCount: Story = { args: { count: 12 } };
