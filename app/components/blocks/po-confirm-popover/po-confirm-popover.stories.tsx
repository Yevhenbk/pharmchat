import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import type { VendorOrder } from "@models/procurement";
import { POConfirmPopover } from "./po-confirm-popover";

const MOCK_VENDOR: VendorOrder = {
  id: "medcore-dist",
  vendorName: "MedCore Distribution",
  urgency: "out-of-stock",
  value: 8640,
  skuCount: 3,
  earliestStockout: "Mar 19",
  supplierEmail: "s.mills@medcore-distribution.com",
  poSummary: {
    poNumber: "PO-1099",
    value: 8640,
    leadTimeDays: 3,
    leadTimeEta: "Mar 22",
    confidencePercent: 92,
    confidenceLabel: "High",
    skuCount: 3,
    skuNote: "2 at risk",
  },
  demandSignal: { summary: "Seasonal respiratory illness peak." },
  riskFactors: [],
  lineItems: [
    {
      id: "li-1",
      skuCode: "AMOX500",
      name: "Amoxicillin 500mg Capsules",
      status: "out-of-stock",
      currentInventory: 0,
      runOutDate: "Mar 17",
      unitPrice: 21.0,
      recommendedQuantity: 240,
      orderValue: 5040,
    },
    {
      id: "li-2",
      skuCode: "AZIT250",
      name: "Azithromycin 250mg Tablets",
      status: "urgent",
      currentInventory: 12,
      runOutDate: "Mar 21",
      unitPrice: 18.5,
      recommendedQuantity: 180,
      orderValue: 3330,
    },
    {
      id: "li-3",
      skuCode: "MET500",
      name: "Metformin 500mg Tablets",
      status: "low-stock",
      currentInventory: 45,
      runOutDate: "Mar 25",
      unitPrice: 8.0,
      recommendedQuantity: 300,
      orderValue: 2400,
    },
  ],
};

const meta: Meta<typeof POConfirmPopover> = {
  title: "Blocks/POConfirmPopover",
  component: POConfirmPopover,
  decorators: [
    (Story) => (
      <div style={{ width: 480, minHeight: 400, position: "relative" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof POConfirmPopover>;

export const Default: Story = {
  args: {
    vendor: MOCK_VENDOR,
    totalValue: 10770,
    onNextVendor: fn(),
  },
};

export const CustomNextLabel: Story = {
  args: {
    vendor: MOCK_VENDOR,
    totalValue: 10770,
    nextLabel: "Done",
    onNextVendor: fn(),
  },
};
