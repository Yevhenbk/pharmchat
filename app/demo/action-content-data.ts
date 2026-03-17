import type {
  ActionContentEntry,
  DeliveryDelayData,
  DemandSurgeData,
  EarlyArrivalData,
  NotConfirmedData,
  OrderCancelledData,
  PartialFillData,
  PriceIncreaseData,
  SkuBackorderedData,
} from "@models/action-content";

export const DEMO_ORDER_CANCELLED: OrderCancelledData = {
  email: {
    from: "ops@clearpathrx.com",
    to: "procurement@greenfield-pharmacy.com",
    subject: "None",
    body: "Sam,\n\nWe regret to inform you that we are unable to fulfill Purchase Order #2026-1099 for 240 units of Amoxicillin 500mg Capsules (NDC: 0093-4155-01). Due to an unexpected API (Active Pharmaceutical Ingredient) shortage at our primary manufacturing partner, our current inventory has been depleted.\n\nWe sincerely apologise for the inconvenience; we are working to restore supply by Q2.\n\nRegards, David Chen.",
  },
  originalOrder: {
    vendor: "ClearPath Rx",
    sku: "AMOX500",
    product: "Amoxicillin 500mg Capsules",
    quantity: "240 EA",
    totalCost: 5040,
    leadTime: "4 Days",
  },
  proposedReplacement: {
    vendor: "Summit Pharma Supplies",
    sku: "AMOX500-SP",
    product: "Amoxicillin 500mg Capsules",
    quantity: "240 EA",
    totalCost: 5400,
    leadTime: "6 Days",
  },
  costDelta: 360,
  leadTimeDelta: "+2 Days",
  isDosageChange: true,
  clinicalWarning:
    "⚠️ CLINICAL ALERT: Supplier substitution involves a dosage form change. Pharmacist must verify and update dosage instructions for all pending prescriptions.",
  ifRejected: {
    consequences: [
      "Stockout in 3 days",
      "14 active prescriptions at risk",
      "Patient continuity disruption",
    ],
    tags: [
      "Requires emergency sourcing to fulfill outstanding patient prescriptions",
    ],
  },
  ifApproved: {
    summary:
      "Supply continuity restored until primary vendor recovers in Q2.",
    // Additional tag shown in the "If Approved" consequence panel.
    tags: ["Coverage restored for 31 days"],
  },
};

export const DEMO_ORDER_CANCELLED_DOXYCYCLINE: OrderCancelledData = {
  email: {
    from: "supply@apexpharma.com",
    to: "procurement@greenfield-pharmacy.com",
    subject: "PO #2026-2031 — Doxycycline Hyclate Cancellation",
    body: "Hi,\n\nUnfortunately we are unable to fulfil PO #2026-2031 for 160 tablets of Doxycycline Hyclate 100mg (NDC: 0143-9534-10). Manufacturing capacity constraints at two of our key facilities have resulted in an industry-wide allocation freeze.\n\nWe have identified an alternative supplier and can arrange a transfer order at a modest premium. Please advise.\n\nBest, Priya Nair — Apex Pharma Supply Ops.",
  },
  originalOrder: {
    vendor: "Apex Pharma",
    sku: "DOXY100",
    product: "Doxycycline Hyclate 100mg Tablets",
    quantity: "160 TAB",
    totalCost: 2240,
    leadTime: "3 Days",
  },
  proposedReplacement: {
    vendor: "MedCore Distribution",
    sku: "DOXY100-MC",
    product: "Doxycycline Hyclate 100mg Tablets",
    quantity: "160 TAB",
    totalCost: 2560,
    leadTime: "5 Days",
  },
  costDelta: 320,
  leadTimeDelta: "+2 Days",
  isDosageChange: false,
  ifRejected: {
    consequences: [
      "Stockout in 5 days",
      "9 active prescriptions at risk",
      "No alternative antibiotic stocked",
    ],
    tags: ["Requires urgent sourcing — national shortage active"],
  },
  ifApproved: {
    summary: "Coverage maintained for approximately 28 days at current dispensing rate.",
    tags: ["Coverage maintained for 28 days"],
  },
};

