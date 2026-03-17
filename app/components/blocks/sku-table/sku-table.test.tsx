import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { SKULineItem } from "@models/procurement";

import { SKUTable } from "./sku-table";

const MOCK_LINE_ITEMS: readonly SKULineItem[] = [
  {
    id: "li-1",
    skuCode: "12345",
    name: "Atlantic Salmon Fillet",
    status: "out-of-stock",
    currentInventory: 0,
    runOutDate: "5 days ago",
    unitPrice: 180,
    recommendedQuantity: 5,
    orderValue: 900,
  },
  {
    id: "li-2",
    skuCode: "12655",
    name: "Chicken Breast Boneless",
    status: "urgent",
    currentInventory: 105,
    runOutDate: "Jan 22",
    unitPrice: 300,
    recommendedQuantity: 3,
    orderValue: 900,
  },
];

const DEFAULT_PROPS = {
  lineItems: MOCK_LINE_ITEMS,
  totalValue: 1800,
  onQuantityChange: () => {},
  onRemoveItem: () => {},
  onInfoClick: () => {},
  onConfirm: () => {},
} as const;

describe("SKUTable", () => {
  it("renders table headers", () => {
    render(<SKUTable {...DEFAULT_PROPS} />);

    expect(screen.getByText("SKU")).toBeInTheDocument();
    expect(screen.getByText("Current Inv")).toBeInTheDocument();
    expect(screen.getByText("Run Out Date")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("Order Value")).toBeInTheDocument();

    expect(screen.queryByText("Status")).not.toBeInTheDocument();
    expect(screen.queryByText("Product")).not.toBeInTheDocument();
  });

  it("renders all line item data", () => {
    const { container } = render(<SKUTable {...DEFAULT_PROPS} />);
    const text = container.textContent ?? "";

    expect(text).toContain("12345");
    expect(text).toContain("Atlantic Salmon Fillet");
    expect(text).toContain("12655");
    expect(text).toContain("5 days ago");
    expect(text).toContain("105");
    expect(text).toContain("Jan 22");
    expect(text).toContain("900");
    expect(text).toContain("2 items");
  });

  it("renders total and confirm button in footer", () => {
    const { container } = render(<SKUTable {...DEFAULT_PROPS} />);
    const text = container.textContent ?? "";

    expect(text).toContain("1,800");

    const confirmButtons = screen.getAllByRole("button", {
      name: "Confirm",
    });

    expect(confirmButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("calls onInfoClick with correct item id", () => {
    const handleInfoClick = vi.fn();

    render(
      <SKUTable {...DEFAULT_PROPS} onInfoClick={handleInfoClick} />,
    );

    const infoButtons = screen.getAllByLabelText(
      "View reasoning for 12345",
    );

    infoButtons[infoButtons.length - 1].click();

    expect(handleInfoClick).toHaveBeenCalledWith("li-1");
  });

  it("calls onRemoveItem with correct item id", () => {
    const handleRemove = vi.fn();

    render(
      <SKUTable {...DEFAULT_PROPS} onRemoveItem={handleRemove} />,
    );

    const removeButtons = screen.getAllByLabelText("Remove 12345");
    removeButtons[removeButtons.length - 1].click();

    expect(handleRemove).toHaveBeenCalledWith("li-1");
  });
});
