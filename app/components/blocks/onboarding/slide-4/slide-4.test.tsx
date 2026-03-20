import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Slide4 } from "./slide-4";

const DEFAULT_PROPS = {
  onSignIn: vi.fn(),
  onEnterDemo: vi.fn(),
};

describe("Slide4", () => {
  it("renders sign-in heading", () => {
    render(<Slide4 {...DEFAULT_PROPS} />);
    expect(
      screen.getByText(/Sign in and start procuring smarter/i),
    ).toBeInTheDocument();
  });

  it("renders Sign in with Google button", () => {
    render(<Slide4 {...DEFAULT_PROPS} />);
    expect(
      screen.getByRole("button", { name: /Sign in with Google/i }),
    ).toBeInTheDocument();
  });

  it("renders Enter Demo button", () => {
    render(<Slide4 {...DEFAULT_PROPS} />);
    expect(
      screen.getByRole("button", { name: /Enter Demo/i }),
    ).toBeInTheDocument();
  });

  it("calls onSignIn when sign-in button is clicked", () => {
    const onSignIn = vi.fn();
    render(<Slide4 onSignIn={onSignIn} onEnterDemo={vi.fn()} />);
    screen.getByRole("button", { name: /Sign in with Google/i }).click();
    expect(onSignIn).toHaveBeenCalledOnce();
  });
});
