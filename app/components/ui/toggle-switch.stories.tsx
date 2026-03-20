import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ToggleSwitch } from "./toggle-switch";

const meta: Meta<typeof ToggleSwitch> = {
  title: "UI/ToggleSwitch",
  component: ToggleSwitch,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof ToggleSwitch>;

export const Unchecked: Story = {
  args: {
    checked: false,
    onChange: fn(),
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    onChange: fn(),
  },
};
