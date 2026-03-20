import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatRow } from "./stat-row";

const meta: Meta<typeof StatRow> = {
  title: "UI/StatRow",
  component: StatRow,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof StatRow>;

export const Default: Story = {
  args: {
    label: "Fill Rate",
    value: "94.2%",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Total Orders",
    value: 142,
    icon: (
      <svg viewBox="0 0 18 18" fill="currentColor" aria-hidden>
        <rect x="2" y="2" width="14" height="14" rx="2" />
      </svg>
    ),
  },
};

export const NumericValue: Story = {
  args: {
    label: "Units Ordered",
    value: 2450,
  },
};
