import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ActionPanel } from "./action-panel";

// ActionPanel reads actionItems from useDashboardStore and also uses
// useGlanceStore inside its OrderRunSection. In Storybook those stores
// are not wired up so actionItems defaults to an empty array and the
// PO Queue section is shown with the poCount prop.

const meta: Meta<typeof ActionPanel> = {
  title: "Blocks/ActionPanel",
  component: ActionPanel,
  args: {
    onOpenPOQueue: fn(),
    onOpenAction: fn(),
    onDismissAction: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof ActionPanel>;

export const RxDeck: Story = {
  args: {
    activeTab: "rx-deck",
    poCount: 7,
  },
};

export const OrderRunTab: Story = {
  args: {
    activeTab: "order-run",
    poCount: 7,
  },
};

export const NoPOs: Story = {
  args: {
    activeTab: "rx-deck",
    poCount: 0,
  },
};
