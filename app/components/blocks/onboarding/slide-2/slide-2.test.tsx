import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Slide2 } from "./slide-2";

describe("Slide2", () => {
  it("renders the main headline text", () => {
    render(<Slide2 by={1} />);
    expect(
      screen.getByText(/The new standard for pharmacy procurement/i),
    ).toBeInTheDocument();
  });

  it("renders the body copy about Pharmchat", () => {
    render(<Slide2 by={1} />);
    expect(
      screen.getByText(/Pharmchat parses supplier emails with AI/i),
    ).toBeInTheDocument();
  });

  it("renders at by=0 without crashing", () => {
    const { container } = render(<Slide2 by={0} />);
    expect(container.firstChild).not.toBeNull();
  });
});
