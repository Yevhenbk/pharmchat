import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ChatInput } from "./chat-input";

const meta: Meta<typeof ChatInput> = {
  title: "UI/ChatInput",
  component: ChatInput,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof ChatInput>;

export const Default: Story = {
  args: {
    placeholder: "Ask Mira",
    onSubmit: fn(),
    sendButton: false,
  },
};

export const WithSendButton: Story = {
  args: {
    placeholder: "Ask Mira anything...",
    onSubmit: fn(),
    sendButton: true,
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: "Search products...",
    onSubmit: fn(),
    sendButton: false,
  },
};
