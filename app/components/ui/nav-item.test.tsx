import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NavItem } from "./nav-item";

describe("NavItem", () => {
  it("renders the label", () => {
    render(<NavItem label="Dashboard" />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders an icon when provided", () => {
    render(
      <NavItem
        label="Orders"
        icon={<svg data-testid="nav-icon" aria-hidden />}
      />,
    );
    expect(screen.getByTestId("nav-icon")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<NavItem label="Reports" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies active styling when active prop is true", () => {
    render(<NavItem label="Active Item" active />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("font-medium");
  });
});
