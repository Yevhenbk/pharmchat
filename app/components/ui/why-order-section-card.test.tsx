import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WhyOrderSectionCard } from "./why-order-section-card";

describe("WhyOrderSectionCard", () => {
  it("renders the title", () => {
    render(
      <WhyOrderSectionCard
        icon={<svg aria-hidden />}
        title="Stock Level Alert"
        body="Reorder soon."
      />,
    );
    expect(screen.getByText("Stock Level Alert")).toBeInTheDocument();
  });

  it("renders plain text body", () => {
    render(
      <WhyOrderSectionCard
        icon={<svg aria-hidden />}
        title="Price Change"
        body="Price increased 12% this week."
      />,
    );
    expect(screen.getByText("Price increased 12% this week.")).toBeInTheDocument();
  });

  it("renders ReactNode body content", () => {
    render(
      <WhyOrderSectionCard
        icon={<svg aria-hidden />}
        title="Reasons"
        body={
          <ul>
            <li>Reason one</li>
            <li>Reason two</li>
          </ul>
        }
      />,
    );
    expect(screen.getByText("Reason one")).toBeInTheDocument();
    expect(screen.getByText("Reason two")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    render(
      <WhyOrderSectionCard
        icon={<svg data-testid="card-icon" aria-hidden />}
        title="Alert"
        body="Body text"
      />,
    );
    expect(screen.getByTestId("card-icon")).toBeInTheDocument();
  });
});
