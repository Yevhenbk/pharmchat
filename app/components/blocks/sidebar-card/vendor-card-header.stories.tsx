import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { VendorCardHeader } from "./vendor-card-header";

const meta: Meta<typeof VendorCardHeader> = {
  title: "Blocks/SidebarCard/VendorCardHeader",
  component: VendorCardHeader,
};

export default meta;

type Story = StoryObj<typeof VendorCardHeader>;

export const OutOfStock: Story = {
  args: {
    name: "Harvest & Hearth Provisions",
    urgency: "out-of-stock",
  },
};

export const Urgent: Story = {
  args: {
    name: "SilverFork Specialty Foods",
    urgency: "urgent",
  },
};

export const NoUrgency: Story = {
  args: {
    name: "Green Valley Organics",
  },
};
