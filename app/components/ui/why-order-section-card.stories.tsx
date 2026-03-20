import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WhyOrderSectionCard } from "./why-order-section-card";

const meta: Meta<typeof WhyOrderSectionCard> = {
  title: "UI/WhyOrderSectionCard",
  component: WhyOrderSectionCard,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof WhyOrderSectionCard>;

export const Default: Story = {
  args: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
      </svg>
    ),
    title: "Stock Level Alert",
    body: "Current stock is projected to run out in 4 days based on recent demand.",
  },
};

export const WithListBody: Story = {
  args: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    iconClassName: "bg-yellow-100",
    title: "Price Change",
    body: (
      <ul>
        <li>Price increased 12% this week</li>
        <li>Supplier contract expires soon</li>
      </ul>
    ),
  },
};

export const WithIconClassName: Story = {
  args: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <circle cx="12" cy="12" r="8" />
      </svg>
    ),
    iconClassName: "bg-green-100 text-green-600",
    title: "Demand Surge",
    body: "Unusually high demand detected over the past 48 hours.",
  },
};
