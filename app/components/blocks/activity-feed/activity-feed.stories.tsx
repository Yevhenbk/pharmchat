import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { vi } from "storybook/test";
import { ActivityFeed } from "./activity-feed";

// Note: ActivityFeed reads from useDashboardStore (for initialized state)
// and useActivityFeed hook. In Storybook the store is not wired up, so the
// component will render in its loading (skeleton) state by default.
// The "Loaded" story mocks both dependencies via module-level decorators.

const meta: Meta<typeof ActivityFeed> = {
  title: "Blocks/ActivityFeed",
  component: ActivityFeed,
};

export default meta;

type Story = StoryObj<typeof ActivityFeed>;

export const Loading: Story = {
  name: "Loading (skeleton)",
  args: {},
};

export const Empty: Story = {
  name: "Empty state",
  decorators: [
    (Story) => {
      // Patch the modules so the component sees initialized=true but no items
      vi.mock("@providers/store-provider", () => ({
        useDashboardStore: vi.fn((selector: (s: { procurementData: null }) => unknown) =>
          selector({ procurementData: {} as never }),
        ),
      }));
      vi.mock("@hooks/use-activity-feed", () => ({
        useActivityFeed: vi.fn(() => []),
      }));

      return <Story />;
    },
  ],
};
