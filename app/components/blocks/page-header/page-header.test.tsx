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

import { PageHeader } from "./page-header";

describe("PageHeader", () => {
  it("renders the Procurement Run heading", () => {
    render(<PageHeader />);
    expect(screen.getByText("Procurement Run")).toBeInTheDocument();
  });

  it("renders dash placeholder chips when store has no data", () => {
    const { container } = render(<PageHeader />);
    const text = container.textContent ?? "";
    expect(text).toContain("POs pending");
    expect(text).toContain("proposed spend");
    // Both values should fall back to the em-dash placeholder
    expect(text).toContain("–");
  });

  it("renders PO count and spend when procurement data is available", async () => {
    const { useDashboardStore } = await import("@providers/store-provider");

    (useDashboardStore as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: (s: {
        procurementData: { vendors: { id: string }[]; stats: { proposedSpend: number; stockOutsAtRisk: number } };
        confirmedVendorIds: Set<string>;
      }) => unknown) =>
        selector({
          procurementData: {
            vendors: [{ id: "v1" }, { id: "v2" }, { id: "v3" }],
            stats: { proposedSpend: 12500, stockOutsAtRisk: 0 },
          },
          confirmedVendorIds: new Set(["v1"]),
        }),
    );

    const { container } = render(<PageHeader />);
    const text = container.textContent ?? "";

    // 3 vendors − 1 confirmed = 2 POs pending
    expect(text).toContain("2");
    // $12,500 → $12.5k
    expect(text).toContain("$12.5k");
  });

  it("shows stock-outs chip when stockOutsAtRisk is greater than zero", async () => {
    const { useDashboardStore } = await import("@providers/store-provider");

    (useDashboardStore as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: (s: {
        procurementData: { vendors: { id: string }[]; stats: { proposedSpend: number; stockOutsAtRisk: number } };
        confirmedVendorIds: Set<string>;
      }) => unknown) =>
        selector({
          procurementData: {
            vendors: [{ id: "v1" }],
            stats: { proposedSpend: 5000, stockOutsAtRisk: 3 },
          },
          confirmedVendorIds: new Set(),
        }),
    );

    const { container } = render(<PageHeader />);
    expect(container.textContent).toContain("stock-outs at risk");
    expect(container.textContent).toContain("3");
  });
});
