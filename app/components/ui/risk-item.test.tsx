import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RiskItem } from "./risk-item";

const DEFAULT_ITEM = {
  id: "1",
  sku: "SKU-001",
  productName: "Amoxicillin 500mg",
  description: "Stock running low — reorder recommended within 3 days",
} as const;

describe("RiskItem", () => {
  it("renders the SKU", () => {
    render(<RiskItem item={DEFAULT_ITEM} />);
    expect(screen.getByText("SKU-001")).toBeInTheDocument();
  });

  it("renders the product name", () => {
    render(<RiskItem item={DEFAULT_ITEM} />);
    expect(screen.getByText(/Amoxicillin 500mg/)).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<RiskItem item={DEFAULT_ITEM} />);
    expect(
      screen.getByText("Stock running low — reorder recommended within 3 days"),
    ).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <RiskItem item={DEFAULT_ITEM} className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
