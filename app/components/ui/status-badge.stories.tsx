import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatusBadge } from "./status-badge";

const meta: Meta<typeof StatusBadge> = {
  title: "UI/StatusBadge",
  component: StatusBadge,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof StatusBadge>;

export const Live: Story = {
  args: {
    variant: "live",
  },
};

export const Done: Story = {
  args: {
    variant: "done",
  },
};
