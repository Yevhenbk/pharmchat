import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ActivityItem } from "./activity-item";

describe("ActivityItem", () => {
  it("renders the title", () => {
    render(
      <ActivityItem
        title="PO submitted to Harvest & Hearth"
        status="live"
      />,
    );

    expect(
      screen.getByText("PO submitted to Harvest & Hearth"),
    ).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <ActivityItem
        title="Order confirmed"
        description="All 24 SKUs confirmed"
        status="done"
      />,
    );

    expect(screen.getByText("All 24 SKUs confirmed")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    render(<ActivityItem title="Stock level updated" status="done" />);

    expect(screen.queryByText("description")).not.toBeInTheDocument();
  });

  it("renders poNumber and time when provided", () => {
    const { container } = render(
      <ActivityItem
        title="PO submitted"
        status="live"
        poNumber="PO-2026-892"
        time="2m ago"
      />,
    );
    const text = container.textContent ?? "";

    expect(text).toContain("PO-2026-892");
    expect(text).toContain("2m ago");
  });

  it("does not render poNumber or time when absent", () => {
    const { container } = render(
      <ActivityItem title="Stock update" status="done" />,
    );
    const text = container.textContent ?? "";

    expect(text).not.toContain("PO-");
    expect(text).not.toContain("ago");
  });
});
