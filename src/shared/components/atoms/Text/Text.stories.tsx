import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Text } from "./Text";

const meta = {
  title: "Atoms/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: [
        "display",
        "h1",
        "h2",
        "h3",
        "lead",
        "body",
        "caption",
        "eyebrow",
      ],
    },
    tone: {
      control: "inline-radio",
      options: ["default", "muted", "accent"],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Display: Story = {
  args: { variant: "display", children: "Lamora" },
};

export const Heading1: Story = {
  args: { variant: "h1", children: "Pirâmide olfativa" },
};

export const Heading2: Story = {
  args: { variant: "h2", children: "Notas de fundo" },
};

export const Heading3: Story = {
  args: { variant: "h3", children: "Detalhes da fragrância" },
};

export const Lead: Story = {
  args: {
    variant: "lead",
    children:
      "Perfumes, hidratantes e skin care com curadoria minimalista para o dia a dia.",
  },
};

export const Body: Story = {
  args: {
    variant: "body",
    children:
      "A escolha de uma fragrância é íntima. Optamos por uma curadoria reduzida — poucos produtos, escolhidos com critério.",
  },
};

export const Caption: Story = {
  args: { variant: "caption", children: "Estoque limitado" },
};

export const Eyebrow: Story = {
  args: { variant: "eyebrow", children: "Perfumaria" },
};

export const Scale: Story = {
  render: () => (
    <div className="max-w-prose space-y-6">
      <Text variant="eyebrow">Perfumaria</Text>
      <Text variant="display">Lamora</Text>
      <Text variant="lead" tone="muted">
        Curadoria minimalista para o dia a dia — perfumes, hidratantes e skin
        care escolhidos a dedo.
      </Text>
      <Text variant="h1">Pirâmide olfativa</Text>
      <Text variant="h2">Notas de coração</Text>
      <Text variant="h3">Como aplicar</Text>
      <Text variant="body">
        Borrife em pontos de pulso — punhos, atrás das orelhas, pescoço. Evite
        esfregar a pele após a aplicação.
      </Text>
      <Text variant="caption">Disponível em três tamanhos.</Text>
    </div>
  ),
};
