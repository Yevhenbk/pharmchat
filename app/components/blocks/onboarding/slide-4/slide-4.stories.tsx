import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Slide4 } from "./slide-4";

const meta: Meta<typeof Slide4> = {
  title: "Blocks/Onboarding/Slide4",
  component: Slide4,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof Slide4>;

export const Default: Story = {
  args: {
    onSignIn: fn(),
    onEnterDemo: fn(),
  },
};
