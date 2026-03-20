import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { NavItem } from "./nav-item";

const meta: Meta<typeof NavItem> = {
  title: "UI/NavItem",
  component: NavItem,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof NavItem>;

export const Default: Story = {
  args: {
    label: "Dashboard",
    onClick: fn(),
  },
};

export const Active: Story = {
  args: {
    label: "Orders",
    active: true,
    onClick: fn(),
  },
};

export const WithIcon: Story = {
  args: {
    label: "Inventory",
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <rect x="2" y="2" width="5" height="5" />
        <rect x="9" y="2" width="5" height="5" />
        <rect x="2" y="9" width="5" height="5" />
        <rect x="9" y="9" width="5" height="5" />
      </svg>
    ),
    onClick: fn(),
  },
};

export const ActiveWithIcon: Story = {
  args: {
    label: "Settings",
    active: true,
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <circle cx="8" cy="8" r="4" />
      </svg>
    ),
    onClick: fn(),
  },
};
