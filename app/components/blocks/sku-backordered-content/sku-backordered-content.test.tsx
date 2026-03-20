import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  DEMO_SKU_BACKORDERED_CRITICAL,
  DEMO_SKU_BACKORDERED_WARNING,
} from "@demo/action-content-data";
import { SkuBackorderedContent } from "./sku-backordered-content";

const defaultProps = {
  title: "SKU Backordered: Insulin Glargine 100u/mL",
  subtitle:
    "PharmaLink Co. has zero inventory across all Insulin Glargine presentations — stockout in 2 days.",
  data: DEMO_SKU_BACKORDERED_CRITICAL,
};

describe("SkuBackorderedContent", () => {
  it("renders the title and subtitle", () => {
    render(<SkuBackorderedContent {...defaultProps} />);
    expect(
      screen.getByText("SKU Backordered: Insulin Glargine 100u/mL"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "PharmaLink Co. has zero inventory across all Insulin Glargine presentations — stockout in 2 days.",
      ),
    ).toBeInTheDocument();
  });

  it("renders vendor and available date", () => {
    const { container } = render(<SkuBackorderedContent {...defaultProps} />);
    expect(container.textContent).toContain("PharmaLink Co.");
    expect(container.textContent).toContain("Available: Apr 2");
  });

  it("renders backordered SKU details with days on hand and stockout date", () => {
    const { container } = render(<SkuBackorderedContent {...defaultProps} />);
    expect(container.textContent).toContain("INS-GLA");
    expect(container.textContent).toContain("Insulin Glargine 100u/mL Vial");
    expect(container.textContent).toContain("2 Days On Hand");
    expect(container.textContent).toContain("Stockout Mar 21");
  });

  it("shows 'None found' when a SKU has no alternatives", () => {
    const { container } = render(<SkuBackorderedContent {...defaultProps} />);
    expect(container.textContent).toContain("None found");
  });

  it("renders alternative tags when alternatives exist", () => {
    const { container } = render(
      <SkuBackorderedContent
        {...defaultProps}
        title="SKU Backordered: Warfarin Sodium 5mg"
        subtitle="Apex Pharma unable to supply Warfarin Sodium 5mg."
        data={DEMO_SKU_BACKORDERED_WARNING}
      />,
    );
    expect(container.textContent).toContain("Warfarin 5mg — Teva Pharmaceuticals");
    expect(container.textContent).toContain("Acenocoumarol 4mg");
  });

  it("renders national shortage alert when disruptionReport.isNationalShortage is true", () => {
    render(
      <SkuBackorderedContent
        {...defaultProps}
        disruptionReport={{
          severity: "CRITICAL",
          recommendedAction: "Source an approved alternative immediately",
          isNationalShortage: true,
          medicationName: "insulin glargine",
        }}
      />,
    );
    expect(screen.getByText("FDA National Drug Shortage Active")).toBeInTheDocument();
  });

  it("does not render shortage alert when isNationalShortage is false", () => {
    render(
      <SkuBackorderedContent
        {...defaultProps}
        disruptionReport={{
          severity: "WARNING",
          recommendedAction: "Monitor supply",
          isNationalShortage: false,
          medicationName: undefined,
        }}
      />,
    );
    expect(
      screen.queryByText("FDA National Drug Shortage Active"),
    ).not.toBeInTheDocument();
  });

  it("calls onApprove when approve button is clicked", () => {
    const onApprove = vi.fn();
    render(<SkuBackorderedContent {...defaultProps} onApprove={onApprove} />);
    fireEvent.click(screen.getByText("Approve"));
    expect(onApprove).toHaveBeenCalledTimes(1);
  });

  it("calls onReject when reject button is clicked", () => {
    const onReject = vi.fn();
    render(<SkuBackorderedContent {...defaultProps} onReject={onReject} />);
    fireEvent.click(screen.getByText("Reject"));
    expect(onReject).toHaveBeenCalledTimes(1);
  });
});
