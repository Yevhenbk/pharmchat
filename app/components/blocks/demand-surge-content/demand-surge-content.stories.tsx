import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DEMO_DEMAND_SURGE } from "@demo/action-content-data";
import { DemandSurgeContent } from "./demand-surge-content";

const meta: Meta<typeof DemandSurgeContent> = {
  title: "Blocks/DemandSurgeContent",
  component: DemandSurgeContent,
};

export default meta;

type Story = StoryObj<typeof DemandSurgeContent>;

export const Default: Story = {
  args: {
    title: "Demand Surge: PO 892",
    subtitle:
      "Real-time signal processing suggests a 24% increase in seafood demand for the upcoming weekend cycle.",
    data: DEMO_DEMAND_SURGE,
  },
};
