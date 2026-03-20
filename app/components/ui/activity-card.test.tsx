import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ActivityCard } from "./activity-card";

const DEFAULT_PROPS = {
  title: "Placed with McKesson",
  description: "Amoxicillin 500mg · 200 units",
  poNumber: "1099",
  placedAt: "9:14 AM",
};

describe("ActivityCard", () => {
  it("renders title and description", () => {
    render(<ActivityCard {...DEFAULT_PROPS} />);
    expect(screen.getByText("Placed with McKesson")).toBeInTheDocument();
    expect(
      screen.getByText("Amoxicillin 500mg · 200 units"),
    ).toBeInTheDocument();
  });

  it("renders PO number", () => {
    render(<ActivityCard {...DEFAULT_PROPS} />);
    expect(screen.getByText("PO #1099")).toBeInTheDocument();
  });

  it("renders placedAt time", () => {
    render(<ActivityCard {...DEFAULT_PROPS} />);
    expect(screen.getByText("9:14 AM")).toBeInTheDocument();
  });

  it("renders with active variant without error", () => {
    const { container } = render(
      <ActivityCard {...DEFAULT_PROPS} variant="active" />,
    );
    expect(container.firstChild).not.toBeNull();
  });
});
