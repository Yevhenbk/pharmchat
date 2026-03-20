import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ActivityCard } from "./activity-card";

const meta: Meta<typeof ActivityCard> = {
  title: "UI/ActivityCard",
  component: ActivityCard,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof ActivityCard>;

export const Active: Story = {
  args: {
    title: "Placed with McKesson",
    description: "Amoxicillin 500mg · 200 units · $1,200",
    icon: "call",
    poNumber: "1099",
    placedAt: "9:14 AM",
    variant: "active",
  },
};

export const Next: Story = {
  args: {
    title: "Placed with Cardinal",
    description: "Metformin 1000mg · 100 units · $340",
    icon: "call",
    poNumber: "1100",
    placedAt: "9:17 AM",
    variant: "next",
  },
};

export const Queued: Story = {
  args: {
    title: "Pending approval",
    description: "Lisinopril 10mg · 50 units · $89",
    icon: "call",
    poNumber: "1101",
    placedAt: "9:20 AM",
    variant: "queued",
  },
};