export const DEMO_ORDER_CANCELLED_METOPROLOL: OrderCancelledData = {
  email: {
    from: "orders@summit-pharma.com",
    to: "procurement@greenfield-pharmacy.com",
    subject: "Order Cancellation — Metoprolol Tartrate Tablets",
    body: "Dear Procurement Team,\n\nThis notice is to advise that Summit Pharma Supplies is unable to process PO #2026-2045 for 500 tablets of Metoprolol Tartrate 50mg (NDC: 0781-1064-01). Demand has significantly outpaced production output and the manufacturer has suspended new orders pending a capacity review.\n\nAn equivalent product from a secondary manufacturer is available through our network at the price listed below.\n\nKind regards, James Wu — Summit Pharma.",
  },
  originalOrder: {
    vendor: "Summit Pharma Supplies",
    sku: "METOP50",
    product: "Metoprolol Tartrate 50mg Tablets",
    quantity: "500 TAB",
    totalCost: 3750,
    leadTime: "4 Days",
  },
  proposedReplacement: {
    vendor: "Alliance Medical",
    sku: "METOP50-AM",
    product: "Metoprolol Tartrate 50mg Tablets",
    quantity: "500 TAB",
    totalCost: 4125,
    leadTime: "6 Days",
  },
  costDelta: 375,
  leadTimeDelta: "+2 Days",
  isDosageChange: false,
  ifRejected: {
    consequences: [
      "Stockout in 4 days",
      "22 cardiac patients affected",
      "Abrupt discontinuation risk",
    ],
    tags: ["Cardiac medication — abrupt discontinuation is clinically unsafe"],
  },
  ifApproved: {
    summary: "Cardiac patient prescriptions protected for 35 days.",
    tags: ["35-day coverage secured"],
  },
};

export const DEMO_ORDER_CANCELLED_MORPHINE: OrderCancelledData = {
  email: {
    from: "ops@clearpathrx.com",
    to: "procurement@greenfield-pharmacy.com",
    subject: "Urgent: PO #2026-2067 Morphine Sulfate — Cannot Fulfill",
    body: "Sam,\n\nWe must advise that ClearPath Rx is unable to fulfill PO #2026-2067 for 80 units of Morphine Sulfate 10mg/mL Injection (NDC: 0641-6014-25). A national allocation cap imposed by the manufacturer's DEA quota has temporarily halted distribution.\n\nWe are working with a licensed secondary wholesaler and can fulfil from an alternative lot pending your approval.\n\nRegards, David Chen.",
  },
  originalOrder: {
    vendor: "ClearPath Rx",
    sku: "MORPH10",
    product: "Morphine Sulfate 10mg/mL Injection",
    quantity: "80 EA",
    totalCost: 1840,
    leadTime: "2 Days",
  },
  proposedReplacement: {
    vendor: "PharmaLink Co.",
    sku: "MORPH10-PL",
    product: "Morphine Sulfate 10mg/mL Injection",
    quantity: "80 EA",
    totalCost: 2160,
    leadTime: "4 Days",
  },
  costDelta: 320,
  leadTimeDelta: "+2 Days",
  isDosageChange: false,
  ifRejected: {
    consequences: [
      "Controlled substance stockout in 2 days",
      "Post-surgical pain management at risk",
      "Regulatory reporting may be required",
    ],
    tags: ["Schedule II controlled substance — escalate to pharmacist-in-charge"],
  },
  ifApproved: {
    summary: "Controlled substance continuity maintained. Secondary wholesaler verified.",
    tags: ["Pain management continuity secured"],
  },
};

