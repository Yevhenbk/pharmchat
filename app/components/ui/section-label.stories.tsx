import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionLabel } from "./section-label";

const meta: Meta<typeof SectionLabel> = {
  title: "UI/SectionLabel",
  component: SectionLabel,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof SectionLabel>;

export const Critical: Story = {
  args: {
    variant: "critical",
    children: "Critical",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning",
  },
};

export const Fyi: Story = {
  args: {
    variant: "fyi",
    children: "FYI",
  },
};

export const TodaysPOs: Story = {
  args: {
    variant: "todays-pos",
    children: "Today's POs",
  },
};
