import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { ActionItemData } from "@models/action-item";
import { ActionSidebar } from "./action-sidebar";

const MOCK_ITEMS: readonly ActionItemData[] = [
  {
    id: "action-4501",
    type: "order-cancelled",
    severity: "critical",
    title: "Order Cancelled",
    description: "Vendor cancelled order due to inventory shortage.",
    actions: [{ label: "Find Alternative" }],
    timeAgo: "1h ago",
  },
  {
    id: "action-4502",
    type: "delayed",
    severity: "warning",
    title: "2 Day Delay",
    description: "Shipment delayed by 2 days due to carrier issues.",
    actions: [{ label: "Acknowledge" }],
    timeAgo: "3h ago",
  },
  {
    id: "action-4503",
    type: "price-decrease",
    severity: "fyi",
    title: "Price Update",
    description: "Supplier reduced unit price by 8% on seasonal items.",
    actions: [{ label: "Review" }],
  },
];

describe("ActionSidebar", () => {
  it("renders the Procurement Run heading", () => {
    render(
      <ActionSidebar
        items={MOCK_ITEMS}
        selectedId={MOCK_ITEMS[0].id}
        onSelectItem={vi.fn()}
      />,
    );
    expect(screen.getByText("Procurement Run")).toBeInTheDocument();
  });

  it("renders the correct action item count", () => {
    const { container } = render(
      <ActionSidebar
        items={MOCK_ITEMS}
        selectedId={MOCK_ITEMS[0].id}
        onSelectItem={vi.fn()}
      />,
    );
    // The count badge should display 3
    expect(container.textContent).toContain("3");
    expect(container.textContent).toContain("ACTION ITEMS");
  });

  it("renders all item type labels", () => {
    const { container } = render(
      <ActionSidebar
        items={MOCK_ITEMS}
        selectedId={MOCK_ITEMS[0].id}
        onSelectItem={vi.fn()}
      />,
    );
    const text = container.textContent ?? "";
    expect(text).toContain("Order Cancelled");
    expect(text).toContain("2 Day Delay");
    expect(text).toContain("Price Update: Decrease");
  });

  it("calls onSelectItem when a card is clicked", async () => {
    const onSelectItem = vi.fn();
    render(
      <ActionSidebar
        items={MOCK_ITEMS}
        selectedId={MOCK_ITEMS[0].id}
        onSelectItem={onSelectItem}
      />,
    );

    // Click the second item's PO number label
    const poLabels = screen.getAllByText(/PO \d+/i);
    await userEvent.click(poLabels[1]);

    expect(onSelectItem).toHaveBeenCalledWith("action-4502");
  });
});
