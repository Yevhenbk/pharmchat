import type {
  ProcurementRunStats,
  SKULineItem,
  SKUStatus,
  VendorOrder,
  VendorUrgency,
} from "@models/procurement";

const SKU_TO_VENDOR_URGENCY: Partial<Record<SKUStatus, VendorUrgency>> = {
  "out-of-stock": "out-of-stock",
  urgent: "urgent",
};

const URGENCY_RANK: Record<VendorUrgency, number> = {
  "out-of-stock": 0,
  urgent: 1,
};

function reduceUrgency({
  current,
  next,
}: {
  current: VendorUrgency | undefined;
  next: VendorUrgency;
}): VendorUrgency {
  if (!current || URGENCY_RANK[next] < URGENCY_RANK[current]) {
    return next;
  }

  return current;
}

const AT_RISK_STATUSES: ReadonlySet<SKUStatus> = new Set([
  "out-of-stock",
  "urgent",
]);

export class ProcurementService {
  static deriveVendorUrgency(
    lineItems: readonly SKULineItem[],
  ): VendorUrgency | undefined {
    return lineItems.reduce<VendorUrgency | undefined>(
      (worst, item) => {
        const mapped = SKU_TO_VENDOR_URGENCY[item.status];

        if (!mapped) {
          return worst;
        }

        return reduceUrgency({
          current: worst,
          next: mapped,
        });
      },
      undefined,
    );
  }

  static deriveOrderValue({
    unitPrice,
    recommendedQuantity,
  }: {
    unitPrice: number;
    recommendedQuantity: number;
  }): number {
    return unitPrice * recommendedQuantity;
  }

  static deriveLineItems(
    lineItems: readonly SKULineItem[],
  ): readonly SKULineItem[] {
    return lineItems.map((item) => ({
      ...item,
      orderValue: ProcurementService.deriveOrderValue(item),
    }));
  }

  static deriveVendor(
    vendor: VendorOrder,
  ): VendorOrder {
    const lineItems =
      ProcurementService.deriveLineItems(
        vendor.lineItems,
      );

    const value = lineItems.reduce(
      (sum, item) => sum + item.orderValue,
      0,
    );

    const skuCount = lineItems.length;

    return {
      ...vendor,
      lineItems,
      value,
      skuCount,
      urgency:
        ProcurementService.deriveVendorUrgency(lineItems),
      poSummary: {
        ...vendor.poSummary,
        value,
        skuCount,
      },
    };
  }

  static deriveStats(
    vendors: readonly VendorOrder[],
  ): ProcurementRunStats {
    return {
      purchaseOrderCount: vendors.length,
      supplierCount: vendors.length,
      proposedSpend: vendors.reduce(
        (sum, vendor) => sum + vendor.value,
        0,
      ),
      stockOutsAtRisk: vendors.reduce(
        (count, vendor) =>
          count +
          vendor.lineItems.filter((item) =>
            AT_RISK_STATUSES.has(item.status),
          ).length,
        0,
      ),
    };
  }
}
