import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProgressBar } from "./progress-bar";

const meta: Meta<typeof ProgressBar> = {
  title: "UI/ProgressBar",
  component: ProgressBar,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Full: Story = {
  args: {
    value: 100,
  },
};

export const Overflowed: Story = {
  args: {
    value: 150,
  },
};
