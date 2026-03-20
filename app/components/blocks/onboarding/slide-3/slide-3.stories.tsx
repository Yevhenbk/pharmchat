import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Slide3 } from "./slide-3";

const meta: Meta<typeof Slide3> = {
  title: "Blocks/Onboarding/Slide3",
  component: Slide3,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof Slide3>;

export const Default: Story = {
  args: {
    by: 0.5,
  },
};

export const WithCrossedOut: Story = {
  args: {
    by: 0.9,
  },
};

export const Hidden: Story = {
  args: {
    by: 0,
  },
};
