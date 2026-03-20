import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ActivitySessionIcon } from "./activity-session-icon";

const meta: Meta<typeof ActivitySessionIcon> = {
  title: "UI/ActivitySessionIcon",
  component: ActivitySessionIcon,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof ActivitySessionIcon>;

export const EmailQueued: Story = {
  args: { icon: "email", variant: "queued" },
};

export const EmailActive: Story = {
  args: { icon: "email", variant: "active" },
};

export const CallQueued: Story = {
  args: { icon: "call", variant: "queued" },
};

export const CallActive: Story = {
  args: { icon: "call", variant: "active" },
};

export const XQueued: Story = {
  args: { icon: "x", variant: "queued" },
};

export const XActive: Story = {
  args: { icon: "x", variant: "active" },
};

export const Next: Story = {
  args: { icon: "email", variant: "next" },
};
