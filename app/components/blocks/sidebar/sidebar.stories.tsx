import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Sidebar } from "./sidebar";

// Sidebar uses next-auth useSession and useDashboardStore.openChat.
// In Storybook those integrations are not wired up; the component
// renders without a user (showing the Sign-in button) by default.

const meta: Meta<typeof Sidebar> = {
  title: "Blocks/Sidebar",
  component: Sidebar,
  args: {
    onTabChange: fn(),
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const RxDeckActive: Story = {
  args: {
    activeTab: "rx-deck",
  },
};

export const OrderRunActive: Story = {
  args: {
    activeTab: "order-run",
  },
};
