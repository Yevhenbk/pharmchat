import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Slide1 } from "./slide-1";

const meta: Meta<typeof Slide1> = {
  title: "Blocks/Onboarding/Slide1",
  component: Slide1,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof Slide1>;

export const Default: Story = {
  args: {
    by: 0.5,
  },
};

export const FullyVisible: Story = {
  args: {
    by: 1,
  },
};

export const Hidden: Story = {
  args: {
    by: 0,
  },
};
