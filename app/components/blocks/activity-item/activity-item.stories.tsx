import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ActivityItem } from "./activity-item";

const meta: Meta<typeof ActivityItem> = {
  title: "Blocks/ActivityItem",
  component: ActivityItem,
};

export default meta;

type Story = StoryObj<typeof ActivityItem>;

export const Live: Story = {
  args: {
    title: "PO submitted to Harvest & Hearth",
    description: "Awaiting vendor confirmation",
    status: "live",
    poNumber: "PO-2026-892",
    time: "2m ago",
  },
};

export const Done: Story = {
  args: {
    title: "Order confirmed by MedSupply Co.",
    description: "All 24 SKUs confirmed",
    status: "done",
    poNumber: "PO-2026-847",
    time: "1h ago",
  },
};

export const NoOptionals: Story = {
  args: {
    title: "Stock level updated",
    status: "done",
  },
};

export const WithDescriptionOnly: Story = {
  args: {
    title: "Reorder triggered for Aspirin 500mg",
    description: "Threshold reached at 12% stock",
    status: "live",
  },
};
