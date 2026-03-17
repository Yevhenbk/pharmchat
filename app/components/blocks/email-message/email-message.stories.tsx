import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EmailMessage } from "./email-message";

const meta: Meta<typeof EmailMessage> = {
  title: "Blocks/EmailMessage",
  component: EmailMessage,
};

export default meta;

type Story = StoryObj<typeof EmailMessage>;

export const Full: Story = {
  args: {
    data: {
      from: "ops@blueseaproducts.com",
      to: "procurement@burnt.com",
      cc: "manager@burnt.com",
      date: "Jan 15, 2026",
      subject: "PO #2026-892 Cancellation Notice",
      body: "Sara,\n\nWe regret to inform you that we are unable to fulfill Purchase Order #2026-892 for 240 units of SKU-481 (Atlantic Salmon Fillet 6oz FQF). Due to an unexpected supply disruption at our Pacific Northwest processing facility following adverse weather conditions, our current inventory has depleted.\n\nWe sincerely apologise for the inconvenience; we are working to restore capacity by Q2.\n\nRegards, James.",
    },
  },
};

export const Minimal: Story = {
  args: {
    data: {
      from: "Elena Rossi (Sunrise Organic Farms)",
      subject: "Update on PO #1043 Delivery Schedule",
      body: "Hi team, just a quick update that our primary refrigeration unit required an emergency repair this morning. We are pushing all Tuesday deliveries to Thursday morning. We expect to be back on our regular schedule by the end of the week. Sorry for the inconvenience.",
    },
  },
};
