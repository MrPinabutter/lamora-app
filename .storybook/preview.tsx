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
      test: "todo",
    },
    options: {
      storySort: {
        order: [
          "Documentation",
          [
            "Introduction",
            "Getting Started",
            "Architecture",
            "Design Tokens",
            "Components",
          ],
          "Atoms",
          "Molecules",
          "Organisms",
        ],
      },
    },
  },
  decorators: [(Story) => <Story />],
};

export default preview;
