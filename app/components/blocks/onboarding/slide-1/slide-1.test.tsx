import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Slide1 } from "./slide-1";

describe("Slide1", () => {
  it("renders Pharmchat text", () => {
    render(<Slide1 by={1} />);
    expect(screen.getByText("Pharmchat")).toBeInTheDocument();
  });

  it("renders at by=0 without crashing", () => {
    render(<Slide1 by={0} />);
    expect(screen.getByText("Pharmchat")).toBeInTheDocument();
  });

  it("renders at by=0.5 without crashing", () => {
    render(<Slide1 by={0.5} />);
    expect(screen.getByText("Pharmchat")).toBeInTheDocument();
  });
});