export const DEMO_ORDER_CANCELLED_METHOTREXATE: OrderCancelledData = {
  email: {
    from: "supply@medcore-distribution.com",
    to: "procurement@greenfield-pharmacy.com",
    subject: "PO #2026-2089 — Methotrexate Sodium Injection Unavailable",
    body: "Hello,\n\nMedCore Distribution regrets to inform you that PO #2026-2089 for 40 vials of Methotrexate Sodium 25mg/mL Injection (NDC: 0703-4234-11) cannot be fulfilled at this time. The primary manufacturer has issued a force majeure notice due to raw material supply disruption.\n\nA comparable product from an FDA-approved facility is available; details are attached.\n\nSincerely, The MedCore Supply Team.",
  },
  originalOrder: {
    vendor: "MedCore Distribution",
    sku: "METH25",
    product: "Methotrexate Sodium 25mg/mL Injection",
    quantity: "40 EA",
    totalCost: 3200,
    leadTime: "5 Days",
  },
  proposedReplacement: {
    vendor: "Apex Pharma",
    sku: "METH25-AP",
    product: "Methotrexate Sodium 25mg/mL Injection",
    quantity: "40 EA",
    totalCost: 3680,
    leadTime: "7 Days",
  },
  costDelta: 480,
  leadTimeDelta: "+2 Days",
  isDosageChange: false,
  ifRejected: {
    consequences: [
      "Oncology and rheumatology patients affected",
      "6 active chemotherapy protocols at risk",
      "No oral substitute for IV protocols",
    ],
    tags: ["Critical oncology medication — pharmacist and prescriber sign-off required"],
  },
  ifApproved: {
    summary: "Chemotherapy and autoimmune treatment continuity maintained for 30+ days.",
    tags: ["Oncology coverage restored"],
  },
};

export const DEMO_PARTIAL_FILL_CRITICAL: PartialFillData = {
  email: {
    from: "supply@medcore-distribution.com",
    to: "procurement@greenfield-pharmacy.com",
    subject: "Partial Fulfillment — PO #2026-1802",
    body: "Hi Team,\n\nUnfortunately we can only partially fulfil PO #2026-1802. Metformin 1000mg Extended Release (NDC: 0093-7267-56) is subject to an industry-wide allocation — we can deliver 80 of the 160 tablets ordered. The remaining 80 are backordered with an expected restock window of 10–14 days.\n\nWe recommend accepting the partial delivery and sourcing the remaining units from an alternative wholesaler to avoid a stockout.\n\nApologies for the disruption. — MedCore Supply Ops.",
  },
  vendor: "MedCore Distribution",
  backorderEta: "10–14 Days",
  skus: [
    {
      sku: "MET1000",
      name: "Metformin 1000mg Extended Release",
      orderedQuantity: 160,
      deliveredQuantity: 80,
      backorderedQuantity: 80,
      daysOnHand: 4,
      stockoutDate: "Stockout in ~4 days",
    },
  ],
  miraInsight:
    "Accept the partial delivery immediately to extend coverage by ~2 days, then activate emergency sourcing for the remaining 80 units. Metformin ER has limited therapeutic substitutes — prioritise same-formulation alternatives to avoid patient dosing disruption.",
  ifAccepted: {
    summary:
      "Partial delivery extends coverage. Emergency sourcing for remaining 80 units recommended.",
    tags: ["~2 days coverage extended"],
  },
  ifRejected: {
    consequences: [
      "Full stockout in 4 days",
      "28 diabetic patients at risk",
      "No buffer stock available",
    ],
    tags: [
      "Rejecting partial delivery removes the only available stock — stockout is immediate",
    ],
  },
};

export const DEMO_PARTIAL_FILL_WARNING: PartialFillData = {
  email: {
    from: "orders@alliance-medical.com",
    to: "procurement@greenfield-pharmacy.com",
    subject: "PO #2026-1047 — Partial Shipment Notice",
    body: "Dear Greenfield Team,\n\nPlease be advised that PO #2026-1047 for Lisinopril 10mg Tablets will be partially fulfilled. We can ship 180 of the 200 units ordered. The remaining 20 tablets are expected to be available within 7 days.\n\nGiven your current stock level we do not anticipate any dispensing risk during this period.\n\nKind regards, Alliance Medical.",
  },
  vendor: "Alliance Medical",
  backorderEta: "7 Days",
  skus: [
    {
      sku: "LISIN10",
      name: "Lisinopril 10mg Tablets",
      orderedQuantity: 200,
      deliveredQuantity: 180,
      backorderedQuantity: 20,
      daysOnHand: 14,
      stockoutDate: "Safe through Feb 18",
    },
  ],
  miraInsight:
    "Accept the partial delivery. Current dispensing stock is sufficient for 14 days — well beyond the 7-day backorder window. No emergency sourcing required unless demand increases unexpectedly.",
  ifAccepted: {
    summary: "No dispensing risk. Remaining 20 units will arrive within 7 days.",
    tags: ["14-day buffer maintained"],
  },
  ifRejected: {
    consequences: [
      "Delays full resupply by 7+ days",
      "Forfeits 180 available units",
    ],
    tags: ["Rejection creates unnecessary risk — current stock is sufficient"],
  },
};

