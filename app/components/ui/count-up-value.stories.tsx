import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CountUpValue } from "./count-up-value";

const meta: Meta<typeof CountUpValue> = {
  title: "UI/CountUpValue",
  component: CountUpValue,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof CountUpValue>;

export const Default: Story = {
  args: {
    target: 1234,
  },
};

export const WithPrefix: Story = {
  args: {
    target: 9999,
    prefix: "$",
  },
};

export const WithSeparator: Story = {
  args: {
    target: 1250000,
    separator: true,
  },
};

export const WithDelay: Story = {
  args: {
    target: 500,
    delay: 600,
  },
};
