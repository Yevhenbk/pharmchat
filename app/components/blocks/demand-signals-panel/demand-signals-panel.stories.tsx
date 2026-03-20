import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { DemandSignal } from "@models/procurement";
import { DemandSignalsPanel } from "./demand-signals-panel";

const meta: Meta<typeof DemandSignalsPanel> = {
  title: "Blocks/DemandSignalsPanel",
  component: DemandSignalsPanel,
};

export default meta;

type Story = StoryObj<typeof DemandSignalsPanel>;

const HOLIDAY_SIGNAL: DemandSignal = {
  summary:
    "Projected demand spike correlating with holiday weekend. Historical data shows a 15% uplift in dispensing volume for pain-relief and allergy SKUs.",
};

const SEASONAL_SIGNAL: DemandSignal = {
  summary:
    "Seasonal flu uptick detected. Recommend increasing order quantities for antiviral and decongestant lines by approximately 20%.",
};

export const HolidaySpike: Story = {
  args: {
    signal: HOLIDAY_SIGNAL,
  },
};

export const SeasonalFlu: Story = {
  args: {
    signal: SEASONAL_SIGNAL,
  },
};

export const ShortSummary: Story = {
  args: {
    signal: {
      summary: "Normal seasonal demand patterns observed.",
    },
  },
};
