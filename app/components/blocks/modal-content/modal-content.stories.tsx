import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ModalContent } from "./modal-content";

const meta: Meta<typeof ModalContent> = {
  title: "Blocks/ModalContent",
  component: ModalContent,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof ModalContent>;

/** Renders with no actionId — shows the skeleton loading state. */
export const ActionSkeleton: Story = {
  args: {
    mode: "critical",
  },
};

/** Renders in po-queue mode with no vendor selected — returns null. */
export const POQueueEmpty: Story = {
  args: {
    mode: "po-queue",
    selectedVendor: undefined,
  },
};
