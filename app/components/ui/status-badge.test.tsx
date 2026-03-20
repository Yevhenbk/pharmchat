import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusBadge } from "./status-badge";

describe("StatusBadge", () => {
  it("renders LIVE text for live variant", () => {
    render(<StatusBadge variant="live" />);
    expect(screen.getByText("LIVE")).toBeInTheDocument();
  });

  it("renders DONE text for done variant", () => {
    render(<StatusBadge variant="done" />);
    expect(screen.getByText("DONE")).toBeInTheDocument();
  });
});
