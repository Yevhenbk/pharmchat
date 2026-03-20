import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Slide3 } from "./slide-3";

describe("Slide3", () => {
  it("renders STOP text", () => {
    render(<Slide3 by={0.5} />);
    expect(screen.getByText("STOP")).toBeInTheDocument();
  });

  it("renders MANUAL text", () => {
    render(<Slide3 by={0.5} />);
    expect(screen.getByText(/MANUAL/)).toBeInTheDocument();
  });

  it("renders PROCUREMENT text", () => {
    render(<Slide3 by={0.5} />);
    expect(screen.getByText("PROCUREMENT")).toBeInTheDocument();
  });

  it("renders strikethrough line when by > 0.8", () => {
    const { container } = render(<Slide3 by={0.9} />);
    expect(container.querySelector("line")).not.toBeNull();
  });
});
