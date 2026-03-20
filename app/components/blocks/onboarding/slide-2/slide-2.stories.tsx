import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Slide2 } from "./slide-2";

const meta: Meta<typeof Slide2> = {
  title: "Blocks/Onboarding/Slide2",
  component: Slide2,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof Slide2>;

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
