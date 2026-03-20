import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  DEMO_ORDER_CANCELLED,
  DEMO_ORDER_CANCELLED_DOXYCYCLINE,
} from "@demo/action-content-data";
import { OrderCancelledContent } from "./order-cancelled-content";

const defaultProps = {
  title: "Order Cancellation: PO #2026-1099",
  subtitle:
    "ClearPath Rx unable to fulfil Amoxicillin 500mg Capsules — alternative vendor identified.",
  data: DEMO_ORDER_CANCELLED,
};

describe("OrderCancelledContent", () => {
  it("renders the title and subtitle", () => {
    render(<OrderCancelledContent {...defaultProps} />);
    expect(
      screen.getByText("Order Cancellation: PO #2026-1099"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "ClearPath Rx unable to fulfil Amoxicillin 500mg Capsules — alternative vendor identified.",
      ),
    ).toBeInTheDocument();
  });

  it("renders the original and replacement order snapshots", () => {
    const { container } = render(<OrderCancelledContent {...defaultProps} />);
    expect(container.textContent).toContain("ORIGINAL ORDER");
    expect(container.textContent).toContain("PROPOSED REPLACEMENT");
    expect(container.textContent).toContain("ClearPath Rx");
    expect(container.textContent).toContain("Summit Pharma Supplies");
    expect(container.textContent).toContain("Amoxicillin 500mg Capsules");
  });

  it("renders consequence panels", () => {
    const { container } = render(<OrderCancelledContent {...defaultProps} />);
    expect(container.textContent).toContain("If Rejected");
    expect(container.textContent).toContain("If Approved");
    expect(container.textContent).toContain("31-day coverage secured");
  });

  it("renders clinical alert when isDosageChange is true and clinicalWarning is provided", () => {
    const { container } = render(<OrderCancelledContent {...defaultProps} />);
    expect(container.textContent).toContain("CLINICAL ALERT");
  });

  it("does not render clinical alert when isDosageChange is false", () => {
    render(
      <OrderCancelledContent
        {...defaultProps}
        data={DEMO_ORDER_CANCELLED_DOXYCYCLINE}
      />,
    );
    expect(
      screen.queryByText(/CLINICAL ALERT/),
    ).not.toBeInTheDocument();
  });

  it("renders FDA national shortage alert when disruptionReport.isNationalShortage is true", () => {
    render(
      <OrderCancelledContent
        {...defaultProps}
        disruptionReport={{
          severity: "CRITICAL",
          recommendedAction: "Source an approved alternative immediately",
          isNationalShortage: true,
          medicationName: "amoxicillin",
        }}
      />,
    );
    expect(screen.getByText("FDA National Drug Shortage Active")).toBeInTheDocument();
  });

  it("calls onApprove when approve button is clicked", () => {
    const onApprove = vi.fn();
    render(<OrderCancelledContent {...defaultProps} onApprove={onApprove} />);
    fireEvent.click(screen.getByText("Approve"));
    expect(onApprove).toHaveBeenCalledTimes(1);
  });

  it("calls onReject when reject button is clicked", () => {
    const onReject = vi.fn();
    render(<OrderCancelledContent {...defaultProps} onReject={onReject} />);
    fireEvent.click(screen.getByText("Reject"));
    expect(onReject).toHaveBeenCalledTimes(1);
  });
});
