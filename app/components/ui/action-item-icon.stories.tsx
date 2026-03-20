import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ActionItemIcon } from "./action-item-icon";

const meta: Meta<typeof ActionItemIcon> = {
  title: "UI/ActionItemIcon",
  component: ActionItemIcon,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof ActionItemIcon>;

export const OrderCancelled: Story = {
  args: { type: "order-cancelled", size: 20 },
};

export const Delayed: Story = {
  args: { type: "delayed", size: 20 },
};

export const PartialFill: Story = {
  args: { type: "partial-fill", size: 20 },
};

export const SkuBackordered: Story = {
  args: { type: "sku-backordered", size: 20 },
};

export const NotConfirmed: Story = {
  args: { type: "not-confirmed", size: 20 },
};

export const PriceIncrease: Story = {
  args: { type: "price-increase", size: 20 },
};

export const PriceDecrease: Story = {
  args: { type: "price-decrease", size: 20 },
};

export const ArrivingEarly: Story = {
  args: { type: "arriving-early", size: 20 },
};

export const DemandSurge: Story = {
  args: { type: "demand-surge", size: 20 },
};
