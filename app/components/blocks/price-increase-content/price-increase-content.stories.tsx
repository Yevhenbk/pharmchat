import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { DEMO_PRICE_INCREASE } from "@demo/action-content-data";
import { PriceIncreaseContent } from "./price-increase-content";

const meta: Meta<typeof PriceIncreaseContent> = {
  title: "Blocks/PriceIncreaseContent",
  component: PriceIncreaseContent,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof PriceIncreaseContent>;

export const Default: Story = {
  args: {
    title: "Price Increase Notice: Alliance Medical",
    subtitle:
      "Atorvastatin 20mg unit price increasing 20% effective April 1, 2026 — approval required.",
    data: DEMO_PRICE_INCREASE,
    onApprove: fn(),
    onReject: fn(),
  },
};

export const MultiSKU: Story = {
  args: {
    title: "Price Increase Notice: ClearPath Rx",
    subtitle: "Multiple SKU price increases effective May 1, 2026.",
    data: {
      vendor: "ClearPath Rx",
      effectiveDate: "May 1, 2026",
      skus: [
        {
          sku: "AMOX500",
          name: "Amoxicillin 500mg Capsules",
          previousUnitPrice: 21.0,
          newUnitPrice: 22.5,
          percentageIncrease: 7,
          monthlyUnits: 240,
        },
        {
          sku: "AZIT250",
          name: "Azithromycin 250mg Tablets",
          previousUnitPrice: 18.5,
          newUnitPrice: 20.0,
          percentageIncrease: 8,
          monthlyUnits: 100,
        },
      ],
      totalMonthlyImpact: 510,
      miraInsight:
        "Combined price increases across Amoxicillin and Azithromycin add $510/month ($6,120 annually). Both products have multiple generic alternatives available at current pricing. Consider an RFQ to MedCore and PharmaLink before accepting these increases.",
    },
    onApprove: fn(),
    onReject: fn(),
  },
};
