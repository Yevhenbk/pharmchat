import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DEMO_PRICE_INCREASE } from "@demo/action-content-data";
import { PriceIncreaseContent } from "./price-increase-content";

const defaultProps = {
  title: "Price Increase Notice: Alliance Medical",
  subtitle:
    "Atorvastatin 20mg unit price increasing 20% effective April 1, 2026 — approval required.",
  data: DEMO_PRICE_INCREASE,
};

describe("PriceIncreaseContent", () => {
  it("renders the title and subtitle", () => {
    render(<PriceIncreaseContent {...defaultProps} />);
    expect(
      screen.getByText("Price Increase Notice: Alliance Medical"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Atorvastatin 20mg unit price increasing 20% effective April 1, 2026 — approval required.",
      ),
    ).toBeInTheDocument();
  });

  it("renders vendor and effective date", () => {
    const { container } = render(<PriceIncreaseContent {...defaultProps} />);
    expect(container.textContent).toContain("Alliance Medical");
    expect(container.textContent).toContain("Effective Apr 1, 2026");
  });

  it("renders SKU price details with previous price, new price, and percentage increase", () => {
    const { container } = render(<PriceIncreaseContent {...defaultProps} />);
    expect(container.textContent).toContain("ATOR20");
    expect(container.textContent).toContain("Atorvastatin 20mg Tablets");
    expect(container.textContent).toContain("+20%");
    expect(container.textContent).toContain("500 units/mo");
  });

  it("renders the total monthly cost increase", () => {
    const { container } = render(<PriceIncreaseContent {...defaultProps} />);
    expect(container.textContent).toContain("Total Monthly Cost Increase");
  });

  it("renders consequence panels for if-accepted and if-rejected", () => {
    const { container } = render(<PriceIncreaseContent {...defaultProps} />);
    expect(container.textContent).toContain("If Accepted");
    expect(container.textContent).toContain("If Rejected");
    expect(container.textContent).toContain(
      "Initiate re-negotiation or switch to an alternative supplier",
    );
  });

  it("calls onApprove when approve button is clicked", () => {
    const onApprove = vi.fn();
    render(<PriceIncreaseContent {...defaultProps} onApprove={onApprove} />);
    fireEvent.click(screen.getByText("Approve"));
    expect(onApprove).toHaveBeenCalledTimes(1);
  });

  it("calls onReject when reject button is clicked", () => {
    const onReject = vi.fn();
    render(<PriceIncreaseContent {...defaultProps} onReject={onReject} />);
    fireEvent.click(screen.getByText("Reject"));
    expect(onReject).toHaveBeenCalledTimes(1);
  });
});
