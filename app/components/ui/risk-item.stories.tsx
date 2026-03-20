import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RiskItem } from "./risk-item";

const meta: Meta<typeof RiskItem> = {
  title: "UI/RiskItem",
  component: RiskItem,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof RiskItem>;

export const Default: Story = {
  args: {
    item: {
      id: "1",
      sku: "SKU-001",
      productName: "Amoxicillin 500mg",
      description: "Stock running low — reorder recommended within 3 days",
    },
  },
};

export const Backordered: Story = {
  args: {
    item: {
      id: "2",
      sku: "SKU-042",
      productName: "Lisinopril 10mg",
      description: "Supplier backordered until end of month",
    },
  },
};

export const PriceAlert: Story = {
  args: {
    item: {
      id: "3",
      sku: "SKU-108",
      productName: "Metformin 1000mg",
      description: "Price increased 18% vs last order",
    },
  },
};
