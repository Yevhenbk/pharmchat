import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { DeleteItemModal } from "./delete-item-modal";

const meta: Meta<typeof DeleteItemModal> = {
  title: "Blocks/DeleteItemModal",
  component: DeleteItemModal,
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DeleteItemModal>;

export const Default: Story = {
  args: {
    itemName: "Amoxicillin 500mg Capsules",
    onConfirm: fn(),
    onCancel: fn(),
  },
};

export const ShortName: Story = {
  args: {
    itemName: "Warfarin 5mg",
    onConfirm: fn(),
    onCancel: fn(),
  },
};
