import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { POSummary } from "@models/procurement";
import { POSummaryBar } from "./po-summary-bar";

const MOCK_SUMMARY: POSummary = {
  poNumber: "PO-1099",
  value: 8640,
  leadTimeDays: 3,
  leadTimeEta: "Mar 22",
  confidencePercent: 92,
  confidenceLabel: "High",
  skuCount: 6,
  skuNote: "2 at risk",
};

const meta: Meta<typeof POSummaryBar> = {
  title: "Blocks/POSummaryBar",
  component: POSummaryBar,
};

export default meta;
type Story = StoryObj<typeof POSummaryBar>;

export const Default: Story = {
  args: {
    summary: MOCK_SUMMARY,
  },
};

export const HighConfidence: Story = {
  args: {
    summary: {
      poNumber: "PO-5444",
      value: 4200,
      leadTimeDays: 3,
      leadTimeEta: "Mar 22",
      confidencePercent: 97,
      confidenceLabel: "Very High",
      skuCount: 4,
      skuNote: "Arriving early",
    },
  },
};

export const MediumConfidence: Story = {
  args: {
    summary: {
      poNumber: "PO-1042",
      value: 6480,
      leadTimeDays: 5,
      leadTimeEta: "Mar 24",
      confidencePercent: 85,
      confidenceLabel: "Medium",
      skuCount: 4,
      skuNote: "1 at risk",
    },
  },
};
