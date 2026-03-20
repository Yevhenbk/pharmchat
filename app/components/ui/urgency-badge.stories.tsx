import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UrgencyBadge } from "./urgency-badge";

const meta: Meta<typeof UrgencyBadge> = {
  title: "UI/UrgencyBadge",
  component: UrgencyBadge,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof UrgencyBadge>;

export const OutOfStock: Story = {
  args: {
    urgency: "out-of-stock",
  },
};

export const Urgent: Story = {
  args: {
    urgency: "urgent",
  },
};
