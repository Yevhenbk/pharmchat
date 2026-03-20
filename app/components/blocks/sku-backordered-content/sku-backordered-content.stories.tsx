import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import {
  DEMO_SKU_BACKORDERED_CRITICAL,
  DEMO_SKU_BACKORDERED_WARNING,
} from "@demo/action-content-data";
import { SkuBackorderedContent } from "./sku-backordered-content";

const meta: Meta<typeof SkuBackorderedContent> = {
  title: "Blocks/SkuBackorderedContent",
  component: SkuBackorderedContent,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof SkuBackorderedContent>;

export const Critical: Story = {
  args: {
    title: "SKU Backordered: Insulin Glargine 100u/mL",
    subtitle:
      "PharmaLink Co. has zero inventory across all Insulin Glargine presentations — stockout in 2 days.",
    data: DEMO_SKU_BACKORDERED_CRITICAL,
    onApprove: fn(),
    onReject: fn(),
  },
};

export const CriticalWithNationalShortage: Story = {
  args: {
    title: "SKU Backordered: Insulin Glargine 100u/mL",
    subtitle:
      "PharmaLink Co. has zero inventory across all Insulin Glargine presentations — FDA national shortage active.",
    data: DEMO_SKU_BACKORDERED_CRITICAL,
    disruptionReport: {
      severity: "CRITICAL",
      recommendedAction: "Source an approved alternative or emergency allocation immediately",
      isNationalShortage: true,
      medicationName: "insulin glargine",
    },
    onApprove: fn(),
    onReject: fn(),
  },
};

export const Warning: Story = {
  args: {
    title: "SKU Backordered: Warfarin Sodium 5mg",
    subtitle:
      "Apex Pharma unable to supply Warfarin Sodium 5mg — 14-day buffer provides adequate bridging window.",
    data: DEMO_SKU_BACKORDERED_WARNING,
    onApprove: fn(),
    onReject: fn(),
  },
};
