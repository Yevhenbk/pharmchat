import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AskMiraWidget } from "./ask-mira-widget";

describe("AskMiraWidget", () => {
  it("renders Ask Mira label", () => {
    render(<AskMiraWidget />);
    expect(screen.getByText("Ask Mira")).toBeInTheDocument();
  });

  it("renders a chat button", () => {
    render(<AskMiraWidget />);
    expect(screen.getByRole("button", { name: "Chat" })).toBeInTheDocument();
  });

  it("calls onClick when chat button is clicked", () => {
    const onClick = vi.fn();
    render(<AskMiraWidget onClick={onClick} />);
    screen.getByRole("button", { name: "Chat" }).click();
    expect(onClick).toHaveBeenCalledOnce();
  });
});
