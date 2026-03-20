import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageHeader } from "./page-header";

// Note: PageHeader reads procurementData and confirmedVendorIds from
// useDashboardStore. In Storybook the store is not wired up, so chips
// will render with "–" placeholders by default.

const meta: Meta<typeof PageHeader> = {
  title: "Blocks/PageHeader",
  component: PageHeader,
  parameters: {
    docs: {
      description: {
        component:
          "Page header that reads live procurement stats from the global dashboard store. Stats chips show \"–\" in isolation.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {},
};
