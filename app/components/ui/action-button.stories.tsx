import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ActionButton } from "./action-button";

const meta: Meta<typeof ActionButton> = {
  title: "UI/ActionButton",
  component: ActionButton,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof ActionButton>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Review & Approve",
    onClick: fn(),
  },
};

export const Ignore: Story = {
  args: {
    variant: "ignore",
    children: "Ignore",
    onClick: fn(),
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "View Details",
    onClick: fn(),
  },
};
