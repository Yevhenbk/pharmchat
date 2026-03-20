import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContentSectionLabel } from "./content-section-label";

describe("ContentSectionLabel", () => {
  it("renders children text", () => {
    render(<ContentSectionLabel>Order Summary</ContentSectionLabel>);
    expect(screen.getByText("Order Summary")).toBeInTheDocument();
  });

  it("renders as a paragraph element", () => {
    const { container } = render(
      <ContentSectionLabel>Label</ContentSectionLabel>,
    );
    expect(container.querySelector("p")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <ContentSectionLabel className="mt-4">Label</ContentSectionLabel>,
    );
    expect(screen.getByText("Label")).toHaveClass("mt-4");
  });

  it("renders ReactNode children", () => {
    render(
      <ContentSectionLabel>
        <span data-testid="inner">Inner content</span>
      </ContentSectionLabel>,
    );
    expect(screen.getByTestId("inner")).toBeInTheDocument();
  });
});
