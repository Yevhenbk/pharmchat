import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DEMO_ORDER_CANCELLED } from "@demo/action-content-data";
import { OrderCancelledContent } from "./order-cancelled-content";

const meta: Meta<typeof OrderCancelledContent> = {
  title: "Blocks/OrderCancelledContent",
  component: OrderCancelledContent,
};

export default meta;

type Story = StoryObj<typeof OrderCancelledContent>;

export const Default: Story = {
  args: {
    title: "Order Cancellation: PO 2026-892",
    subtitle:
      "North Harbor Seafoods unable to fulfill 240 units of SKU-481. Alternative vendor found.",
    data: DEMO_ORDER_CANCELLED,
  },
};
