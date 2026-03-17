import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { VendorOrder } from "@models/procurement";

import { POQueueContent } from "./po-queue-content";

const MOCK_VENDOR: VendorOrder = {
  id: "harvest-hearth",
  vendorName: "Harvest & Hearth Provisions",
  urgency: "out-of-stock",
  value: 4609,
  skuCount: 24,
  earliestStockout: "22 Jan",
  poSummary: {
    poNumber: "PO-2026-892",
    value: 4609,
    leadTimeDays: 5,
    leadTimeEta: "Feb 22",
    confidencePercent: 94,
    confidenceLabel: "High",
    skuCount: 24,
    skuNote: "3 New Items",
  },
  demandSignal: {
    summary: "Projected demand spike with holiday weekend.",
  },
  riskFactors: [
    { id: "rf-1", label: "Demand Spike (+15%)", severity: "critical" },
    { id: "rf-2", label: "Weather warning", severity: "warning" },
  ],
  lineItems: [
    {
      id: "li-1",
      skuCode: "12345",
      name: "Atlantic Salmon Fillet",
      status: "out-of-stock",
      currentInventory: 0,
      runOutDate: "5 days ago",
      unitPrice: 180,
      recommendedQuantity: 5,
      orderValue: 900,
    },
  ],
};

describe("POQueueContent", () => {
  it("renders the vendor name as heading", () => {
    render(<POQueueContent vendor={MOCK_VENDOR} />);

    expect(
      screen.getByText("Harvest & Hearth Provisions"),
    ).toBeInTheDocument();
  });

  it("renders all key content sections", () => {
    const { container } = render(
      <POQueueContent vendor={MOCK_VENDOR} />,
    );
    const text = container.textContent ?? "";

    expect(text).toContain("PO-2026-892");
    expect(text).toContain("Projected demand spike");
    expect(text).toContain("Demand Spike (+15%)");
    expect(text).toContain("Weather warning");
    expect(text).toContain("PURCHASE ORDER RECOMMENDATION");
    expect(text).toContain("12345");
  });

  it("renders the confirm button and total", () => {
    const { container } = render(
      <POQueueContent vendor={MOCK_VENDOR} />,
    );
    const text = container.textContent ?? "";

    const confirmButtons = screen.getAllByRole("button", {
      name: "Confirm",
    });

    expect(confirmButtons.length).toBeGreaterThanOrEqual(1);
    expect(text).toContain("Total");
    expect(text).toContain("900");
  });
});
