import type { VendorOrder } from "@models/procurement";
import type {
  OrderCancelledData,
  DemandSurgeData,
} from "@models/action-content";

export function buildVendorFromOrderCancelled({
  data,
}: {
  data: OrderCancelledData;
}): VendorOrder {
  const replacement = data.proposedReplacement;

  return {
    id: `action-oc-${replacement.sku}`,
    vendorName: replacement.vendor,
    urgency: "urgent",
    value: replacement.totalCost,
    skuCount: 1,
    earliestStockout: "3 days",
    poSummary: {
      poNumber: `PO-${replacement.sku.replace(/[^0-9]/g, "")}`,
      value: replacement.totalCost,
      leadTimeDays: parseInt(replacement.leadTime, 10) || 6,
      leadTimeEta: replacement.leadTime,
      confidencePercent: 88,
      confidenceLabel: "High",
      skuCount: 1,
      skuNote: "Replacement order",
    },
    demandSignal: {
      summary:
        "Emergency replacement order to cover cancelled PO.",
    },
    riskFactors: [
      {
        id: "rf-oc-1",
        label: "Stockout risk if not approved",
        severity: "critical",
      },
    ],
    lineItems: [
      {
        id: `li-oc-${replacement.sku}`,
        skuCode: replacement.sku,
        name: replacement.product,
        status: "out-of-stock",
        currentInventory: 0,
        runOutDate: "3 days",
        unitPrice:
          replacement.totalCost /
          parseInt(replacement.quantity, 10),
        recommendedQuantity: parseInt(
          replacement.quantity,
          10,
        ),
        orderValue: replacement.totalCost,
      },
    ],
  };
}

export function buildVendorFromDemandSurge({
  data,
}: {
  data: DemandSurgeData;
}): VendorOrder {
  const optimized = data.optimizedOrder;

  return {
    id: `action-ds-${optimized.vendor.replace(/\s/g, "-").toLowerCase()}`,
    vendorName: optimized.vendor,
    urgency: "urgent",
    value: optimized.total,
    skuCount: optimized.rows.length,
    earliestStockout: `${data.currentCoverage.stockCoverageDays} days`,
    poSummary: {
      poNumber: "PO-892-OPT",
      value: optimized.total,
      leadTimeDays: 4,
      leadTimeEta: "4 Days",
      confidencePercent: 91,
      confidenceLabel: "High",
      skuCount: optimized.rows.length,
      skuNote: "Demand-adjusted quantities",
    },
    demandSignal: {
      summary: data.demandSignal,
    },
    riskFactors: [
      {
        id: "rf-ds-1",
        label: `Stock coverage at ${data.currentCoverage.stockCoverageDays} days`,
        severity: "warning",
      },
    ],
    lineItems: optimized.rows.map((row, index) => ({
      id: `li-ds-${index}`,
      skuCode: row.sku,
      name: row.name,
      status: "low-stock" as const,
      currentInventory: 0,
      runOutDate: `${data.currentCoverage.stockCoverageDays} days`,
      unitPrice:
        row.subtotal / row.quantity,
      recommendedQuantity: row.quantity,
      orderValue: row.subtotal,
    })),
  };
}
