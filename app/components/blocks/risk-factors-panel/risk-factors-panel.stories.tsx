import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { RiskFactor } from "@models/procurement";
import { RiskFactorsPanel } from "./risk-factors-panel";

const meta: Meta<typeof RiskFactorsPanel> = {
  title: "Blocks/RiskFactorsPanel",
  component: RiskFactorsPanel,
};

export default meta;

type Story = StoryObj<typeof RiskFactorsPanel>;

const MOCK_FACTORS: readonly RiskFactor[] = [
  { id: "rf-1", label: "Demand Spike (+15%)", severity: "critical" },
  { id: "rf-2", label: "Weather warning — supply chain disruption", severity: "warning" },
  { id: "rf-3", label: "New seasonal SKU added", severity: "info" },
];

export const WithFactors: Story = {
  args: {
    factors: MOCK_FACTORS,
  },
};

export const SingleFactor: Story = {
  args: {
    factors: [
      { id: "rf-1", label: "National shortage: Amoxicillin", severity: "critical" },
    ],
  },
};

export const Empty: Story = {
  args: {
    factors: [],
  },
};
