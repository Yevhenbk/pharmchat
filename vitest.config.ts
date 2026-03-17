import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    projects: [
      {
        resolve: {
          alias: {
            "@components": path.join(dirname, "app/components"),
            "@models": path.join(dirname, "app/models"),
            "@services": path.join(dirname, "app/services"),
            "@hooks": path.join(dirname, "app/hooks"),
            "@actions": path.join(dirname, "app/actions"),
            "@styles": path.join(dirname, "app/styles"),
            "@utilities": path.join(dirname, "utilities"),
            "@demo": path.join(dirname, "app/demo"),
            "@demo/*": path.join(dirname, "app/demo/*"),
            "@stores": path.join(dirname, "app/stores"),
            "@providers": path.join(dirname, "app/providers"),
            "@/*": path.join(dirname, "./*"),
          },
        },
        test: {
          name: "unit",
          include: [
            "app/**/*.test.{ts,tsx}",
            "utilities/**/*.test.{ts,tsx}",
          ],
          exclude: ["node_modules", ".next"],
          environment: "jsdom",
          setupFiles: ["./vitest.setup.ts"],
          css: true,
        },
      },
      {
        test: {
          name: "integration",
          include: ["tests/integration/**/*.test.{ts,tsx}"],
          exclude: ["node_modules"],
          environment: "node",
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
