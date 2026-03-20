import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OrderRun } from "./order-run";

// OrderRun reads procurementData and confirmedVendorIds from useDashboardStore,
// and incrementSentPoCount from useGlanceStore. Without those stores being
// populated, the component renders the empty (no pending orders) state.

const meta: Meta<typeof OrderRun> = {
  title: "Blocks/OrderRun",
  component: OrderRun,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Full order-run table. Reads vendor list from the global dashboard store. Shows empty state when the store has no data or all vendors are confirmed.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof OrderRun>;

// Without store data the component renders the "No pending orders" empty state.
export const EmptyState: Story = {
  args: {},
};
