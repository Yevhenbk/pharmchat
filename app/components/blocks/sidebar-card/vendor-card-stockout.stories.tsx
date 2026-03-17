import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { VendorCardStockout } from "./vendor-card-stockout";

const meta: Meta<typeof VendorCardStockout> = {
  title: "Blocks/SidebarCard/VendorCardStockout",
  component: VendorCardStockout,
};

export default meta;

type Story = StoryObj<typeof VendorCardStockout>;

export const Normal: Story = {
  args: {
    earliestStockout: "15 Feb",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText("EARLIEST STOCKOUT"),
    ).toBeInTheDocument();

    await expect(
      canvas.getByText("15 FEB"),
    ).toBeInTheDocument();
  },
};

export const Urgent: Story = {
  args: {
    earliestStockout: "22 Jan",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText("EARLIEST STOCKOUT"),
    ).toBeInTheDocument();

    await expect(
      canvas.getByText("22 JAN"),
    ).toBeInTheDocument();
  },
};
