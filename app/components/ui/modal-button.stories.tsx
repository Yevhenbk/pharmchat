import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ModalButton } from "./modal-button";

const meta: Meta<typeof ModalButton> = {
  title: "UI/ModalButton",
  component: ModalButton,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof ModalButton>;

export const Approve: Story = {
  args: {
    variant: "approve",
    onClick: fn(),
    children: "Approve Order",
  },
};

export const Reject: Story = {
  args: {
    variant: "reject",
    onClick: fn(),
    children: "Reject",
  },
};

export const Acknowledge: Story = {
  args: {
    variant: "acknowledge",
    onClick: fn(),
    children: "Acknowledge",
  },
};
