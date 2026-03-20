import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DEMO_EARLY_ARRIVAL } from "@demo/action-content-data";
import { EarlyArrivalContent } from "./early-arrival-content";

const defaultProps = {
  title: "Early Arrival: PO #1099",
  subtitle:
    "PharmaLink delivery arriving 4 hours ahead of schedule — receiving bay action required.",
  data: DEMO_EARLY_ARRIVAL,
};

describe("EarlyArrivalContent", () => {
  it("renders the title and subtitle", () => {
    render(<EarlyArrivalContent {...defaultProps} />);
    expect(screen.getByText("Early Arrival: PO #1099")).toBeInTheDocument();
    expect(
      screen.getByText(
        "PharmaLink delivery arriving 4 hours ahead of schedule — receiving bay action required.",
      ),
    ).toBeInTheDocument();
  });

  it("renders the updated schedule with hours early badge and ETA values", () => {
    const { container } = render(<EarlyArrivalContent {...defaultProps} />);
    expect(container.textContent).toContain("4 HOURS EARLY");
    expect(container.textContent).toContain("Today, 6:30 PM");
    expect(container.textContent).toContain("Today, 2:30 PM");
  });

  it("renders in-transit items and total", () => {
    const { container } = render(<EarlyArrivalContent {...defaultProps} />);
    expect(container.textContent).toContain("AMOX500");
    expect(container.textContent).toContain("Amoxicillin 500mg Capsules");
    expect(container.textContent).toContain("INS-GLA");
    expect(container.textContent).toContain("Insulin Glargine 100u/mL Vial");
  });

  it("renders recommended action checkboxes", () => {
    render(<EarlyArrivalContent {...defaultProps} />);
    expect(
      screen.getByText("Confirm a Receiving Bay Is Available at 2:30 PM"),
    ).toBeInTheDocument();
    expect(screen.getByText("Notify the Dispensary Lead")).toBeInTheDocument();
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(4);

    for (const checkbox of checkboxes) {
      expect(checkbox).not.toBeChecked();
    }
  });

  it("updates acknowledge button label when an action is checked", () => {
    render(<EarlyArrivalContent {...defaultProps} />);
    expect(screen.getByText("Acknowledge Early Arrival")).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(
      screen.getByText("Acknowledge Early Arrival & Action Tasks"),
    ).toBeInTheDocument();
  });

  it("calls onAcknowledge when the acknowledge button is clicked", () => {
    const onAcknowledge = vi.fn();
    render(<EarlyArrivalContent {...defaultProps} onAcknowledge={onAcknowledge} />);
    fireEvent.click(screen.getByText("Acknowledge Early Arrival"));
    expect(onAcknowledge).toHaveBeenCalledTimes(1);
  });
});
