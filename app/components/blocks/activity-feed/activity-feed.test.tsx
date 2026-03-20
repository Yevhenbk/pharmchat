import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@providers/store-provider", () => ({
  useDashboardStore: vi.fn((selector: (s: { procurementData: null }) => unknown) =>
    selector({ procurementData: null }),
  ),
}));

vi.mock("@hooks/use-activity-feed", () => ({
  useActivityFeed: vi.fn(() => []),
}));

import { ActivityFeed } from "./activity-feed";

describe("ActivityFeed", () => {
  it("renders the Mira Activity heading", () => {
    render(<ActivityFeed />);
    expect(screen.getByText("Mira Activity")).toBeInTheDocument();
  });

  it("shows loading skeletons when store is not yet initialized", () => {
    const { container } = render(<ActivityFeed />);
    // 7 skeleton rows are rendered; each has the shimmer div
    const shimmerDivs = container.querySelectorAll(".skeleton-shimmer");
    expect(shimmerDivs.length).toBeGreaterThan(0);
  });

  it("shows empty state message when initialized with no activities", async () => {
    const { useDashboardStore } = await import("@providers/store-provider");
    (useDashboardStore as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: (s: { procurementData: object }) => unknown) =>
        selector({ procurementData: {} as never }),
    );

    render(<ActivityFeed />);
    expect(
      screen.getByText(/No activity yet/i),
    ).toBeInTheDocument();
  });

  it("renders activity cards when activities are present", async () => {
    const { useDashboardStore } = await import("@providers/store-provider");
    const { useActivityFeed } = await import("@hooks/use-activity-feed");

    (useDashboardStore as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: (s: { procurementData: object }) => unknown) =>
        selector({ procurementData: {} as never }),
    );
    (useActivityFeed as ReturnType<typeof vi.fn>).mockReturnValue([
      {
        id: "real-evt-1",
        title: "PO sent to Harvest Provisions",
        description: "3 items — $4,609",
        icon: "email",
        poNumber: "2026-892",
        status: "live",
        startedAt: Date.now(),
        placedAt: "9:30 AM",
      },
    ]);

    render(<ActivityFeed />);
    expect(screen.getByText("PO sent to Harvest Provisions")).toBeInTheDocument();
  });
});
