import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ModalSidebar } from "./modal-sidebar";
import type { ActionItemData } from "@models/action-item";

const DEMO_ACTION_ITEMS: ActionItemData[] = [
  {
    id: "action-1",
    type: "order-cancelled",
    title: "Order Cancelled — McKesson",
    description: "Amoxicillin 500mg · 200 units",
    severity: "critical",
    actions: [{ label: "Replace Order" }],
  },
  {
    id: "action-2",
    type: "delayed",
    title: "Delivery Delay",
    description: "Metformin 1000mg",
    severity: "warning",
    actions: [{ label: "Acknowledge" }],
  },
];

describe("ModalSidebar", () => {
  it("renders an aside element", () => {
    const { container } = render(
      <ModalSidebar
        mode="critical"
        actionItems={DEMO_ACTION_ITEMS}
        selectedActionId="action-1"
        onSelectAction={vi.fn()}
      />,
    );
    expect(container.querySelector("aside")).not.toBeNull();
  });

  it("renders null inner content when no items or vendors provided", () => {
    const { container } = render(
      <ModalSidebar mode="critical" />,
    );
    // aside renders but SidebarContent returns null
    const aside = container.querySelector("aside");
    expect(aside).not.toBeNull();
    expect(aside?.children.length).toBe(0);
  });

  it("applies blur class when isWhyOrderCardOpen is true", () => {
    const { container } = render(
      <ModalSidebar
        mode="critical"
        actionItems={DEMO_ACTION_ITEMS}
        selectedActionId="action-1"
        onSelectAction={vi.fn()}
        isWhyOrderCardOpen
      />,
    );
    const aside = container.querySelector("aside");
    expect(aside?.className).toMatch(/blurred/i);
  });
});
