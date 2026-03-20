import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import type { SKULineItem } from "@models/procurement";
import { SKUTable } from "./sku-table";

const MOCK_LINE_ITEMS: readonly SKULineItem[] = [
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
  {
    id: "li-4",
    skuCode: "LISIN10",
    name: "Lisinopril 10mg Tablets",
    status: "normal",
    currentInventory: 88,
    runOutDate: "Mar 30",
    unitPrice: 9.5,
    recommendedQuantity: 200,
    orderValue: 1900,
  },
];

const meta: Meta<typeof SKUTable> = {
  title: "Blocks/SKUTable",
  component: SKUTable,
  decorators: [
    (Story) => (
      <div style={{ width: 900 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SKUTable>;

export const Default: Story = {
  args: {
    lineItems: MOCK_LINE_ITEMS,
    totalValue: 12670,
    onQuantityChange: fn(),
    onInventoryChange: fn(),
    onRemoveItem: fn(),
    onInfoClick: fn(),
    onConfirm: fn(),
  },
};

export const SingleItem: Story = {
  args: {
    lineItems: [MOCK_LINE_ITEMS[0]],
    totalValue: 5040,
    onQuantityChange: fn(),
    onInventoryChange: fn(),
    onRemoveItem: fn(),
    onInfoClick: fn(),
    onConfirm: fn(),
  },
};

export const WithoutInventoryEdit: Story = {
  args: {
    lineItems: MOCK_LINE_ITEMS,
    totalValue: 12670,
    onQuantityChange: fn(),
    onRemoveItem: fn(),
    onInfoClick: fn(),
    onConfirm: fn(),
  },
};
