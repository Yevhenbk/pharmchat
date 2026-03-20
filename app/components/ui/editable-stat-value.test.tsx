import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EditableStatValue } from "./editable-stat-value";

describe("EditableStatValue", () => {
  it("renders the formatted value as a button", () => {
    render(<EditableStatValue value={1200} onChange={vi.fn()} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("1200")).toBeInTheDocument();
  });

  it("renders with prefix", () => {
    render(<EditableStatValue value={500} prefix="$" onChange={vi.fn()} />);
    expect(screen.getByText("$500")).toBeInTheDocument();
  });

  it("shows an input field after clicking the button", async () => {
    render(<EditableStatValue value={300} onChange={vi.fn()} />);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  it("calls onChange with new value on Enter", async () => {
    const onChange = vi.fn();
    render(<EditableStatValue value={100} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button"));
    const input = screen.getByRole("spinbutton");
    await userEvent.clear(input);
    await userEvent.type(input, "250");
    await userEvent.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledWith(250);
  });
});
