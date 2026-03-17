import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { VendorCardStats } from "./vendor-card-stats";

const meta: Meta<typeof VendorCardStats> = {
  title: "Blocks/SidebarCard/VendorCardStats",
  component: VendorCardStats,
};

export default meta;

type Story = StoryObj<typeof VendorCardStats>;

export const Default: Story = {
  args: {
    value: 4609,
    skuCount: 24,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("VALUE")).toBeInTheDocument();
    await expect(canvas.getByText("SKUS")).toBeInTheDocument();
  },
};
