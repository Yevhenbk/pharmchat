import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { EditableStatValue } from "./editable-stat-value";

const meta: Meta<typeof EditableStatValue> = {
  title: "UI/EditableStatValue",
  component: EditableStatValue,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof EditableStatValue>;

export const Default: Story = {
  args: {
    value: 1200,
    onChange: fn(),
  },
};

export const WithPrefix: Story = {
  args: {
    value: 4500,
    prefix: "$",
    onChange: fn(),
  },
};

export const WithSeparator: Story = {
  args: {
    value: 125000,
    separator: true,
    onChange: fn(),
  },
};

export const WithPrefixAndSeparator: Story = {
  args: {
    value: 99500,
    prefix: "$",
    separator: true,
    onChange: fn(),
  },
};
