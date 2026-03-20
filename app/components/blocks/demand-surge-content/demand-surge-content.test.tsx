import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DEMO_DEMAND_SURGE } from "@demo/action-content-data";
import { DemandSurgeContent } from "./demand-surge-content";

const defaultProps = {
  title: "Demand Surge Detected: Antibiotic Uplift Recommended",
  subtitle:
    "Flu season trend data shows 38% above-baseline dispensing volume. Ozai recommends inventory uplift.",
  data: DEMO_DEMAND_SURGE,
};

describe("DemandSurgeContent", () => {
  it("renders the title and subtitle", () => {
    render(<DemandSurgeContent {...defaultProps} />);
    expect(
      screen.getByText("Demand Surge Detected: Antibiotic Uplift Recommended"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Flu season trend data shows 38% above-baseline dispensing volume. Ozai recommends inventory uplift.",
      ),
    ).toBeInTheDocument();
  });

  it("renders the demand signal summary", () => {
    const { container } = render(<DemandSurgeContent {...defaultProps} />);
    expect(container.textContent).toContain("flu season antibiotic surge");
  });

  it("renders current and optimized order tables with SKU data", () => {
    const { container } = render(<DemandSurgeContent {...defaultProps} />);
    expect(container.textContent).toContain("CURRENT ORDER");
    expect(container.textContent).toContain("OPTIMIZED QUANTITIES");
    expect(container.textContent).toContain("AMOX500");
    expect(container.textContent).toContain("Amoxicillin 500mg Capsules");
    expect(container.textContent).toContain("MedCore Distribution");
  });

  it("renders coverage stats for current and optimized scenarios", () => {
    const { container } = render(<DemandSurgeContent {...defaultProps} />);
    expect(container.textContent).toContain("2.8 days");
    expect(container.textContent).toContain("6.8 days");
    expect(container.textContent).toContain("IF APPROVED");
    expect(container.textContent).toContain("Current");
  });

  it("calls onApprove when approve button is clicked", () => {
    const onApprove = vi.fn();
    render(<DemandSurgeContent {...defaultProps} onApprove={onApprove} />);
    fireEvent.click(screen.getByText("Approve"));
    expect(onApprove).toHaveBeenCalledTimes(1);
  });

  it("calls onReject when reject button is clicked", () => {
    const onReject = vi.fn();
    render(<DemandSurgeContent {...defaultProps} onReject={onReject} />);
    fireEvent.click(screen.getByText("Reject"));
    expect(onReject).toHaveBeenCalledTimes(1);
  });
});
