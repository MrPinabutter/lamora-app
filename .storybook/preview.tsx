import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - mostra violações de a11y apenas na UI de testes
      // 'error' - falha o CI em violações de a11y
      // 'off' - desliga a checagem de a11y
      test: "todo",
    },
    options: {
      storySort: {
        order: [
          "Documentação",
          [
            "Introdução",
            "Começando",
            "Arquitetura",
            "Design Tokens",
            "Componentes",
          ],
          "UI",
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-background text-foreground p-6 font-sans">
        <Story />
      </div>
    ),
  ],
};

export default preview;
