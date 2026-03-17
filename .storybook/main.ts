import type { StorybookConfig } from "@storybook/nextjs-vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    "../app/components/**/*.mdx",
    "../app/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string>),
      "@components": path.resolve(__dirname, "../app/components"),
      "@utilities": path.resolve(__dirname, "../utilities"),
      "@styles": path.resolve(__dirname, "../app/styles"),
      "@models": path.resolve(__dirname, "../app/models"),
      "@demo": path.resolve(__dirname, "../app/demo"),
    };

    return config;
  },
};

export default config;
