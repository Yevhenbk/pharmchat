import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { AskMiraWidget } from "./ask-mira-widget";

const meta: Meta<typeof AskMiraWidget> = {
  title: "Blocks/AskMiraWidget",
  component: AskMiraWidget,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof AskMiraWidget>;

export const Default: Story = {
  args: {
    onClick: fn(),
  },
};

export const WithClassName: Story = {
  args: {
    className: "w-64",
    onClick: fn(),
  },
};
