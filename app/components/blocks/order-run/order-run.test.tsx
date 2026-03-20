import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@providers/store-provider", () => ({
  useDashboardStore: vi.fn((selector: (s: {
    procurementData: null;
    confirmedVendorIds: Set<string>;
    logActivity: () => void;
  }) => unknown) =>
    selector({
      procurementData: null,
      confirmedVendorIds: new Set(),
      logActivity: vi.fn(),
    }),
  ),
}));

vi.mock("@stores/glance-store", () => ({
  useGlanceStore: vi.fn((selector: (s: { incrementSentPoCount: () => void }) => unknown) =>
    selector({ incrementSentPoCount: vi.fn() }),
  ),
}));

import type { VendorOrder } from "@models/procurement";
import { OrderRun } from "./order-run";

const MOCK_VENDOR: VendorOrder = {
  id: "vendor-1",
  vendorName: "Harvest & Hearth Provisions",
  urgency: "out-of-stock",
  value: 4609,
  skuCount: 3,
  earliestStockout: "2026-03-22",
  supplierEmail: "orders@harvest.example.com",
  poSummary: {
    poNumber: "PO-2026-892",
    value: 4609,
    leadTimeDays: 5,
    leadTimeEta: "Mar 27",
    confidencePercent: 94,
    confidenceLabel: "High",
    skuCount: 3,
    skuNote: "1 New Item",
  },
  demandSignal: {
    summary: "Projected demand spike correlating with holiday weekend.",
  },
  riskFactors: [
    { id: "rf-1", label: "Demand Spike (+15%)", severity: "critical" },
  ],
  lineItems: [
    {
      id: "li-1",
      skuCode: "12345",
      name: "Atlantic Salmon Fillet",
      status: "out-of-stock",
      currentInventory: 0,
      runOutDate: "2026-03-20",
      unitPrice: 180,
      recommendedQuantity: 5,
      orderValue: 900,
    },
  ],
};

describe("OrderRun", () => {
  it("shows empty state when no procurement data is available", () => {
    render(<OrderRun />);
    expect(screen.getByText("No pending orders")).toBeInTheDocument();
  });

  it("shows empty state when all vendors are confirmed", async () => {
    const { useDashboardStore } = await import("@providers/store-provider");

    (useDashboardStore as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: (s: {
        procurementData: { vendors: VendorOrder[] };
        confirmedVendorIds: Set<string>;
        logActivity: () => void;
      }) => unknown) =>
        selector({
          procurementData: { vendors: [MOCK_VENDOR] },
          confirmedVendorIds: new Set(["vendor-1"]),
          logActivity: vi.fn(),
        }),
    );

    render(<OrderRun />);
    expect(screen.getByText("No pending orders")).toBeInTheDocument();
  });

  it("renders vendor table when vendors are pending", async () => {
    const { useDashboardStore } = await import("@providers/store-provider");

    (useDashboardStore as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: (s: {
        procurementData: { vendors: VendorOrder[] };
        confirmedVendorIds: Set<string>;
        logActivity: () => void;
      }) => unknown) =>
        selector({
          procurementData: { vendors: [MOCK_VENDOR] },
          confirmedVendorIds: new Set(),
          logActivity: vi.fn(),
        }),
    );

    render(<OrderRun />);
    expect(screen.getByText("Harvest & Hearth Provisions")).toBeInTheDocument();
    expect(screen.getByText("PO-2026-892")).toBeInTheDocument();
  });

  it("renders the send POs button with correct count", async () => {
    const { useDashboardStore } = await import("@providers/store-provider");

    (useDashboardStore as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: (s: {
        procurementData: { vendors: VendorOrder[] };
        confirmedVendorIds: Set<string>;
        logActivity: () => void;
      }) => unknown) =>
        selector({
          procurementData: { vendors: [MOCK_VENDOR] },
          confirmedVendorIds: new Set(),
          logActivity: vi.fn(),
        }),
    );

    render(<OrderRun />);
    expect(screen.getByText(/Send 1 PO/)).toBeInTheDocument();
  });
});
