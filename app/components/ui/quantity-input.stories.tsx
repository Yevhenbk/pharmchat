import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { QuantityInput } from "./quantity-input";

const meta: Meta<typeof QuantityInput> = {
  title: "UI/QuantityInput",
  component: QuantityInput,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof QuantityInput>;

export const Default: Story = {
  args: {
    value: 1,
    onChange: fn(),
  },
};

export const LargeQuantity: Story = {
  args: {
    value: 500,
    onChange: fn(),
  },
};

export const Zero: Story = {
  args: {
    value: 0,
    onChange: fn(),
  },
};
