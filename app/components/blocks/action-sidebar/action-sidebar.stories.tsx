import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import type { ActionItemData } from "@models/action-item";
import { ActionSidebar } from "./action-sidebar";

const MOCK_ITEMS: readonly ActionItemData[] = [
  {
    id: "action-4501",
    type: "order-cancelled",
    severity: "critical",
    title: "Order Cancelled",
    description:
      "Vendor cancelled order due to inventory shortage.",
    actions: [{ label: "Find Alternative" }],
    timeAgo: "1h ago",
  },
  {
    id: "action-4502",
    type: "delayed",
    severity: "warning",
    title: "2 Day Delay",
    description:
      "Shipment delayed by 2 days due to carrier issues.",
    actions: [{ label: "Acknowledge" }],
    timeAgo: "3h ago",
  },
  {
    id: "action-4503",
    type: "price-decrease",
    severity: "fyi",
    title: "Price Update",
    description:
      "Supplier reduced unit price by 8% on seasonal items.",
    actions: [{ label: "Review" }],
  },
  {
    id: "action-4504",
    type: "partial-fill",
    severity: "warning",
    title: "Partial Fill",
    description:
      "Only 60% of order fulfilled. Remaining on backorder.",
    actions: [{ label: "Review" }],
    timeAgo: "5h ago",
  },
];

const meta: Meta<typeof ActionSidebar> = {
  title: "Blocks/ActionSidebar",
  component: ActionSidebar,
  args: {
    onSelectItem: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof ActionSidebar>;

export const Default: Story = {
  args: {
    items: MOCK_ITEMS,
    selectedId: MOCK_ITEMS[0].id,
  },
};

export const WithSelection: Story = {
  args: {
    items: MOCK_ITEMS,
    selectedId: MOCK_ITEMS[2].id,
  },
};
