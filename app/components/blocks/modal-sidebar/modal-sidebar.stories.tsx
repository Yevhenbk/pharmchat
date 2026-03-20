import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ModalSidebar } from "./modal-sidebar";
import type { ActionItemData } from "@models/action-item";

const DEMO_ACTION_ITEMS: ActionItemData[] = [
  {
    id: "action-1",
    type: "order-cancelled",
    title: "Order Cancelled — McKesson",
    description: "Amoxicillin 500mg · 200 units",
    severity: "critical",
    actions: [{ label: "Replace Order" }],
  },
  {
    id: "action-2",
    type: "delayed",
    title: "Delivery Delay",
    description: "Metformin 1000mg · Expected Jan 22",
    severity: "warning",
    actions: [{ label: "Acknowledge" }],
  },
];

const meta: Meta<typeof ModalSidebar> = {
  title: "Blocks/ModalSidebar",
  component: ModalSidebar,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof ModalSidebar>;

export const ActionMode: Story = {
  args: {
    mode: "critical",
    actionItems: DEMO_ACTION_ITEMS,
    selectedActionId: "action-1",
    onSelectAction: fn(),
  },
};
