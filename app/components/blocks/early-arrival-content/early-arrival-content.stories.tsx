import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { DEMO_EARLY_ARRIVAL } from "@demo/action-content-data";
import { EarlyArrivalContent } from "./early-arrival-content";

const meta: Meta<typeof EarlyArrivalContent> = {
  title: "Blocks/EarlyArrivalContent",
  component: EarlyArrivalContent,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof EarlyArrivalContent>;

export const Default: Story = {
  args: {
    title: "Early Arrival: PO #1099",
    subtitle: "PharmaLink delivery arriving 4 hours ahead of schedule — receiving bay action required.",
    data: DEMO_EARLY_ARRIVAL,
    onAcknowledge: fn(),
  },
};

export const AllActionsChecked: Story = {
  args: {
    title: "Early Arrival: PO #1099",
    subtitle: "PharmaLink delivery arriving 4 hours ahead of schedule — receiving bay action required.",
    data: {
      ...DEMO_EARLY_ARRIVAL,
      recommendedActions: DEMO_EARLY_ARRIVAL.recommendedActions.map((a) => ({
        ...a,
        checked: true,
      })),
    },
    onAcknowledge: fn(),
  },
};
