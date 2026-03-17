export const VENDOR_URGENCIES = [
  "out-of-stock",
  "urgent",
] as const;

export type VendorUrgency = (typeof VENDOR_URGENCIES)[number];

export const SKU_STATUSES = [
  "out-of-stock",
  "urgent",
  "low-stock",
  "normal",
] as const;

export type SKUStatus = (typeof SKU_STATUSES)[number];

export const RISK_SEVERITIES = ["critical", "warning", "info"] as const;

export type RiskSeverity = (typeof RISK_SEVERITIES)[number];

export interface ProcurementRunStats {
  readonly purchaseOrderCount: number;
  readonly supplierCount: number;
  readonly proposedSpend: number;
  readonly stockOutsAtRisk: number;
}

export interface SKULineItem {
  readonly id: string;
  readonly skuCode: string;
  readonly name: string;
  readonly status: SKUStatus;
  readonly currentInventory: number;
  readonly runOutDate: string;
  readonly unitPrice: number;
  readonly recommendedQuantity: number;
  readonly orderValue: number;
}

export interface RiskFactor {
  readonly id: string;
  readonly label: string;
  readonly severity: RiskSeverity;
}

export interface DemandSignal {
  readonly summary: string;
}

export interface POSummary {
  readonly poNumber: string;
  readonly value: number;
  readonly leadTimeDays: number;
  readonly leadTimeEta: string;
  readonly confidencePercent: number;
  readonly confidenceLabel: string;
  readonly skuCount: number;
  readonly skuNote: string;
}

export interface VendorOrder {
  readonly id: string;
  readonly vendorName: string;
  readonly urgency?: VendorUrgency;
  readonly value: number;
  readonly skuCount: number;
  readonly earliestStockout: string;
  readonly supplierEmail?: string;
  readonly poSummary: POSummary;
  readonly demandSignal: DemandSignal;
  readonly riskFactors: readonly RiskFactor[];
  readonly lineItems: readonly SKULineItem[];
}

export interface ProcurementRunData {
  readonly stats: ProcurementRunStats;
  readonly vendors: readonly VendorOrder[];
}

