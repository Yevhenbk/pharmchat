import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ActionItemLayout } from "./action-item-layout";

const meta: Meta<typeof ActionItemLayout> = {
  title: "Blocks/ActionItemLayout",
  component: ActionItemLayout,
};

export default meta;

type Story = StoryObj<typeof ActionItemLayout>;

export const Default: Story = {
  args: {
    title: "Action Items",
    subtitle: "3 items require your attention",
    footer: <div style={{ padding: "12px", textAlign: "center" }}>Footer Content</div>,
    children: (
      <div style={{ padding: "12px" }}>
        Action item content goes here
      </div>
    ),
  },
};

export const WithMultipleChildren: Story = {
  args: {
    title: "Procurement Alerts",
    subtitle: "Review and resolve open issues",
    footer: <div style={{ padding: "12px", textAlign: "center" }}>View All</div>,
    children: (
      <>
        <div style={{ padding: "8px", borderBottom: "1px solid #eee" }}>Item 1</div>
        <div style={{ padding: "8px", borderBottom: "1px solid #eee" }}>Item 2</div>
        <div style={{ padding: "8px" }}>Item 3</div>
      </>
    ),
  },
};
