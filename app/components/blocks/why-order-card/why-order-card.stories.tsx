import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WhyOrderCard } from "./why-order-card";
import { WhyOrderDemandIcon } from "@components/icons/why-order-demand-icon";
import { WhyOrderInventoryIcon } from "@components/icons/why-order-inventory-icon";
import { WhyOrderLeadTimeIcon } from "@components/icons/why-order-lead-time-icon";
import { WhyOrderShieldIcon } from "@components/icons/why-order-shield-icon";
import { WhyOrderTruckIcon } from "@components/icons/why-order-truck-icon";

const meta: Meta<typeof WhyOrderCard> = {
  title: "Blocks/WhyOrderCard",
  component: WhyOrderCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof WhyOrderCard>;

export const Default: Story = {
  args: {
    poNumber: "12345",
    skuLabel: "Atlantic Salmon Fillet — 6oz IQF",
    recommendation: "Order 200 units now to avoid running out on Jan 22.",
    sections: [
      {
        id: "forecasted-demand",
        icon: <WhyOrderDemandIcon />,
        iconClassName: "bg-[var(--color-why-order-demand-bg)]",
        title: "Forecasted Demand",
        body: "Expected usage: ~140 units over the next 2 weeks based on recent sales.",
      },
      {
        id: "current-inventory",
        icon: <WhyOrderInventoryIcon />,
        iconClassName: "bg-[var(--color-why-order-inventory-bg)]",
        title: "Current Inventory",
        body: "On hand: 45 units – this will cover demand until Jan 22.",
      },
      {
        id: "lead-time",
        icon: <div className="relative bottom-[5px]"><WhyOrderLeadTimeIcon /></div>,
        iconClassName: "bg-[var(--color-why-order-lead-time-bg)]",
        title: "Supplier Lead Time",
        body: "Lead time: 5–7 business days. Ordering today keeps you in stock.",
      },
      {
        id: "why-supplier",
        icon: <WhyOrderShieldIcon />,
        iconClassName: "bg-[var(--color-why-order-shield-bg)]",
        title: "Why This Supplier",
        body: (
          <ul className="list-disc list-inside">
            <li>Preferred approved vendor</li>
            <li>Highest on-time delivery rate for this SKU (77%)</li>
            <li>Consistent fill rates over the last 90 days</li>
          </ul>
        ),
      },
      {
        id: "delivery",
        icon: <WhyOrderTruckIcon />,
        iconClassName: "bg-[var(--color-why-order-delivery-bg)]",
        title: "Delivery",
        body: "Estimated delivery within 5 business days to your primary location.",
      },
    ],
  },
};
