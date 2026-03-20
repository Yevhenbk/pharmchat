import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { VendorOrder } from "@models/procurement";
import { SKUReasoningSidebar } from "./sku-reasoning-sidebar";

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
  demandSignal: { summary: "Seasonal respiratory illness peak." },
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
  open: true,
  skuId: "li-1",
  vendor: MOCK_VENDOR,
  onClose: vi.fn(),
};

describe("SKUReasoningSidebar", () => {
  it("renders nothing when open is false", () => {
    const { container } = render(
      <SKUReasoningSidebar {...DEFAULT_PROPS} open={false} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders the dialog when open is true", () => {
    render(<SKUReasoningSidebar {...DEFAULT_PROPS} />);

    expect(
      screen.getByRole("dialog", { name: "Why order this item" }),
    ).toBeInTheDocument();
  });

  it("renders nothing when skuId does not match any line item", () => {
    const { container } = render(
      <SKUReasoningSidebar {...DEFAULT_PROPS} skuId="li-999" />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when vendor is not provided", () => {
    const { container } = render(
      <SKUReasoningSidebar {...DEFAULT_PROPS} vendor={undefined} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("shows the SKU code and name from the matching line item", () => {
    render(<SKUReasoningSidebar {...DEFAULT_PROPS} />);

    const { container } = render(<SKUReasoningSidebar {...DEFAULT_PROPS} />);
    const text = container.textContent ?? "";

    expect(text).toContain("AMOX500");
  });
});
