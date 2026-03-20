import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatRow } from "./stat-row";

describe("StatRow", () => {
  it("renders the label", () => {
    render(<StatRow label="Fill Rate" value="94.2%" />);
    expect(screen.getByText("Fill Rate")).toBeInTheDocument();
  });

  it("renders the value", () => {
    render(<StatRow label="Fill Rate" value="94.2%" />);
    expect(screen.getByText("94.2%")).toBeInTheDocument();
  });

  it("renders an icon when provided", () => {
    render(
      <StatRow
        label="Orders"
        value={10}
        icon={<svg data-testid="row-icon" aria-hidden />}
      />,
    );
    expect(screen.getByTestId("row-icon")).toBeInTheDocument();
  });

  it("does not render icon wrapper when icon is not provided", () => {
    const { container } = render(<StatRow label="Units" value={50} />);
    const spans = container.querySelectorAll("span");
    // Only the label and value spans should exist when there's no icon
    expect(spans.length).toBe(2);
  });
});
