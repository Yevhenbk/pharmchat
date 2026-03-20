import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import type { VendorOrder } from "@models/procurement";
import { DEMO_PROCUREMENT_RUN } from "@demo/procurement-run-data";
import { POQueueContent } from "./po-queue-content";

const DEMO_VENDOR: VendorOrder = DEMO_PROCUREMENT_RUN.vendors[0];

function StatefulPOQueueContent(
  props: React.ComponentProps<typeof POQueueContent>,
) {
  const [vendor] = useState<VendorOrder>(props.vendor);

  return <POQueueContent {...props} vendor={vendor} />;
}

const meta: Meta<typeof POQueueContent> = {
  title: "Blocks/POQueueContent",
  component: POQueueContent,
  decorators: [
    (Story, context) => (
      <div style={{ width: 800, minHeight: 600 }}>
        <StatefulPOQueueContent {...(context.args as React.ComponentProps<typeof POQueueContent>)} />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof POQueueContent>;

export const Default: Story = {
  args: {
    vendor: DEMO_VENDOR,
    onSKUInfoClick: fn(),
    onDeleteModalOpenChange: fn(),
    onNextVendor: fn(),
  },
};

export const UrgentVendor: Story = {
  args: {
    vendor: DEMO_PROCUREMENT_RUN.vendors[1],
    onSKUInfoClick: fn(),
    onDeleteModalOpenChange: fn(),
    onNextVendor: fn(),
  },
};
