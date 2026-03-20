import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { POEditableFields } from "./po-editable-fields";

const meta: Meta<typeof POEditableFields> = {
  title: "Blocks/POEditableFields",
  component: POEditableFields,
};

export default meta;
type Story = StoryObj<typeof POEditableFields>;

export const Default: Story = {
  args: {
    poNumber: "PO-1099",
    leadTimeEta: "Mar 22",
    leadTimeDays: 3,
    onPoNumberChange: fn(),
    onLeadTimeEtaChange: fn(),
    onLeadTimeDaysChange: fn(),
  },
};

export const LongLeadTime: Story = {
  args: {
    poNumber: "PO-5444",
    leadTimeEta: "Apr 15",
    leadTimeDays: 14,
    onPoNumberChange: fn(),
    onLeadTimeEtaChange: fn(),
    onLeadTimeDaysChange: fn(),
  },
};
