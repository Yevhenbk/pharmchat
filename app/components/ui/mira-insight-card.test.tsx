import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MiraInsightCard } from "./mira-insight-card";

vi.mock("@components/icons/mira-bulb-mini", () => ({
  MiraBulbMini: ({ className }: { className?: string }) => (
    <svg data-testid="mira-bulb-icon" className={className} aria-hidden />
  ),
}));

describe("MiraInsightCard", () => {
  it("renders the insight text", () => {
    render(<MiraInsightCard insight="Stock projected to run out in 4 days." />);
    expect(
      screen.getByText("Stock projected to run out in 4 days."),
    ).toBeInTheDocument();
  });

  it("renders the Mira Insight label", () => {
    render(<MiraInsightCard insight="Some insight." />);
    expect(screen.getByText("Mira Insight")).toBeInTheDocument();
  });

  it("renders skeleton shimmer placeholders when isAnalyzing is true", () => {
    const { container } = render(
      <MiraInsightCard insight="" isAnalyzing />,
    );
    const shimmerElements = container.querySelectorAll(".skeleton-shimmer");
    expect(shimmerElements.length).toBeGreaterThan(0);
  });

  it("does not render skeleton shimmer when not analyzing", () => {
    const { container } = render(
      <MiraInsightCard insight="Ready insight." isAnalyzing={false} />,
    );
    const shimmerElements = container.querySelectorAll(".skeleton-shimmer");
    expect(shimmerElements.length).toBe(0);
  });
});
