import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { VendorOrder } from "@models/procurement";
import { POConfirmPopover } from "./po-confirm-popover";

const MOCK_VENDOR: VendorOrder = {
  id: "medcore-dist",
  vendorName: "MedCore Distribution",
  urgency: "out-of-stock",
  value: 8640,
  skuCount: 2,
  earliestStockout: "Mar 19",
  supplierEmail: "s.mills@medcore-distribution.com",
  poSummary: {
    poNumber: "PO-1099",
    value: 8640,
    leadTimeDays: 3,
    leadTimeEta: "Mar 22",
    confidencePercent: 92,
    confidenceLabel: "High",
    skuCount: 2,
    skuNote: "2 at risk",
  },
  demandSignal: { summary: "Seasonal peak." },
  riskFactors: [],
  lineItems: [
    {
      id: "li-1",
      skuCode: "AMOX500",
      name: "Amoxicillin 500mg Capsules",
      status: "out-of-stock",
      currentInventory: 0,
      runOutDate: "Mar 17",
      unitPrice: 21.0,
      recommendedQuantity: 240,
      orderValue: 5040,
    },
    {
      id: "li-2",
      skuCode: "AZIT250",
      name: "Azithromycin 250mg Tablets",
      status: "urgent",
      currentInventory: 12,
      runOutDate: "Mar 21",
      unitPrice: 18.5,
      recommendedQuantity: 180,
      orderValue: 3330,
    },
  ],
};

const DEFAULT_PROPS = {
  vendor: MOCK_VENDOR,
  totalValue: 8370,
  onNextVendor: vi.fn(),
};

describe("POConfirmPopover", () => {
  it("renders the initial building state title", () => {
    render(<POConfirmPopover {...DEFAULT_PROPS} />);

    expect(screen.getByText("Building PO...")).toBeInTheDocument();
  });

  it("renders all line item SKU codes", () => {
    render(<POConfirmPopover {...DEFAULT_PROPS} />);

    expect(screen.getByText("AMOX500")).toBeInTheDocument();
    expect(screen.getByText("AZIT250")).toBeInTheDocument();
  });

  it("renders line item names", () => {
    render(<POConfirmPopover {...DEFAULT_PROPS} />);

    expect(screen.getByText("Amoxicillin 500mg Capsules")).toBeInTheDocument();
    expect(screen.getByText("Azithromycin 250mg Tablets")).toBeInTheDocument();
  });

  it("renders the Next PO button as disabled initially", () => {
    render(<POConfirmPopover {...DEFAULT_PROPS} />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("renders a custom nextLabel", () => {
    render(<POConfirmPopover {...DEFAULT_PROPS} nextLabel="Done" />);

    expect(screen.getByRole("button")).toHaveTextContent("Done");
  });
});
