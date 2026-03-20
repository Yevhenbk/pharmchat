import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@providers/store-provider", () => ({
  useDashboardStore: vi.fn((selector: (s: {
    procurementData: null;
    confirmedVendorIds: Set<string>;
  }) => unknown) =>
    selector({
      procurementData: null,
      confirmedVendorIds: new Set(),
    }),
  ),
}));

vi.mock("@stores/glance-store", () => ({
  useGlanceStore: vi.fn((selector: (s: {
    overrides: Record<string, never>;
    sentPoCount: number;
    setOverride: () => void;
    incrementSentPoCount: () => void;
  }) => unknown) =>
    selector({
      overrides: {},
      sentPoCount: 0,
      setOverride: vi.fn(),
      incrementSentPoCount: vi.fn(),
    }),
  ),
}));

vi.mock("@hooks/use-upcoming-risks", () => ({
  useUpcomingRisks: vi.fn(() => []),
}));

import { StatsPanel } from "./stats-panel";

describe("StatsPanel", () => {
  it("renders the Today at a glance footer label", () => {
    render(<StatsPanel />);
    expect(screen.getByText("Today at a glance")).toBeInTheDocument();
  });

  it("renders stat row labels", () => {
    const { container } = render(<StatsPanel />);
    const text = container.textContent ?? "";
    expect(text).toContain("Proposed spend");
    expect(text).toContain("Deliveries arriving");
    expect(text).toContain("POs ready");
  });

  it("renders the Upcoming Risk section", () => {
    const { container } = render(<StatsPanel />);
    expect(container.textContent).toContain("Upcoming Risk");
  });

  it("renders risk items when useUpcomingRisks returns data", async () => {
    const { useUpcomingRisks } = await import("@hooks/use-upcoming-risks");
    (useUpcomingRisks as ReturnType<typeof vi.fn>).mockReturnValue([
      {
        id: "risk-1",
        sku: "AMX-500",
        productName: "Amoxicillin 500mg",
        description: "Runs out in 2 days at current dispensing rate.",
      },
    ]);

    render(<StatsPanel />);
    expect(screen.getByText("Amoxicillin 500mg")).toBeInTheDocument();
  });
});
