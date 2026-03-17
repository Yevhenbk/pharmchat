import type { Preview } from "@storybook/nextjs-vite";
import "../app/styles/globals.scss";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ["Blocks", "Components"],
        method: "alphabetical",
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
