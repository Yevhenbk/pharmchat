import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DEMO_ORDER_CANCELLED } from "@demo/action-content-data";
import { OrderSnapshotCard } from "./order-snapshot-card";

const meta: Meta<typeof OrderSnapshotCard> = {
  title: "Blocks/OrderSnapshotCard",
  component: OrderSnapshotCard,
};

export default meta;

type Story = StoryObj<typeof OrderSnapshotCard>;

export const OriginalOrder: Story = {
  args: {
    label: "ORIGINAL ORDER",
    order: DEMO_ORDER_CANCELLED.originalOrder,
    variant: "default",
  },
};

export const ProposedReplacement: Story = {
  args: {
    label: "PROPOSED REPLACEMENT",
    order: DEMO_ORDER_CANCELLED.proposedReplacement,
    variant: "highlight",
    costDelta: DEMO_ORDER_CANCELLED.costDelta,
    leadTimeDelta: DEMO_ORDER_CANCELLED.leadTimeDelta,
  },
};

