import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DashboardContent } from "./dashboard-content";

// DashboardContent is the full-page layout shell. It composes many blocks that
// each pull from the global dashboard store. Rendering it in Storybook will
// show the skeleton/loading state of each child panel.

const meta: Meta<typeof DashboardContent> = {
  title: "Blocks/DashboardContent",
  component: DashboardContent,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Full-page dashboard layout that assembles Sidebar, PageHeader, ActionPanel, ActivityFeed, StatsPanel and the DeckModal. All data is sourced from the global store; this story shows the unpopulated/skeleton state.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DashboardContent>;

export const Default: Story = {};
