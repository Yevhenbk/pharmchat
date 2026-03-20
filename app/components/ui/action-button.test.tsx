import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ActionButton } from "./action-button";

describe("ActionButton", () => {
  it("renders children", () => {
    render(<ActionButton>Review & Approve</ActionButton>);
    expect(screen.getByRole("button", { name: "Review & Approve" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<ActionButton onClick={onClick}>Click me</ActionButton>);
    screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders with ignore variant", () => {
    render(<ActionButton variant="ignore">Ignore</ActionButton>);
    expect(screen.getByRole("button", { name: "Ignore" })).toBeInTheDocument();
  });

  it("renders with outline variant", () => {
    render(<ActionButton variant="outline">View Details</ActionButton>);
    expect(screen.getByRole("button", { name: "View Details" })).toBeInTheDocument();
  });
});