export const DEMO_SKU_BACKORDERED_CRITICAL: SkuBackorderedData = {
  email: {
    from: "supply@pharmalink.com",
    to: "procurement@greenfield-pharmacy.com",
    subject: "Backorder Notice — Insulin Glargine 100u/mL",
    body: "Hi,\n\nPharmaLink Co. is advising that Insulin Glargine 100u/mL Vials (NDC: 0088-5022-52) are currently on backorder across our entire distribution network. This is linked to a cold-chain distribution disruption affecting multiple regional suppliers. No alternatives are currently stocked in our system.\n\nEstimated availability: Feb 2. Current stock at your facility runs out Jan 28.\n\nWe strongly recommend initiating emergency sourcing procedures immediately.\n\nRegards, PharmaLink Supply Team.",
  },
  vendor: "PharmaLink Co.",
  availableDate: "Feb 2",
  backordered: [
    {
      sku: "INS-GLA",
      name: "Insulin Glargine 100u/mL Vial",
      orderedQuantity: "x 80 EA Ordered",
      daysOnHand: 5,
      stockoutDate: "Stockout Jan 28",
      alternatives: [],
    },
  ],
  miraInsight:
    "No alternatives are available through PharmaLink. Immediately contact secondary wholesalers for emergency insulin glargine allocation. If stock cannot be secured before Jan 28, escalate to prescribers to evaluate temporary bridging options — this is a patient safety issue.",
  ifActioned: {
    summary:
      "Emergency allocation secured. Diabetic patients remain on therapy through the backorder window.",
    tags: ["Patient safety protected"],
  },
  ifIgnored: {
    consequences: [
      "Stockout Jan 28 — 5 days away",
      "Insulin-dependent patients at critical risk",
      "No alternatives currently stocked",
    ],
    tags: [
      "Insulin is a life-critical medication — delay is not an option",
    ],
  },
};

export const DEMO_SKU_BACKORDERED_WARNING: SkuBackorderedData = {
  email: {
    from: "orders@apexpharma.com",
    to: "procurement@greenfield-pharmacy.com",
    subject: "Warfarin 5mg — Temporary Backorder",
    body: "Dear Procurement,\n\nApex Pharma is currently unable to supply Warfarin 5mg Tablets (NDC: 0056-0171-75) due to manufacturing constraints at the primary facility. Expected restocking date is Feb 2.\n\nTwo therapeutic alternatives are available through our catalogue: Warfarin 5mg from a secondary manufacturer, and Acenocoumarol 4mg (requires prescriber sign-off for substitution).\n\nYour current stock level provides sufficient coverage through the backorder period.\n\nRegards, Apex Pharma.",
  },
  vendor: "Apex Pharma",
  availableDate: "Feb 2",
  backordered: [
    {
      sku: "WARF5",
      name: "Warfarin Sodium 5mg Tablets",
      orderedQuantity: "x 120 TAB Ordered",
      daysOnHand: 14,
      stockoutDate: "Safe through Feb 7",
      alternatives: ["Warfarin 5mg (alt mfr)", "Acenocoumarol 4mg"],
    },
  ],
  miraInsight:
    "Current stock provides 14 days of cover — sufficient to bridge the backorder without emergency action. Source the same-strength warfarin from the alternative manufacturer to maintain anticoagulation protocols. Acenocoumarol substitution requires individual prescriber approval and INR monitoring adjustment.",
  ifActioned: {
    summary:
      "Alternative sourced in time. Anticoagulation continuity maintained with no protocol changes required.",
    tags: ["Continuity maintained"],
  },
  ifIgnored: {
    consequences: [
      "Stock depleted Feb 7",
      "Anticoagulation patients at risk",
    ],
    tags: [
      "Two alternatives available — failure to act within 7 days creates unnecessary risk",
    ],
  },
};

