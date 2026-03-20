import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ModalBlurWrapper } from "./modal-blur-wrapper";

const meta: Meta<typeof ModalBlurWrapper> = {
  title: "Blocks/ModalBlurWrapper",
  component: ModalBlurWrapper,
};

export default meta;

type Story = StoryObj<typeof ModalBlurWrapper>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: "24px", background: "white", borderRadius: "8px" }}>
        Modal content inside the blur wrapper
      </div>
    ),
  },
};

export const WithClassName: Story = {
  args: {
    className: "custom-class",
    children: (
      <div style={{ padding: "24px", background: "white", borderRadius: "8px" }}>
        Modal with custom className applied
      </div>
    ),
  },
};
