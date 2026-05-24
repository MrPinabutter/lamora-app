import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "@/shared/components/atoms/Input";
import { Field } from "./Field";

const meta = {
  title: "Molecules/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "E-mail",
    htmlFor: "email",
    children: <Input id="email" type="email" placeholder="voce@exemplo.com" />,
  },
};

export const WithHint: Story = {
  args: {
    label: "Senha",
    htmlFor: "password",
    hint: "Mínimo de 8 caracteres",
    children: <Input id="password" type="password" />,
  },
};

export const WithError: Story = {
  args: {
    label: "E-mail",
    htmlFor: "email-error",
    error: "E-mail inválido",
    children: <Input id="email-error" type="email" defaultValue="not-an-email" />,
  },
};