export const DEMO_NOT_CONFIRMED: NotConfirmedData = {
  vendor: "PharmaLink Co.",
  poNumber: "PO #2026-1051",
  poValue: 12450,
  expectedBy: "Jan 21, 10:00 AM",
  hoursOverdue: 48,
  scheduledDelivery: "Jan 25",
  skus: [
    { sku: "ATOR10", name: "Atorvastatin 10mg Tablets", quantity: "x 500 TAB" },
    { sku: "OMEP20", name: "Omeprazole 20mg Capsules", quantity: "x 300 CAP" },
    { sku: "MET500", name: "Metformin 500mg Tablets", quantity: "x 400 TAB" },
  ],
  miraInsight:
    "48 hours without supplier confirmation on a $12,450 PO is a yellow flag. PharmaLink has a history of late confirmations during high-demand periods. Chase now — if no response by end of day, activate backup sourcing for the Atorvastatin and Metformin lines which have lower days-on-hand.",
};

export const DEMO_PRICE_INCREASE: PriceIncreaseData = {
  vendor: "Alliance Medical",
  effectiveDate: "Feb 1, 2026",
  skus: [
    {
      sku: "ATOR20",
      name: "Atorvastatin 20mg Tablets",
      previousUnitPrice: 0.8,
      newUnitPrice: 0.96,
      percentageIncrease: 20,
      monthlyUnits: 500,
    },
  ],
  totalMonthlyImpact: 80,
  miraInsight:
    "A 20% unit price increase on Atorvastatin 20mg adds $80/month to operating costs. Generic statins are widely available — McKesson and Cardinal Health both carry equivalent products at current contract pricing. Consider requesting a pricing review or issuing an RFQ to two alternative suppliers before accepting.",
};

export const DEMO_DEMAND_SURGE: DemandSurgeData = {
  demandSignal:
    "RX trend data shows flu season uptick beginning within 21 days. To adequately cover prescription demand by 25%, you can avoid a stockout risk while capturing an estimated $3,023 in margin by ordering now at current contract pricing.",
  currentOrder: {
    vendor: "MedCore Distribution",
    rows: [
      {
        sku: "AMOX500",
        name: "Amoxicillin 500mg Capsules",
        quantity: 240,
        subtotal: 5040,
      },
      {
        sku: "AZIT250",
        name: "Azithromycin 250mg Tablets",
        quantity: 100,
        subtotal: 1850,
      },
      {
        sku: "DOXY100",
        name: "Doxycycline 100mg Capsules",
        quantity: 80,
        subtotal: 1120,
      },
      {
        sku: "CLAV875",
        name: "Amoxicillin/Clavulanate 875mg",
        quantity: 60,
        subtotal: 1560,
      },
    ],
    total: 9570,
  },
  optimizedOrder: {
    vendor: "MedCore Distribution",
    rows: [
      {
        sku: "AMOX500",
        name: "Amoxicillin 500mg Capsules",
        quantity: 312,
        quantityDelta: 72,
        subtotal: 6552,
      },
      {
        sku: "AZIT250",
        name: "Azithromycin 250mg Tablets",
        quantity: 130,
        quantityDelta: 30,
        subtotal: 2405,
      },
      {
        sku: "DOXY100",
        name: "Doxycycline 100mg Capsules",
        quantity: 105,
        quantityDelta: 25,
        subtotal: 1470,
      },
      {
        sku: "CLAV875",
        name: "Amoxicillin/Clavulanate 875mg",
        quantity: 75,
        quantityDelta: 15,
        subtotal: 1950,
      },
    ],
    total: 12377,
    totalDelta: 2807,
  },
  currentCoverage: {
    stockCoverageDays: 2.8,
    poRevenue: 18200,
  },
  optimizedCoverage: {
    stockCoverageDays: 6.8,
    poRevenue: 30650,
  },
};

