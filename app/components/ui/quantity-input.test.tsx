import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QuantityInput } from "./quantity-input";

describe("QuantityInput", () => {
  it("renders with the initial value", () => {
    render(<QuantityInput value={5} onChange={vi.fn()} />);
    expect(screen.getByRole("spinbutton")).toHaveValue(5);
  });

  it("calls onChange with parsed integer on valid input", () => {
    const onChange = vi.fn();
    render(<QuantityInput value={1} onChange={onChange} />);
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "10" } });
    expect(onChange).toHaveBeenCalledWith(10);
  });

  it("does not call onChange for non-numeric input", () => {
    const onChange = vi.fn();
    render(<QuantityInput value={1} onChange={onChange} />);
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "abc" } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("resets display value to prop on blur with invalid input", () => {
    render(<QuantityInput value={3} onChange={vi.fn()} />);
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "xyz" } });
    fireEvent.blur(input);
    expect(input).toHaveValue(3);
  });
});
