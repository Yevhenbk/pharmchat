import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ContentSectionLabel } from "./content-section-label";

const meta: Meta<typeof ContentSectionLabel> = {
  title: "UI/ContentSectionLabel",
  component: ContentSectionLabel,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof ContentSectionLabel>;

export const Default: Story = {
  args: {
    children: "Order Summary",
  },
};

export const LongLabel: Story = {
  args: {
    children: "Procurement Activity This Week",
  },
};
