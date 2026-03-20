import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SidebarCard } from "./sidebar-card";

describe("SidebarCard", () => {
  it("renders children content", () => {
    render(
      <SidebarCard selected={false} onClick={vi.fn()}>
        <span>Card Content</span>
      </SidebarCard>,
    );

    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("calls onClick when clicked and not disabled", async () => {
    const onClick = vi.fn();
    render(
      <SidebarCard selected={false} onClick={onClick}>
        Card
      </SidebarCard>,
    );

    await userEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <SidebarCard selected={false} onClick={onClick} disabled>
        Card
      </SidebarCard>,
    );

    await userEvent.click(screen.getByRole("button"));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders as a button element", () => {
    render(
      <SidebarCard selected={false} onClick={vi.fn()}>
        Card
      </SidebarCard>,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("button is disabled when disabled prop is true", () => {
    render(
      <SidebarCard selected={false} onClick={vi.fn()} disabled>
        Card
      </SidebarCard>,
    );

    expect(screen.getByRole("button")).toBeDisabled();
  });
});
