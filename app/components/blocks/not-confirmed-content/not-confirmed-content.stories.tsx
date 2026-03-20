import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { DEMO_NOT_CONFIRMED } from "@demo/action-content-data";
import { NotConfirmedContent } from "./not-confirmed-content";

const meta: Meta<typeof NotConfirmedContent> = {
  title: "Blocks/NotConfirmedContent",
  component: NotConfirmedContent,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof NotConfirmedContent>;

export const Default: Story = {
  args: {
    title: "PO Confirmation Overdue: PO #2026-1051",
    subtitle:
      "PharmaLink Co. has not confirmed PO #2026-1051 — 48 hours overdue. Chase required.",
    data: DEMO_NOT_CONFIRMED,
    onAcknowledge: fn(),
  },
};

export const SingleSKU: Story = {
  args: {
    title: "PO Confirmation Overdue: PO #2026-1890",
    subtitle: "Apex Pharma has not confirmed PO #2026-1890 — 12 hours overdue.",
    data: {
      vendor: "Apex Pharma",
      poNumber: "PO #2026-1890",
      poValue: 4200,
      expectedBy: "Mar 20, 09:00 AM",
      hoursOverdue: 12,
      scheduledDelivery: "Mar 27",
      skus: [
        {
          sku: "DOXY100",
          name: "Doxycycline Hyclate 100mg Tablets",
          quantity: "x 160 TAB",
        },
      ],
      miraInsight:
        "12 hours without confirmation is within the warning threshold but warrants a proactive chase. Apex Pharma has a reliable track record — a brief follow-up email should be sufficient at this stage.",
    },
    onAcknowledge: fn(),
  },
};
