import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RiskBadge } from "./risk-badge";

const meta: Meta<typeof RiskBadge> = {
  title: "UI/RiskBadge",
  component: RiskBadge,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof RiskBadge>;

export const Default: Story = {
  args: {
    children: "FDA Shortage",
  },
};

export const StockRisk: Story = {
  args: {
    children: "Stockout Risk",
  },
};
