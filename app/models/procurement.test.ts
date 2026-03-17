import { describe, it, expect } from "vitest";

import { ProcurementService } from "@services/procurement-service";

import type { SKULineItem } from "./procurement";

function makeSKU(
  overrides: Partial<SKULineItem> = {},
): SKULineItem {
  return {
    id: "sku-1",
    skuCode: "TEST-001",
    name: "Test Item",
    status: "normal",
    currentInventory: 100,
    runOutDate: "30 days",
    unitPrice: 10,
    recommendedQuantity: 50,
    orderValue: 500,
    ...overrides,
  };
}

describe("ProcurementService.deriveVendorUrgency", () => {
  it("returns undefined when all items are normal", () => {
    const items = [
      makeSKU({ status: "normal" }),
      makeSKU({ id: "sku-2", status: "low-stock" }),
    ];

    expect(ProcurementService.deriveVendorUrgency(items)).toBeUndefined();
  });

  it("returns out-of-stock when any item is out-of-stock", () => {
    const items = [
      makeSKU({ status: "normal" }),
      makeSKU({ id: "sku-2", status: "out-of-stock" }),
    ];

    expect(ProcurementService.deriveVendorUrgency(items)).toBe("out-of-stock");
  });

  it("returns urgent when worst status is urgent", () => {
    const items = [
      makeSKU({ status: "urgent" }),
      makeSKU({ id: "sku-2", status: "normal" }),
    ];

    expect(ProcurementService.deriveVendorUrgency(items)).toBe("urgent");
  });

  it("returns out-of-stock over urgent", () => {
    const items = [
      makeSKU({ status: "urgent" }),
      makeSKU({ id: "sku-2", status: "out-of-stock" }),
    ];

    expect(ProcurementService.deriveVendorUrgency(items)).toBe("out-of-stock");
  });

  it("returns undefined for empty array", () => {
    expect(ProcurementService.deriveVendorUrgency([])).toBeUndefined();
  });
});
