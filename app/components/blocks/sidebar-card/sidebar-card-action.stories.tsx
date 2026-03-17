import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SidebarCardAction } from "./sidebar-card-action";

const meta: Meta<typeof SidebarCardAction> = {
  title: "Blocks/SidebarCard/SidebarCardAction",
  component: SidebarCardAction,
};

export default meta;

type Story = StoryObj<typeof SidebarCardAction>;

export const Critical: Story = {
  args: {
    poNumber: "PO 4501",
    typeLabel: "Order Cancelled",
    severity: "critical",
    description:
      "Vendor cancelled order due to inventory shortage. " +
      "Immediate action required to source alternative.",
  },
};

export const Warning: Story = {
  args: {
    poNumber: "PO 4502",
    typeLabel: "2 Day Delay",
    severity: "warning",
    description:
      "Shipment delayed by 2 days due to carrier issues. " +
      "May impact stock levels for high-demand SKUs.",
  },
};

export const FYI: Story = {
  args: {
    poNumber: "PO 4503",
    typeLabel: "Price Update: Decrease",
    severity: "fyi",
    description:
      "Supplier reduced unit price by 8% on seasonal items.",
  },
};

export const WithTimeAgo: Story = {
  args: {
    poNumber: "PO 4504",
    typeLabel: "Partial Fill - Inventory at Risk",
    severity: "warning",
    description:
      "Only 60% of order fulfilled. Remaining items on " +
      "backorder with no confirmed delivery date.",
    timeAgo: "2h ago",
  },
};
