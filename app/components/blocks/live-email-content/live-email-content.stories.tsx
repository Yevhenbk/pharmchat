import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { LiveEmailContent } from "./live-email-content";
import type { LiveEmailData } from "@models/action-content";

const DEMO_DATA: LiveEmailData = {
  email: {
    from: "orders@mckesson.com",
    to: "procurement@pharmacy.com",
    subject: "Order Confirmation — PO-2024-0115",
    date: "Jan 15, 2024",
    body: "Dear Pharmacy Team,\n\nYour order has been confirmed.\n\nThank you for your business.",
  },
  classifiedAs: "Order Confirmation",
  miraInsight:
    "This order confirmation aligns with your formulary needs. All SKUs are in stock and shipping on schedule.",
  footerVariant: "acknowledge",
};

const DEMO_DATA_WITH_ANALYSIS: LiveEmailData = {
  ...DEMO_DATA,
  footerVariant: "approve-reject",
  analysis: {
    orderDetails: {
      vendor: "McKesson",
      skus: "Amoxicillin 500mg, Metformin 1000mg",
      quantity: "500 units",
      value: "$2,340.00",
      date: "Jan 15, 2024",
      poRef: "PO-2024-0115",
    },
    impactAnalysis: {
      stockoutRisk: "Low",
      financialExposure: "$2,340",
      rxAtRisk: "0",
      shortageListed: "No",
    },
    recommendedActions: [
      "Approve the order as submitted",
      "Verify delivery address matches primary location",
      "Update formulary records post-delivery",
    ],
    miraInsight:
      "Order is within budget and covers 30-day supply for all critical SKUs.",
    ifIgnored:
      "Stock levels will fall below safety threshold within 5 days, risking stockout.",
    ifActioned:
      "Maintains adequate supply through end of month with buffer for emergency dispensing.",
  },
};

const meta: Meta<typeof LiveEmailContent> = {
  title: "Blocks/LiveEmailContent",
  component: LiveEmailContent,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof LiveEmailContent>;

export const Analyzing: Story = {
  args: {
    title: "Order Confirmation",
    subtitle: "McKesson · Jan 15, 2024",
    data: DEMO_DATA,
    isAnalyzing: true,
    onAcknowledge: fn(),
  },
};

export const WithAnalysis: Story = {
  args: {
    title: "Order Confirmation",
    subtitle: "McKesson · Jan 15, 2024",
    data: DEMO_DATA_WITH_ANALYSIS,
    isAnalyzing: false,
    onApprove: fn(),
    onReject: fn(),
  },
};

export const AnalysisFailed: Story = {
  args: {
    title: "Order Confirmation",
    subtitle: "McKesson · Jan 15, 2024",
    data: DEMO_DATA,
    isAnalyzing: false,
    analysisFailed: true,
    onRetryAnalysis: fn(),
    onAcknowledge: fn(),
  },
};
