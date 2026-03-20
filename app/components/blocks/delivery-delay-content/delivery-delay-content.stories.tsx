import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { DEMO_DELIVERY_DELAY } from "@demo/action-content-data";
import { DeliveryDelayContent } from "./delivery-delay-content";

const meta: Meta<typeof DeliveryDelayContent> = {
  title: "Blocks/DeliveryDelayContent",
  component: DeliveryDelayContent,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof DeliveryDelayContent>;

export const Default: Story = {
  args: {
    title: "Delivery Delay: PO #1043",
    subtitle:
      "MedCore Distribution cold-chain vehicle out of service — delivery rescheduled by 48 hours.",
    data: DEMO_DELIVERY_DELAY,
    onAcknowledge: fn(),
  },
};

export const SingleSKU: Story = {
  args: {
    title: "Delivery Delay: PO #1899-ETA",
    subtitle: "Lisinopril 10mg delivery pushed to Thursday.",
    data: {
      ...DEMO_DELIVERY_DELAY,
      affectedSkus: [DEMO_DELIVERY_DELAY.affectedSkus[0]],
    },
    onAcknowledge: fn(),
  },
};
