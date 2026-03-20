import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MiraInsightCard } from "./mira-insight-card";

const meta: Meta<typeof MiraInsightCard> = {
  title: "UI/MiraInsightCard",
  component: MiraInsightCard,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 340 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MiraInsightCard>;

export const Default: Story = {
  args: {
    insight:
      "Based on current demand trends, this SKU is projected to stock out in 4 days. Consider placing a reorder today.",
    isAnalyzing: false,
  },
};

export const Analyzing: Story = {
  args: {
    insight: "",
    isAnalyzing: true,
  },
};
