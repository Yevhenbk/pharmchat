import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  DEMO_PARTIAL_FILL_CRITICAL,
  DEMO_PARTIAL_FILL_WARNING,
} from "@demo/action-content-data";
import { PartialFillContent } from "./partial-fill-content";

const defaultProps = {
  title: "Partial Fill: PO #2026-1802",
  subtitle:
    "MedCore Distribution can only supply 50% of Metformin 1000mg ER — 4 days on-hand remaining.",
  data: DEMO_PARTIAL_FILL_CRITICAL,
};

describe("PartialFillContent", () => {
  it("renders the title and subtitle", () => {
    render(<PartialFillContent {...defaultProps} />);
    expect(screen.getByText("Partial Fill: PO #2026-1802")).toBeInTheDocument();
    expect(
      screen.getByText(
        "MedCore Distribution can only supply 50% of Metformin 1000mg ER — 4 days on-hand remaining.",
      ),
    ).toBeInTheDocument();
  });

  it("renders vendor and backorder ETA", () => {
    const { container } = render(<PartialFillContent {...defaultProps} />);
    expect(container.textContent).toContain("MedCore Distribution");
    expect(container.textContent).toContain("Backorder ETA: 10–14 Days");
  });

  it("renders SKU fill details with ordered, delivered, and backordered quantities", () => {
    const { container } = render(<PartialFillContent {...defaultProps} />);
    expect(container.textContent).toContain("MET1000");
    expect(container.textContent).toContain("Metformin 1000mg Extended Release");
    expect(container.textContent).toContain("160");
    expect(container.textContent).toContain("80");
    expect(container.textContent).toContain("4");
  });

  it("renders consequence panels for if-accepted and if-rejected", () => {
    const { container } = render(<PartialFillContent {...defaultProps} />);
    expect(container.textContent).toContain("If Accepted");
    expect(container.textContent).toContain("If Rejected");
    expect(container.textContent).toContain("~2 days additional coverage");
  });

  it("shows no immediate risk label when days on hand is above threshold", () => {
    const { container } = render(
      <PartialFillContent
        {...defaultProps}
        data={DEMO_PARTIAL_FILL_WARNING}
      />,
    );
    expect(container.textContent).toContain("No immediate risk");
  });

  it("calls onApprove when approve button is clicked", () => {
    const onApprove = vi.fn();
    render(<PartialFillContent {...defaultProps} onApprove={onApprove} />);
    fireEvent.click(screen.getByText("Approve"));
    expect(onApprove).toHaveBeenCalledTimes(1);
  });

  it("calls onReject when reject button is clicked", () => {
    const onReject = vi.fn();
    render(<PartialFillContent {...defaultProps} onReject={onReject} />);
    fireEvent.click(screen.getByText("Reject"));
    expect(onReject).toHaveBeenCalledTimes(1);
  });
});
