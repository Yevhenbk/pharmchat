import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { ProcurementStats } from "./procurement-stats";

const meta: Meta<typeof ProcurementStats> = {
  title: "Blocks/ProcurementStats",
  component: ProcurementStats,
};

export default meta;

type Story = StoryObj<typeof ProcurementStats>;

export const Default: Story = {
  args: {
    stats: {
      purchaseOrderCount: 12,
      supplierCount: 4,
      proposedSpend: 25000,
      stockOutsAtRisk: 18,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText("PURCHASE ORDERS"),
    ).toBeInTheDocument();

    await expect(
      canvas.getByText("PROPOSED SPEND"),
    ).toBeInTheDocument();

    await expect(
      canvas.getByText("STOCK-OUTS AT RISK"),
    ).toBeInTheDocument();

    await expect(canvas.getByText("12")).toBeInTheDocument();
    await expect(canvas.getByText("18")).toBeInTheDocument();
  },
};

export const ZeroStockOuts: Story = {
  args: {
    stats: {
      purchaseOrderCount: 5,
      supplierCount: 2,
      proposedSpend: 8400,
      stockOutsAtRisk: 0,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("5")).toBeInTheDocument();
    await expect(canvas.getByText("0")).toBeInTheDocument();
  },
};
