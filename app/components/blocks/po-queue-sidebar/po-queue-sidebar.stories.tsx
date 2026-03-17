import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import type { ProcurementRunData } from "@models/procurement";
import { POQueueSidebar } from "./po-queue-sidebar";

const MOCK_DATA: ProcurementRunData = {
  stats: {
    purchaseOrderCount: 12,
    supplierCount: 4,
    proposedSpend: 25000,
    stockOutsAtRisk: 18,
  },
  vendors: [
    {
      id: "vendor-1",
      vendorName: "Harvest & Hearth Provisions",
      urgency: "out-of-stock",
      value: 4609,
      skuCount: 24,
      earliestStockout: "22 Jan",
      poSummary: {
        poNumber: "PO-2026-892",
        value: 4609,
        leadTimeDays: 5,
        leadTimeEta: "Feb 22",
        confidencePercent: 94,
        confidenceLabel: "High",
        skuCount: 24,
        skuNote: "3 New Items",
      },
      demandSignal: { summary: "Test signal" },
      riskFactors: [],
      lineItems: [],
    },
    {
      id: "vendor-2",
      vendorName: "SilverFork Specialty Foods",
      urgency: "urgent",
      value: 3200,
      skuCount: 5,
      earliestStockout: "25 Jan",
      poSummary: {
        poNumber: "PO-2026-893",
        value: 3200,
        leadTimeDays: 3,
        leadTimeEta: "Feb 20",
        confidencePercent: 88,
        confidenceLabel: "Medium",
        skuCount: 5,
        skuNote: "",
      },
      demandSignal: { summary: "Test signal" },
      riskFactors: [],
      lineItems: [],
    },
    {
      id: "vendor-3",
      vendorName: "Pacific Rim Seafoods",
      value: 7850,
      skuCount: 12,
      earliestStockout: "15 Feb",
      poSummary: {
        poNumber: "PO-2026-894",
        value: 7850,
        leadTimeDays: 7,
        leadTimeEta: "Feb 24",
        confidencePercent: 91,
        confidenceLabel: "High",
        skuCount: 12,
        skuNote: "",
      },
      demandSignal: { summary: "Test signal" },
      riskFactors: [],
      lineItems: [],
    },
  ],
};

const meta: Meta<typeof POQueueSidebar> = {
  title: "Blocks/POQueueSidebar",
  component: POQueueSidebar,
  args: {
    onSelectVendor: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320, height: 700 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof POQueueSidebar>;

export const Default: Story = {
  args: {
    data: MOCK_DATA,
    selectedVendorId: "vendor-1",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText("Procurement Run"),
    ).toBeInTheDocument();

    await expect(
      canvas.getByText("PURCHASE ORDERS"),
    ).toBeInTheDocument();

    await expect(
      canvas.getByText("PROPOSED SPEND"),
    ).toBeInTheDocument();

    await expect(
      canvas.getByText("STOCK-OUTS AT RISK"),
    ).toBeInTheDocument();
  },
};

export const ClickVendor: Story = {
  args: {
    data: MOCK_DATA,
    selectedVendorId: "vendor-1",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");
    const lastButton = buttons[buttons.length - 1];

    await userEvent.click(lastButton);

    await expect(args.onSelectVendor).toHaveBeenCalledWith(
      "vendor-3",
    );
  },
};
