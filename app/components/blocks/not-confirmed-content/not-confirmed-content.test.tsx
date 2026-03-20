import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DEMO_NOT_CONFIRMED } from "@demo/action-content-data";
import { NotConfirmedContent } from "./not-confirmed-content";

const defaultProps = {
  title: "PO Confirmation Overdue: PO #2026-1051",
  subtitle:
    "PharmaLink Co. has not confirmed PO #2026-1051 — 48 hours overdue. Chase required.",
  data: DEMO_NOT_CONFIRMED,
};

describe("NotConfirmedContent", () => {
  it("renders the title and subtitle", () => {
    render(<NotConfirmedContent {...defaultProps} />);
    expect(
      screen.getByText("PO Confirmation Overdue: PO #2026-1051"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "PharmaLink Co. has not confirmed PO #2026-1051 — 48 hours overdue. Chase required.",
      ),
    ).toBeInTheDocument();
  });

  it("renders vendor, PO number and status stats", () => {
    const { container } = render(<NotConfirmedContent {...defaultProps} />);
    expect(container.textContent).toContain("PharmaLink Co.");
    expect(container.textContent).toContain("PO #2026-1051");
    expect(container.textContent).toContain("Mar 17, 10:00 AM");
    expect(container.textContent).toContain("+48h");
    expect(container.textContent).toContain("Mar 25");
  });

  it("renders all SKUs on the PO", () => {
    const { container } = render(<NotConfirmedContent {...defaultProps} />);
    expect(container.textContent).toContain("ATOR10");
    expect(container.textContent).toContain("Atorvastatin 10mg Tablets");
    expect(container.textContent).toContain("OMEP20");
    expect(container.textContent).toContain("Omeprazole 20mg Capsules");
    expect(container.textContent).toContain("MET500");
    expect(container.textContent).toContain("Metformin 500mg Tablets");
  });

  it("renders recommended chase action checkboxes unchecked by default", () => {
    render(<NotConfirmedContent {...defaultProps} />);
    expect(
      screen.getByText("Call vendor directly and request written confirmation"),
    ).toBeInTheDocument();
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(4);

    for (const checkbox of checkboxes) {
      expect(checkbox).not.toBeChecked();
    }
  });

  it("updates acknowledge button label when a chase action is checked", () => {
    render(<NotConfirmedContent {...defaultProps} />);
    expect(screen.getByText("Chase Supplier")).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(screen.getByText("Chase Supplier & Log Actions")).toBeInTheDocument();
  });

  it("calls onAcknowledge when the chase supplier button is clicked", () => {
    const onAcknowledge = vi.fn();
    render(<NotConfirmedContent {...defaultProps} onAcknowledge={onAcknowledge} />);
    fireEvent.click(screen.getByText("Chase Supplier"));
    expect(onAcknowledge).toHaveBeenCalledTimes(1);
  });
});
