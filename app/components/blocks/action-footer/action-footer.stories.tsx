import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ActionFooter } from "./action-footer";

const meta: Meta<typeof ActionFooter> = {
  title: "Blocks/ActionFooter",
  component: ActionFooter,
};

export default meta;

type Story = StoryObj<typeof ActionFooter>;

export const ApproveReject: Story = {
  args: {
    variant: "approve-reject",
    onApprove: fn(),
    onReject: fn(),
  },
};

export const AcknowledgeDelay: Story = {
  args: {
    variant: "acknowledge",
    acknowledgeLabel: "Acknowledge Delay",
    onAcknowledge: fn(),
  },
};

export const AcknowledgeEarlyArrival: Story = {
  args: {
    variant: "acknowledge",
    acknowledgeLabel: "Acknowledge Early Arrival",
    onAcknowledge: fn(),
  },
};
