import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { CurrencyInput } from "./CurrencyInput";

const meta = {
  title: "Atoms/CurrencyInput",
  component: CurrencyInput,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { value: 0, onValueChange: () => {} },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CurrencyInput>;

export default meta;

type Story = StoryObj<typeof meta>;

function Controlled(props: { initial: number }) {
  const [value, setValue] = useState(props.initial);
  return <CurrencyInput value={value} onValueChange={setValue} />;
}

export const Default: Story = {
  render: () => <Controlled initial={0} />,
};

export const Filled: Story = {
  render: () => <Controlled initial={249.9} />,
};
