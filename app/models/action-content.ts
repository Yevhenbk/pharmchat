export interface Medication {
  readonly name: string;
  readonly daysOnHand: number;
  readonly unitPrice: number;
}

export const DISRUPTION_SEVERITIES = [
  "CRITICAL",
  "WARNING",
  "INFO",
] as const;

export type DisruptionSeverity =
  (typeof DISRUPTION_SEVERITIES)[number];

export interface DisruptionReport {
  readonly severity: DisruptionSeverity;
  readonly recommendedAction: string;
  readonly isNationalShortage: boolean;
  readonly medicationName: string | undefined;
}

export interface EmailData {
  readonly from: string;
  readonly subject: string;
  readonly body: string;
  readonly bodyHtml?: string;
  readonly to?: string;
  readonly cc?: string;
  readonly date?: string;
}

export interface OrderSnapshot {
  readonly vendor: string;
  readonly sku: string;
  readonly product: string;
  readonly quantity: string;
  readonly totalCost: number;
  readonly leadTime: string;
}

export interface OrderCancelledData {
  readonly email: EmailData;
  readonly originalOrder: OrderSnapshot;
  readonly proposedReplacement: OrderSnapshot;
  readonly costDelta: number;
  readonly leadTimeDelta: string;
  readonly isDosageChange: boolean;
  readonly clinicalWarning?: string;
  readonly ifRejected: {
    readonly consequences: readonly string[];
    readonly tags: readonly string[];
  };
  readonly ifApproved: {
    readonly summary: string;
    readonly tags?: readonly string[];
  };
}

export interface DemandSurgeSKURow {
  readonly sku: string;
  readonly name: string;
  readonly quantity: number;
  readonly subtotal: number;
}

export interface DemandSurgeData {
  readonly demandSignal: string;
  readonly currentOrder: {
    readonly vendor: string;
    readonly rows: readonly DemandSurgeSKURow[];
    readonly total: number;
  };
  readonly optimizedOrder: {
    readonly vendor: string;
    readonly rows: readonly (DemandSurgeSKURow & {
      readonly quantityDelta: number;
    })[];
    readonly total: number;
    readonly totalDelta: number;
  };
  readonly currentCoverage: {
    readonly stockCoverageDays: number;
    readonly poRevenue: number;
  };
  readonly optimizedCoverage: {
    readonly stockCoverageDays: number;
    readonly poRevenue: number;
  };
}

export interface AffectedSKU {
  readonly sku: string;
  readonly name: string;
  readonly orderedQuantity: string;
  readonly daysOnHand: number;
  readonly safeThrough: string;
}

export interface DeliveryDelayData {
  readonly email: EmailData;
  readonly vendor: string;
  readonly originalEta: string;
  readonly revisedEta: string;
  readonly delayDuration: string;
  readonly stockoutRisk: string;
  readonly affectedSkus: readonly AffectedSKU[];
}

export interface RecommendedAction {
  readonly label: string;
  readonly checked: boolean;
}

export interface InTransitItem {
  readonly sku: string;
  readonly name: string;
  readonly quantity: number;
  readonly subtotal: number;
}

export interface EarlyArrivalData {
  readonly email: EmailData;
  readonly originalEta: string;
  readonly newEta: string;
  readonly hoursEarly: number;
  readonly recommendedActions: readonly RecommendedAction[];
  readonly inTransitItems: readonly InTransitItem[];
  readonly total: number;
}

// ── Partial Fill ──────────────────────────────────────────

export interface PartialFillSKURow {
  readonly sku: string;
  readonly name: string;
  readonly orderedQuantity: number;
  readonly deliveredQuantity: number;
  readonly backorderedQuantity: number;
  readonly daysOnHand: number;
  readonly stockoutDate: string;
}

export interface PartialFillData {
  readonly email: EmailData;
  readonly vendor: string;
  readonly backorderEta: string;
  readonly skus: readonly PartialFillSKURow[];
  readonly miraInsight: string;
  readonly ifAccepted: {
    readonly summary: string;
    readonly tags?: readonly string[];
  };
  readonly ifRejected: {
    readonly consequences: readonly string[];
    readonly tags: readonly string[];
  };
}

// ── SKU Backordered ───────────────────────────────────────

export interface BackorderedSKU {
  readonly sku: string;
  readonly name: string;
  readonly orderedQuantity: string;
  readonly daysOnHand: number;
  readonly stockoutDate: string;
  readonly alternatives: readonly string[];
}

export interface SkuBackorderedData {
  readonly email: EmailData;
  readonly vendor: string;
  readonly availableDate: string;
  readonly backordered: readonly BackorderedSKU[];
  readonly miraInsight: string;
  readonly ifActioned: {
    readonly summary: string;
    readonly tags?: readonly string[];
  };
  readonly ifIgnored: {
    readonly consequences: readonly string[];
    readonly tags: readonly string[];
  };
}

// ── Not Confirmed ─────────────────────────────────────────

export interface NotConfirmedSKU {
  readonly sku: string;
  readonly name: string;
  readonly quantity: string;
}

export interface NotConfirmedData {
  readonly vendor: string;
  readonly poNumber: string;
  readonly poValue: number;
  readonly expectedBy: string;
  readonly hoursOverdue: number;
  readonly scheduledDelivery: string;
  readonly skus: readonly NotConfirmedSKU[];
  readonly miraInsight: string;
}

// ── Price Increase ────────────────────────────────────────

export interface PriceIncreaseSKU {
  readonly sku: string;
  readonly name: string;
  readonly previousUnitPrice: number;
  readonly newUnitPrice: number;
  readonly percentageIncrease: number;
  readonly monthlyUnits: number;
}

export interface PriceIncreaseData {
  readonly vendor: string;
  readonly effectiveDate: string;
  readonly skus: readonly PriceIncreaseSKU[];
  readonly totalMonthlyImpact: number;
  readonly miraInsight: string;
}

// ── Live Gmail Email ──────────────────────────────────────

export type LiveEmailFooter = "approve-reject" | "acknowledge";

export interface LiveEmailAnalysis {
  readonly orderDetails: {
    readonly vendor: string;
    readonly skus: string;
    readonly quantity: string;
    readonly value: string;
    readonly date: string;
    readonly poRef: string;
  };
  readonly impactAnalysis: {
    readonly stockoutRisk: string;
    readonly financialExposure: string;
    readonly rxAtRisk: string;
    readonly shortageListed: string;
  };
  readonly recommendedActions: readonly string[];
  readonly miraInsight: string;
  readonly ifIgnored: string;
  readonly ifActioned: string;
}

export interface LiveEmailData {
  readonly email: EmailData;
  readonly classifiedAs: string;
  readonly miraInsight: string;
  readonly footerVariant: LiveEmailFooter;
  readonly analysis?: LiveEmailAnalysis;
}

// ── Discriminated union ───────────────────────────────────

export type ActionContentEntry =
  | { readonly type: "order-cancelled"; readonly data: OrderCancelledData }
  | { readonly type: "demand-surge"; readonly data: DemandSurgeData }
  | { readonly type: "delivery-delay"; readonly data: DeliveryDelayData }
  | { readonly type: "early-arrival"; readonly data: EarlyArrivalData }
  | { readonly type: "partial-fill"; readonly data: PartialFillData }
  | { readonly type: "sku-backordered"; readonly data: SkuBackorderedData }
  | { readonly type: "not-confirmed"; readonly data: NotConfirmedData }
  | { readonly type: "price-increase"; readonly data: PriceIncreaseData }
  | { readonly type: "live-email"; readonly data: LiveEmailData };
