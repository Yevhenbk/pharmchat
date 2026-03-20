import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatsPanel } from "./stats-panel";

// StatsPanel reads from useDashboardStore (procurementData, confirmedVendorIds)
// and useGlanceStore (overrides, sentPoCount). Without the stores, it renders
// with zero / default values.

const meta: Meta<typeof StatsPanel> = {
  title: "Blocks/StatsPanel",
  component: StatsPanel,
  parameters: {
    docs: {
      description: {
        component:
          "Stats and upcoming-risk panel driven by the global dashboard and glance stores. Shows loading/zero state in isolation.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof StatsPanel>;

export const Default: Story = {
  args: {},
};
