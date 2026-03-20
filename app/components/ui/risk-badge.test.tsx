import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RiskBadge } from "./risk-badge";

describe("RiskBadge", () => {
  it("renders children text", () => {
    render(<RiskBadge>FDA Shortage</RiskBadge>);
    expect(screen.getByText("FDA Shortage")).toBeInTheDocument();
  });

  it("renders as a span element", () => {
    render(<RiskBadge>Stockout Risk</RiskBadge>);
    expect(screen.getByText("Stockout Risk").tagName).toBe("SPAN");
  });

  it("applies custom className", () => {
    render(<RiskBadge className="custom-class">Risk</RiskBadge>);
    expect(screen.getByText("Risk").className).toContain("custom-class");
  });
});
