import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import {
  DEMO_PARTIAL_FILL_CRITICAL,
  DEMO_PARTIAL_FILL_WARNING,
} from "@demo/action-content-data";
import { PartialFillContent } from "./partial-fill-content";

const meta: Meta<typeof PartialFillContent> = {
  title: "Blocks/PartialFillContent",
  component: PartialFillContent,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof PartialFillContent>;

export const Critical: Story = {
  args: {
    title: "Partial Fill: PO #2026-1802",
    subtitle:
      "MedCore Distribution can only supply 50% of Metformin 1000mg ER — 4 days on-hand remaining.",
    data: DEMO_PARTIAL_FILL_CRITICAL,
    onApprove: fn(),
    onReject: fn(),
  },
};

export const Warning: Story = {
  args: {
    title: "Partial Fill: PO #2026-1047",
    subtitle:
      "Alliance Medical supplying 180 of 200 Lisinopril 10mg tablets — 14-day buffer maintained.",
    data: DEMO_PARTIAL_FILL_WARNING,
    onApprove: fn(),
    onReject: fn(),
  },
};
