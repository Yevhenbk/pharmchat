import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import type { VendorOrder } from "@models/procurement";
import { SKUReasoningSidebar } from "./sku-reasoning-sidebar";

const MOCK_VENDOR: VendorOrder = {
  id: "medcore-dist",
  vendorName: "MedCore Distribution",
  urgency: "out-of-stock",
  value: 8640,
  skuCount: 2,
  earliestStockout: "Mar 19",
  supplierEmail: "s.mills@medcore-distribution.com",
  poSummary: {
    poNumber: "PO-1099",
    value: 8640,
    leadTimeDays: 3,
    leadTimeEta: "Mar 22",
    confidencePercent: 92,
    confidenceLabel: "High",
    skuCount: 2,
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
  ],
};

const meta: Meta<typeof SKUReasoningSidebar> = {
  title: "Blocks/SKUReasoningSidebar",
  component: SKUReasoningSidebar,
  decorators: [
    (Story) => (
      <div style={{ width: 420, minHeight: 500, position: "relative" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SKUReasoningSidebar>;

export const Default: Story = {
  args: {
    open: true,
    skuId: "li-1",
    vendor: MOCK_VENDOR,
    onClose: fn(),
  },
};

export const SecondItem: Story = {
  args: {
    open: true,
    skuId: "li-2",
    vendor: MOCK_VENDOR,
    onClose: fn(),
  },
};

export const Closed: Story = {
  args: {
    open: false,
    skuId: "li-1",
    vendor: MOCK_VENDOR,
    onClose: fn(),
  },
};
