import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../Button";
import { Drawer } from "./Drawer";

const meta = {
  title: "UI/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    open: false,
    onClose: () => {},
    title: "Carrinho",
    children: "Conteúdo do drawer.",
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

function DrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir carrinho</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Carrinho">
        <p className="text-muted text-sm">Seu carrinho está vazio.</p>
      </Drawer>
    </>
  );
}

export const Default: Story = {
  render: () => <DrawerDemo />,
};
