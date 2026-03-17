import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DEMO_EARLY_ARRIVAL } from "@demo/action-content-data";
import { EarlyArrivalContent } from "./early-arrival-content";

const meta: Meta<typeof EarlyArrivalContent> = {
  title: "Blocks/EarlyArrivalContent",
  component: EarlyArrivalContent,
};

export default meta;

type Story = StoryObj<typeof EarlyArrivalContent>;

export const Default: Story = {
  args: {
    title: "Early Arrival: PO 1099",
    subtitle:
      "Logistics update from Pacific Rim Seafood indicates a shift in the delivery window.",
    data: DEMO_EARLY_ARRIVAL,
  },
};
