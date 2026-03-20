import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { DEMO_DEMAND_SURGE } from "@demo/action-content-data";
import { DemandSurgeContent } from "./demand-surge-content";

const meta: Meta<typeof DemandSurgeContent> = {
  title: "Blocks/DemandSurgeContent",
  component: DemandSurgeContent,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof DemandSurgeContent>;

export const Default: Story = {
  args: {
    title: "Demand Surge Detected: Antibiotic Uplift Recommended",
    subtitle:
      "Flu season trend data shows 38% above-baseline dispensing volume. Ozai recommends inventory uplift.",
    data: DEMO_DEMAND_SURGE,
    onApprove: fn(),
    onReject: fn(),
  },
};
