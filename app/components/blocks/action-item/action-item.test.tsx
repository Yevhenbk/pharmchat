import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { ActionItemData } from "@models/action-item";

import { ActionItem } from "./action-item";

const MOCK_ITEM: ActionItemData = {
  id: "ai-1",
  type: "order-cancelled",
  severity: "critical",
  title: "Order Cancelled by Vendor",
  description: "Vendor cancelled PO-2026-892 due to inventory shortage.",
  actions: [{ label: "Find Alternative" }],
  ignoreLabel: "Ignore",
};

describe("ActionItem", () => {
  it("renders title and description", () => {
    render(<ActionItem item={MOCK_ITEM} />);

    expect(screen.getByText("Order Cancelled by Vendor")).toBeInTheDocument();
    expect(
      screen.getByText("Vendor cancelled PO-2026-892 due to inventory shortage."),
    ).toBeInTheDocument();
  });

  it("renders action button with correct label", () => {
    render(<ActionItem item={MOCK_ITEM} />);

    expect(screen.getByText("Find Alternative")).toBeInTheDocument();
  });

  it("renders ignore button when ignoreLabel is provided", () => {
    render(<ActionItem item={MOCK_ITEM} />);

    expect(screen.getByText("Ignore")).toBeInTheDocument();
  });

  it("does not render ignore button when ignoreLabel is absent", () => {
    const itemWithoutIgnore: ActionItemData = {
      ...MOCK_ITEM,
      ignoreLabel: undefined,
    };
    render(<ActionItem item={itemWithoutIgnore} />);

    expect(screen.queryByText("Ignore")).not.toBeInTheDocument();
  });

  it("calls onActionClick when action button is clicked", async () => {
    const onActionClick = vi.fn();
    render(<ActionItem item={MOCK_ITEM} onActionClick={onActionClick} />);

    await userEvent.click(screen.getByText("Find Alternative"));

    expect(onActionClick).toHaveBeenCalledTimes(1);
  });
});
