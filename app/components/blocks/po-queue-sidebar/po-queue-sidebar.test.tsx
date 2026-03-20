import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { ProcurementRunData } from "@models/procurement";
import { POQueueSidebar } from "./po-queue-sidebar";

const MOCK_DATA: ProcurementRunData = {
  stats: {
    purchaseOrderCount: 12,
    supplierCount: 4,
    proposedSpend: 25000,
    stockOutsAtRisk: 18,
  },
  vendors: [
    {
      id: "vendor-1",
      vendorName: "MedCore Distribution",
      urgency: "out-of-stock",
      value: 4609,
      skuCount: 6,
      earliestStockout: "Mar 19",
      poSummary: {
        poNumber: "PO-1099",
        value: 4609,
        leadTimeDays: 3,
        leadTimeEta: "Mar 22",
        confidencePercent: 92,
        confidenceLabel: "High",
        skuCount: 6,
        skuNote: "2 at risk",
      },
      demandSignal: { summary: "Test signal" },
      riskFactors: [],
      lineItems: [],
    },
    {
      id: "vendor-2",
      vendorName: "ClearPath Rx",
      urgency: "urgent",
      value: 3200,
      skuCount: 4,
      earliestStockout: "Mar 21",
      poSummary: {
        poNumber: "PO-1042",
        value: 3200,
        leadTimeDays: 5,
        leadTimeEta: "Mar 24",
        confidencePercent: 85,
        confidenceLabel: "Medium",
        skuCount: 4,
        skuNote: "1 at risk",
      },
      demandSignal: { summary: "Test signal" },
      riskFactors: [],
      lineItems: [],
    },
    {
      id: "vendor-3",
      vendorName: "Summit Pharma Supplies",
      value: 4960,
      skuCount: 5,
      earliestStockout: "Mar 27",
      poSummary: {
        poNumber: "PO-1047",
        value: 4960,
        leadTimeDays: 4,
        leadTimeEta: "Mar 23",
        confidencePercent: 88,
        confidenceLabel: "High",
        skuCount: 5,
        skuNote: "Partial fill",
      },
      demandSignal: { summary: "Test signal" },
      riskFactors: [],
      lineItems: [],
    },
  ],
};

const DEFAULT_PROPS = {
  data: MOCK_DATA,
  selectedVendorId: "vendor-1",
  onSelectVendor: vi.fn(),
} as const;

describe("POQueueSidebar", () => {
  it("renders the procurement run title", () => {
    render(<POQueueSidebar {...DEFAULT_PROPS} />);

    expect(screen.getByText("Procurement Run")).toBeInTheDocument();
  });

  it("renders all vendor names", () => {
    render(<POQueueSidebar {...DEFAULT_PROPS} />);

    expect(screen.getByText("MedCore Distribution")).toBeInTheDocument();
    expect(screen.getByText("ClearPath Rx")).toBeInTheDocument();
    expect(screen.getByText("Summit Pharma Supplies")).toBeInTheDocument();
  });

  it("calls onSelectVendor with vendor id when a card is clicked", () => {
    const handleSelectVendor = vi.fn();

    render(
      <POQueueSidebar
        {...DEFAULT_PROPS}
        onSelectVendor={handleSelectVendor}
      />,
    );

    const buttons = screen.getAllByRole("button");
    buttons[buttons.length - 1].click();

    expect(handleSelectVendor).toHaveBeenCalledWith("vendor-3");
  });

  it("sorts vendors by urgency — out-of-stock before urgent before none", () => {
    render(<POQueueSidebar {...DEFAULT_PROPS} />);

    const buttons = screen.getAllByRole("button");
    const vendorNames = buttons.map((button) => button.textContent ?? "");

    const medcoreIndex = vendorNames.findIndex((t) =>
      t.includes("MedCore Distribution"),
    );
    const clearpathIndex = vendorNames.findIndex((t) =>
      t.includes("ClearPath Rx"),
    );
    const summitIndex = vendorNames.findIndex((t) =>
      t.includes("Summit Pharma Supplies"),
    );

    expect(medcoreIndex).toBeLessThan(clearpathIndex);
    expect(clearpathIndex).toBeLessThan(summitIndex);
  });

  it("renders procurement stats", () => {
    const { container } = render(<POQueueSidebar {...DEFAULT_PROPS} />);
    const text = container.textContent ?? "";

    expect(text).toContain("12");
    expect(text).toContain("18");
  });
});
