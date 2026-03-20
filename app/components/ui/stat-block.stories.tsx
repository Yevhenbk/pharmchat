import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatBlock } from "./stat-block";

const meta: Meta<typeof StatBlock> = {
  title: "UI/StatBlock",
  component: StatBlock,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof StatBlock>;

export const Default: Story = {
  args: {
    label: "Total Orders",
    value: "142",
  },
};

export const NumericValue: Story = {
  args: {
    label: "Revenue",
    value: 24350,
  },
};

export const WithChildren: Story = {
  args: {
    label: "Fill Rate",
    value: "94.2%",
    children: <span style={{ fontSize: 10, color: "green" }}>+2.1% this week</span>,
  },
};
