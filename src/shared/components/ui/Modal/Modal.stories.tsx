import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../Button";
import { Modal } from "./Modal";

const meta = {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    open: false,
    onClose: () => {},
    title: "Confirmar exclusão",
    children: "Conteúdo do modal.",
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirmar exclusão"
      >
        <p className="text-muted mb-4 text-sm">
          Esta ação não pode ser desfeita. Deseja continuar?
        </p>
        <Button variant="secondary" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => <ModalDemo />,
};
