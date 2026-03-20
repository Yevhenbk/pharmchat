import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ActionItem } from "./action-item";

const meta: Meta<typeof ActionItem> = {
  title: "Blocks/ActionItem",
  component: ActionItem,
};

export default meta;

type Story = StoryObj<typeof ActionItem>;

export const Critical: Story = {
  args: {
    item: {
      id: "ai-1",
      type: "order-cancelled",
      severity: "critical",
      title: "Order Cancelled by Vendor",
      description:
        "Vendor cancelled PO-2026-892 due to inventory shortage. Immediate action required.",
      actions: [{ label: "Find Alternative" }],
      ignoreLabel: "Ignore",
    },
    onIgnore: fn(),
    onActionClick: fn(),
  },
};

export const Warning: Story = {
  args: {
    item: {
      id: "ai-2",
      type: "delayed",
      severity: "warning",
      title: "Shipment Delayed 2 Days",
      description: "Carrier delay may impact stock levels for high-demand SKUs.",
      actions: [{ label: "View Details" }],
      ignoreLabel: "Dismiss",
    },
    onIgnore: fn(),
    onActionClick: fn(),
  },
};

export const FYI: Story = {
  args: {
    item: {
      id: "ai-3",
      type: "price-decrease",
      severity: "fyi",
      title: "Price Decrease: Seasonal Items",
      description: "Supplier reduced unit price by 8% on seasonal items.",
      actions: [{ label: "View Order" }],
    },
    onActionClick: fn(),
  },
};

export const NoDescription: Story = {
  args: {
    item: {
      id: "ai-4",
      type: "not-confirmed",
      severity: "warning",
      title: "Order Not Confirmed",
      description: "",
      actions: [{ label: "Follow Up" }],
      ignoreLabel: "Ignore",
    },
    onIgnore: fn(),
    onActionClick: fn(),
  },
};

export const MultipleActions: Story = {
  args: {
    item: {
      id: "ai-5",
      type: "sku-backordered",
      severity: "critical",
      title: "SKU Backordered",
      description: "3 SKUs are on backorder with no confirmed delivery date.",
      actions: [{ label: "Source Alternative" }, { label: "Contact Vendor" }],
      ignoreLabel: "Ignore",
    },
    onIgnore: fn(),
    onActionClick: fn(),
  },
};