export const DEMO_DELIVERY_DELAY: DeliveryDelayData = {
  email: {
    from: "logistics@medcore-distribution.com",
    subject: "Update on PO #1043 Delivery Schedule",
    body: "Hi team, just a quick update that our primary cold-chain vehicle required an emergency maintenance this morning. We are pushing all Tuesday deliveries to Thursday morning. Temperature-controlled stock will remain in our certified facility during this period. We expect to be back on our regular schedule by the end of the week. Sorry for the inconvenience.",
  },
  vendor: "MedCore Distribution",
  originalEta: "Mon Feb 2",
  revisedEta: "Wed Feb 4",
  delayDuration: "+ 48 Hours",
  stockoutRisk: "None Identified",
  affectedSkus: [
    {
      sku: "LISIN10",
      name: "Lisinopril 10mg Tablets",
      orderedQuantity: "x 500 TAB Ordered",
      daysOnHand: 5.2,
      safeThrough: "Safe through Feb 6",
    },
    {
      sku: "METOP50",
      name: "Metoprolol Succinate 50mg",
      orderedQuantity: "x 200 TAB Ordered",
      daysOnHand: 3.8,
      safeThrough: "Safe through Feb 5",
    },
  ],
};

export const DEMO_EARLY_ARRIVAL: EarlyArrivalData = {
  email: {
    from: "Dispatch Team (PharmaLink Co.)",
    subject: "Notification: PO #1099 ETA Update",
    body: "Good morning, our delivery vehicle is ahead of schedule on today's route. The driver expects to arrive at your pharmacy receiving area by 2:30 PM today instead of the originally scheduled 6:30 PM. Please advise if your pharmacy team needs to adjust receiving availability or cold-chain storage preparation.",
  },
  originalEta: "Today, 6:30 PM",
  newEta: "Today, 2:30 PM",
  hoursEarly: 4,
  recommendedActions: [
    { label: "Confirm a Receiving Bay Is Available", checked: false },
    { label: "Notify the Dispensary Lead", checked: false },
    {
      label: "Prepare Refrigerated Storage Space",
      checked: false,
    },
    {
      label: "Update the PO Status in the Pharmacy System",
      checked: false,
    },
  ],
  inTransitItems: [
    {
      sku: "AMOX500",
      name: "Amoxicillin 500mg Capsules",
      quantity: 240,
      subtotal: 5040,
    },
    {
      sku: "INS-GLА",
      name: "Insulin Glargine 100u/mL Vial",
      quantity: 80,
      subtotal: 2400,
    },
  ],
  total: 7440,
};

export const ACTION_CONTENT_MAP: Record<string, ActionContentEntry> = {
  "po-1099": {
    type: "order-cancelled",
    data: DEMO_ORDER_CANCELLED,
  },
  "po-2031": {
    type: "order-cancelled",
    data: DEMO_ORDER_CANCELLED_DOXYCYCLINE,
  },
  "po-2045": {
    type: "order-cancelled",
    data: DEMO_ORDER_CANCELLED_METOPROLOL,
  },
  "po-2067": {
    type: "order-cancelled",
    data: DEMO_ORDER_CANCELLED_MORPHINE,
  },
  "po-2089": {
    type: "order-cancelled",
    data: DEMO_ORDER_CANCELLED_METHOTREXATE,
  },
  "po-892": {
    type: "demand-surge",
    data: DEMO_DEMAND_SURGE,
  },
  "po-1042": {
    type: "delivery-delay",
    data: DEMO_DELIVERY_DELAY,
  },
  "po-1043-delay": {
    type: "delivery-delay",
    data: DEMO_DELIVERY_DELAY,
  },
  "po-1099-fyi": {
    type: "early-arrival",
    data: DEMO_EARLY_ARRIVAL,
  },
  "po-1802": {
    type: "partial-fill",
    data: DEMO_PARTIAL_FILL_CRITICAL,
  },
  "po-1047": {
    type: "partial-fill",
    data: DEMO_PARTIAL_FILL_WARNING,
  },
  "po-1002": {
    type: "sku-backordered",
    data: DEMO_SKU_BACKORDERED_CRITICAL,
  },
  "po-1899": {
    type: "sku-backordered",
    data: DEMO_SKU_BACKORDERED_WARNING,
  },
  "po-1893": {
    type: "not-confirmed",
    data: DEMO_NOT_CONFIRMED,
  },
  "po-1899-price": {
    type: "price-increase",
    data: DEMO_PRICE_INCREASE,
  },
  "po-1899-eta": {
    type: "delivery-delay",
    data: DEMO_DELIVERY_DELAY,
  },
};

export function hasActionContent(id: string): boolean {
  return id in ACTION_CONTENT_MAP;
}
