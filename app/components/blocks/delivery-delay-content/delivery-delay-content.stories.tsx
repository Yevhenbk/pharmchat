import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DEMO_DELIVERY_DELAY } from "@demo/action-content-data";
import { DeliveryDelayContent } from "./delivery-delay-content";

const meta: Meta<typeof DeliveryDelayContent> = {
  title: "Blocks/DeliveryDelayContent",
  component: DeliveryDelayContent,
};

export default meta;

type Story = StoryObj<typeof DeliveryDelayContent>;

export const Default: Story = {
  args: {
    title: "Delivery Delay: PO 1043",
    subtitle:
      "Sunrise Organic Farms has updated their delivery schedule due to equipment maintenance.",
    data: DEMO_DELIVERY_DELAY,
  },
};
