import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ToggleSwitch } from "./toggle-switch";

describe("ToggleSwitch", () => {
  it("renders with aria-checked false when unchecked", () => {
    render(<ToggleSwitch checked={false} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("renders with aria-checked true when checked", () => {
    render(<ToggleSwitch checked={true} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("calls onChange with toggled value when clicked", async () => {
    const onChange = vi.fn();
    render(<ToggleSwitch checked={false} onChange={onChange} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("calls onChange with false when checked switch is clicked", async () => {
    const onChange = vi.fn();
    render(<ToggleSwitch checked={true} onChange={onChange} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(false);
  });
});
