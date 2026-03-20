import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { POEditableFields } from "./po-editable-fields";

const DEFAULT_PROPS = {
  poNumber: "PO-1099",
  leadTimeEta: "Mar 22",
  leadTimeDays: 3,
  onPoNumberChange: vi.fn(),
  onLeadTimeEtaChange: vi.fn(),
  onLeadTimeDaysChange: vi.fn(),
};

describe("POEditableFields", () => {
  it("renders all three fields with correct values", () => {
    render(<POEditableFields {...DEFAULT_PROPS} />);

    expect(screen.getByDisplayValue("PO-1099")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Mar 22")).toBeInTheDocument();
    expect(screen.getByDisplayValue("3")).toBeInTheDocument();
  });

  it("calls onPoNumberChange when the PO number input changes", () => {
    const handlePoNumberChange = vi.fn();

    render(
      <POEditableFields
        {...DEFAULT_PROPS}
        onPoNumberChange={handlePoNumberChange}
      />,
    );

    const input = screen.getByLabelText("PO Number");
    fireEvent.change(input, { target: { value: "PO-2000" } });

    expect(handlePoNumberChange).toHaveBeenCalledWith("PO-2000");
  });

  it("calls onLeadTimeEtaChange when the ETA input changes", () => {
    const handleEtaChange = vi.fn();

    render(
      <POEditableFields
        {...DEFAULT_PROPS}
        onLeadTimeEtaChange={handleEtaChange}
      />,
    );

    const input = screen.getByLabelText("Requested ETA");
    fireEvent.change(input, { target: { value: "Apr 1" } });

    expect(handleEtaChange).toHaveBeenCalledWith("Apr 1");
  });

  it("calls onLeadTimeDaysChange with a parsed number when the lead days input changes", () => {
    const handleDaysChange = vi.fn();

    render(
      <POEditableFields
        {...DEFAULT_PROPS}
        onLeadTimeDaysChange={handleDaysChange}
      />,
    );

    const input = screen.getByLabelText("Lead days");
    fireEvent.change(input, { target: { value: "7" } });

    expect(handleDaysChange).toHaveBeenCalledWith(7);
  });

  it("does not call onLeadTimeDaysChange for invalid or zero values", () => {
    const handleDaysChange = vi.fn();

    render(
      <POEditableFields
        {...DEFAULT_PROPS}
        onLeadTimeDaysChange={handleDaysChange}
      />,
    );

    const input = screen.getByLabelText("Lead days");
    fireEvent.change(input, { target: { value: "0" } });
    fireEvent.change(input, { target: { value: "abc" } });

    expect(handleDaysChange).not.toHaveBeenCalled();
  });
});
