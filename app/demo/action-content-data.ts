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

// ── Order Cancelled ───────────────────────────────────────

export const DEMO_ORDER_CANCELLED: OrderCancelledData = {
  email: {
    from: "david.chen@clearpathrx.com",
    to: "procurement@greenfield-pharmacy.com",
    subject: "URGENT — PO #2026-1099 Cancellation: Amoxicillin 500mg Capsules",
    date: "Wed, 19 Mar 2026 08:14:22 +0000",
    body: "Sam,\n\nI'm writing with an urgent update regarding Purchase Order #2026-1099. Unfortunately, ClearPath Rx is unable to fulfil your order for 240 units of Amoxicillin 500mg Capsules (NDC: 0093-4155-01, Lot: AX2603B).\n\nOur primary API supplier, Aurobindo Pharma, issued a force majeure notice yesterday citing a contamination event at their Gujarat manufacturing facility. This has depleted our Amoxicillin inventory across all strengths with no estimated restock date. The FDA has confirmed this product is now listed on the national drug shortage database (DSN-20260318-AX500).\n\nWe have identified a viable replacement through Summit Pharma Supplies — same product, different manufacturer (NDC: 0781-2011-92, Lot: SP2603-C). Unit price is $22.50 vs. your contracted $21.00 — a $1.50/unit premium for a total of $5,400. Lead time is 6 business days (ETA: Mar 27).\n\nPlease note: The replacement involves a different capsule shell formulation. Your pharmacist should confirm that dispensing and patient counselling instructions remain appropriate before approval.\n\nI apologise for the disruption during what I know is a high-demand period. Please confirm your decision as soon as possible and I will action the transfer order immediately.\n\nRegards,\nDavid Chen | Senior Supply Operations Manager\nClearPath Rx Distribution\nT: +1 (612) 555-0184 | david.chen@clearpathrx.com",
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
    "⚠️ CLINICAL ALERT: Supplier substitution involves a different capsule formulation from a secondary manufacturer. Pharmacist must verify that dosing instructions and patient counselling remain appropriate before approving this order.",
  ifRejected: {
    consequences: [
      "Stockout confirmed — zero inventory on-hand",
      "14 active antibiotic prescriptions unfulfillable today",
      "No alternative source confirmed without further sourcing action",
    ],
    tags: [
      "National shortage active — delay increases risk of patient-level supply failure",
    ],
  },
  ifApproved: {
    summary:
      "Supply continuity restored for approximately 31 days at current dispensing rate. Primary vendor expected to recover supply by Q2.",
    tags: ["31-day coverage secured", "Same active ingredient — no dose change"],
  },
};

export const DEMO_ORDER_CANCELLED_DOXYCYCLINE: OrderCancelledData = {
  email: {
    from: "priya.nair@apexpharma.com",
    to: "procurement@greenfield-pharmacy.com",
    subject: "PO #2026-2031 Cancellation — Doxycycline Hyclate 100mg Tablets",
    date: "Wed, 19 Mar 2026 09:47:05 +0000",
    body: "Hi,\n\nI'm writing to advise that Apex Pharma is unable to fulfil PO #2026-2031 for 160 tablets of Doxycycline Hyclate 100mg (NDC: 0143-9534-10).\n\nManufacturing capacity constraints across two of our key production facilities have resulted in an industry-wide allocation freeze on this product. We are currently fulfilling approximately 40% of standing orders on a priority basis, and regrettably, your order falls outside the prioritised allocation window for this run.\n\nWe can facilitate a transfer to MedCore Distribution, who hold confirmed inventory of a therapeutically equivalent product (NDC: 0143-3107-10, Lot: MC2603-D) at $16.00/unit — a $2.00/unit premium over your contracted rate. Lead time would be 5 business days (ETA: Mar 26). No dosage form change is involved.\n\nGiven the national shortage status on this product, I'd recommend acting promptly as secondary inventory is also moving fast.\n\nBest regards,\nPriya Nair | Supply Operations\nApex Pharma Group\nE: priya.nair@apexpharma.com | T: +1 (404) 555-0291",
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
      "Stockout in 5 days — no on-hand buffer",
      "9 active prescriptions cannot be dispensed",
      "National shortage active — no alternative currently stocked",
    ],
    tags: ["Rejection forfeits the only confirmed alternative — act now"],
  },
  ifApproved: {
    summary:
      "Coverage maintained for approximately 28 days at current dispensing rate. Same product, different manufacturer — no clinical change required.",
    tags: ["28-day coverage secured", "No dosage form change"],
  },
};

export const DEMO_ORDER_CANCELLED_METOPROLOL: OrderCancelledData = {
  email: {
    from: "james.wu@summit-pharma.com",
    to: "procurement@greenfield-pharmacy.com",
    subject: "Order Cancellation Notice — PO #2026-2045 Metoprolol Tartrate 50mg",
    date: "Wed, 19 Mar 2026 07:03:44 +0000",
    body: "Dear Procurement Team,\n\nSummit Pharma Supplies regrets to inform you that PO #2026-2045 for 500 tablets of Metoprolol Tartrate 50mg (NDC: 0781-1064-01) cannot be fulfilled at this time.\n\nDemand has significantly outpaced production output at the primary manufacturing facility over the past six weeks, and the manufacturer has suspended new wholesale orders effective immediately pending a capacity review. Our on-hand inventory was depleted earlier this week and we do not expect restocking for a minimum of 3–4 weeks.\n\nAn equivalent product from Teva Pharmaceuticals (NDC: 0093-7396-01, Lot: TV2603-M) is available through Alliance Medical at $8.25/unit — a $0.75/unit premium over your rate. Bioequivalence is confirmed. Lead time is 6 business days.\n\nGiven the clinical implications of abrupt discontinuation in cardiac patients, we strongly recommend approving the substitution promptly.\n\nKind regards,\nJames Wu | Senior Account Manager\nSummit Pharma Supplies\nE: james.wu@summit-pharma.com | T: +1 (503) 555-0372",
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
      "22 cardiac patients facing supply disruption",
      "Abrupt beta-blocker discontinuation is clinically unsafe",
    ],
    tags: [
      "Cardiac medication — abrupt discontinuation carries significant clinical risk",
    ],
  },
  ifApproved: {
    summary:
      "Cardiac patient prescriptions protected for 35 days. Bioequivalent product — no dose adjustment or patient notification required.",
    tags: ["35-day coverage secured", "Bioequivalent — no clinical change"],
  },
};

export const DEMO_ORDER_CANCELLED_MORPHINE: OrderCancelledData = {
  email: {
    from: "david.chen@clearpathrx.com",
    to: "procurement@greenfield-pharmacy.com",
    subject: "URGENT — PO #2026-2067 Cannot Be Fulfilled: Morphine Sulfate 10mg/mL Injection",
    date: "Wed, 19 Mar 2026 10:31:09 +0000",
    body: "Sam,\n\nI'm writing to urgently advise that ClearPath Rx is unable to fulfil PO #2026-2067 for 80 units of Morphine Sulfate 10mg/mL Injection (NDC: 0641-6014-25).\n\nA national allocation cap imposed by the manufacturer's DEA Annual Procurement Quota (APQ) for Schedule II controlled substances has temporarily halted distribution from our licensed inventory. This affects all orders placed after 14 March 2026. We have notified the DEA and are awaiting quota reallocation, but the timeline remains uncertain.\n\nWe are working with a licensed secondary wholesaler, PharmaLink Co., who hold confirmed inventory (NDC: 0641-6014-25, Lot: PL2603-MO) that can be dispatched within 4 business days. Unit pricing is $27.00 — a $4.00/unit premium. As this is a Schedule II controlled substance, the transfer requires dual-authorisation sign-off from your pharmacist-in-charge and your designated DEA registrant.\n\nPlease escalate this to your clinical team immediately. I'm available to assist with the transfer authorisation paperwork if needed.\n\nRegards,\nDavid Chen | Senior Supply Operations Manager\nClearPath Rx Distribution\nT: +1 (612) 555-0184 | david.chen@clearpathrx.com",
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
      "Post-surgical pain management protocols at risk",
      "Regulatory reporting obligation may be triggered",
    ],
    tags: [
      "Schedule II controlled substance — escalate to pharmacist-in-charge immediately",
    ],
  },
  ifApproved: {
    summary:
      "Controlled substance continuity maintained. Secondary wholesaler is DEA-licensed. Dual authorisation required before dispatch.",
    tags: [
      "Pain management continuity secured",
      "DEA dual-authorisation required",
    ],
  },
};

export const DEMO_ORDER_CANCELLED_METHOTREXATE: OrderCancelledData = {
  email: {
    from: "s.mills@medcore-distribution.com",
    to: "procurement@greenfield-pharmacy.com",
    subject: "PO #2026-2089 — Methotrexate Sodium 25mg/mL Injection Unavailable",
    date: "Tue, 18 Mar 2026 16:52:37 +0000",
    body: "Hello,\n\nMedCore Distribution is writing to formally advise that PO #2026-2089 for 40 vials of Methotrexate Sodium 25mg/mL Injection (NDC: 0703-4234-11) cannot be fulfilled at this time.\n\nThe primary manufacturer, Pfizer Injectables, issued a force majeure notice on 16 March 2026 following a raw material supply disruption at their API supplier in Gujarat, India. Production is currently suspended with no confirmed restart date. This product is now listed on the FDA critical drug shortage database.\n\nWe have identified a comparable FDA-approved alternative manufactured by Fresenius Kabi (NDC: 63323-0185-10, Lot: FK2603-MTX) available through Apex Pharma at $92.00/vial — a $12.00/vial premium. Lead time is 7 business days. Clinical equivalency is confirmed — same concentration, same formulation, different manufacturer.\n\nGiven the critical nature of this medication in active chemotherapy and autoimmune treatment protocols, we strongly urge prompt authorisation. Please note that your clinical governance policy requires sign-off from both the pharmacist and the prescribing oncologist or rheumatologist for any injectable oncology substitution.\n\nSincerely,\nSarah Mills | National Account Manager\nMedCore Distribution\nE: s.mills@medcore-distribution.com | T: +1 (312) 555-0156",
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
      "6 active chemotherapy protocols at immediate risk",
      "Oncology and rheumatology patients face treatment interruption",
      "No oral substitute equivalent for IV protocols",
    ],
    tags: [
      "Critical oncology medication — pharmacist and prescriber co-authorisation required",
    ],
  },
  ifApproved: {
    summary:
      "Chemotherapy and autoimmune treatment continuity maintained for 30+ days. Clinical equivalence confirmed by manufacturer.",
    tags: [
      "Oncology continuity secured",
      "Prescriber co-authorisation required",
    ],
  },
};

// ── Partial Fill ──────────────────────────────────────────

export const DEMO_PARTIAL_FILL_CRITICAL: PartialFillData = {
  email: {
    from: "s.mills@medcore-distribution.com",
    to: "procurement@greenfield-pharmacy.com",
    subject: "Partial Fulfilment Notice — PO #2026-1802: Metformin 1000mg Extended Release",
    date: "Wed, 19 Mar 2026 06:44:18 +0000",
    body: "Hi Team,\n\nPlease be advised that we can only partially fulfil PO #2026-1802 for Metformin 1000mg Extended Release (NDC: 0093-7267-56).\n\nDue to an industry-wide manufacturing allocation affecting the ER formulation specifically, we are able to dispatch 80 of the 160 tablets ordered in this run. The remaining 80 tablets are on backorder with an estimated availability window of 10–14 business days (ETA: approximately April 2, 2026). Your current on-hand stock represents approximately 4 days of dispensing supply.\n\nAccepting the partial delivery of 80 tablets will extend your coverage by roughly 2 additional days while you arrange supplementary sourcing. I recommend contacting Alliance Medical or PharmaLink Co. for emergency allocation on the remaining 80 units — both confirmed standing inventory as of this morning.\n\nNote: Metformin 1000mg ER has limited bioequivalent substitutes. We recommend sourcing the same extended-release formulation rather than switching to immediate-release tablets, to avoid disrupting patient glycaemic control.\n\nApologies for the inconvenience. Please confirm acceptance of the partial shipment.\n\nWarm regards,\nSarah Mills | National Account Manager\nMedCore Distribution\nE: s.mills@medcore-distribution.com | T: +1 (312) 555-0156",
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
    "Accept the partial delivery immediately to extend coverage by ~2 days, then activate emergency sourcing for the remaining 80 units today. Metformin ER is not easily substituted — switching to immediate-release disrupts patient dosing schedules. Both Alliance Medical and PharmaLink Co. have confirmed stock. Move fast: 28 diabetic patients are dependent on this medication.",
  ifAccepted: {
    summary:
      "Partial delivery extends coverage from 4 days to ~6 days. Emergency sourcing for remaining 80 units should be initiated today.",
    tags: ["~2 days additional coverage", "Emergency sourcing required in parallel"],
  },
  ifRejected: {
    consequences: [
      "Full stockout in 4 days — no on-hand buffer",
      "28 diabetic patients face supply disruption",
      "Rejecting removes the only available stock in this distribution channel",
    ],
    tags: [
      "Rejecting partial delivery eliminates the only available stock — immediate stockout risk",
    ],
  },
};

export const DEMO_PARTIAL_FILL_WARNING: PartialFillData = {
  email: {
    from: "h.adams@alliance-medical.com",
    to: "procurement@greenfield-pharmacy.com",
    subject: "PO #2026-1047 — Partial Shipment Notification: Lisinopril 10mg Tablets",
    date: "Wed, 19 Mar 2026 11:09:33 +0000",
    body: "Dear Greenfield Procurement Team,\n\nI'm writing to let you know that PO #2026-1047 for Lisinopril 10mg Tablets will be partially fulfilled in this dispatch run.\n\nWe are able to ship 180 of the 200 tablets ordered (NDC: 0093-7270-01, Lot: AL2603-L). The remaining 20 tablets are subject to a minor production run scheduling delay at our central distribution hub. Based on our current replenishment forecast, the outstanding units should be available within 7 business days and will be dispatched on your next scheduled delivery.\n\nBased on your current dispensing rate and on-hand stock levels, your pharmacy has sufficient supply to comfortably bridge this backorder window with no expected patient impact.\n\nPlease confirm your acceptance of the partial shipment so we can proceed with dispatch scheduling. Don't hesitate to reach out with any questions.\n\nKind regards,\nHelen Adams | Customer Relationship Manager\nAlliance Medical Wholesale\nE: h.adams@alliance-medical.com | T: +1 (720) 555-0248",
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
      stockoutDate: "Safe through Apr 2",
    },
  ],
  miraInsight:
    "Accept the partial delivery — current dispensing stock provides 14 days of cover, well beyond the 7-day backorder window. The 20 outstanding units will arrive before you need them. No emergency sourcing required unless dispensing volume increases unexpectedly.",
  ifAccepted: {
    summary:
      "No dispensing risk. Current stock provides 14-day buffer. Remaining 20 units arrive within 7 days — no gap in supply.",
    tags: ["14-day buffer maintained", "No action needed beyond acceptance"],
  },
  ifRejected: {
    consequences: [
      "Delays full resupply by 7+ days",
      "Forfeits 180 immediately available units",
    ],
    tags: [
      "Rejection creates unnecessary risk — current stock is sufficient through the backorder period",
    ],
  },
};

// ── SKU Backordered ───────────────────────────────────────

export const DEMO_SKU_BACKORDERED_CRITICAL: SkuBackorderedData = {
  email: {
    from: "mark.santos@pharmalink.com",
    to: "procurement@greenfield-pharmacy.com",
    subject: "URGENT Backorder Notification — Insulin Glargine 100u/mL (All Strengths)",
    date: "Wed, 19 Mar 2026 07:58:02 +0000",
    body: "Hi,\n\nThis is an urgent notification from PharmaLink Co. advising that Insulin Glargine 100u/mL Vials (NDC: 0088-5022-52) are currently on backorder across our entire distribution network.\n\nA cold-chain logistics disruption affecting three of our regional temperature-controlled distribution centres has depleted available stock as of 18 March 2026. We have zero inventory across all Insulin Glargine presentations and no alternative cold-chain pathways confirmed at this time. The estimated availability date is 2 April 2026, subject to revision.\n\nBased on your reported dispensing rate, your current on-hand stock is projected to run out on or around 21 March 2026 — a potential 12-day gap before we can resupply. There are currently no Insulin Glargine alternatives available through PharmaLink's catalogue.\n\nWe strongly recommend initiating emergency sourcing procedures immediately. McKesson and Cardinal Health have been reported to hold limited inventory as of 19 March. Please escalate to your prescribers — if emergency sourcing fails, clinical bridging protocols for affected patients may need to be activated.\n\nThis is a patient safety issue and we urge the highest priority response.\n\nRegards,\nMark Santos | Supply Chain Manager\nPharmaLink Co.\nM: +1 (415) 555-0193 | mark.santos@pharmalink.com",
  },
  vendor: "PharmaLink Co.",
  availableDate: "Apr 2",
  backordered: [
    {
      sku: "INS-GLA",
      name: "Insulin Glargine 100u/mL Vial",
      orderedQuantity: "x 80 EA Ordered",
      daysOnHand: 2,
      stockoutDate: "Stockout Mar 21",
      alternatives: [],
    },
  ],
  miraInsight:
    "This is a critical patient safety issue requiring immediate action. No alternatives exist through PharmaLink — contact McKesson and Cardinal Health for emergency insulin glargine allocation today. If stock cannot be secured before Mar 21, escalate to prescribers to evaluate temporary bridging options. Insulin-dependent patients cannot miss doses.",
  ifActioned: {
    summary:
      "Emergency allocation secured through secondary distributor. Insulin-dependent patients remain on therapy through the backorder window.",
    tags: ["Patient safety protected", "Escalation to prescribers may still be needed"],
  },
  ifIgnored: {
    consequences: [
      "Stockout Mar 21 — 2 days away",
      "Insulin-dependent patients at critical risk of supply gap",
      "No alternatives currently stocked anywhere in PharmaLink network",
    ],
    tags: [
      "Insulin is life-critical — delay is not clinically acceptable",
    ],
  },
};

export const DEMO_SKU_BACKORDERED_WARNING: SkuBackorderedData = {
  email: {
    from: "priya.nair@apexpharma.com",
    to: "procurement@greenfield-pharmacy.com",
    subject: "Backorder Notice — Warfarin Sodium 5mg Tablets (PO #2026-1899)",
    date: "Tue, 18 Mar 2026 14:22:55 +0000",
    body: "Dear Procurement,\n\nApex Pharma is currently unable to supply Warfarin Sodium 5mg Tablets (NDC: 0056-0171-75) as requested under PO #2026-1899.\n\nOur primary Warfarin manufacturer, Bristol-Myers Squibb, has temporarily suspended production of the 5mg strength due to a facility qualification audit underway at their Evansville manufacturing site. The expected restocking date is 2 April 2026, pending successful audit completion.\n\nWe have confirmed two alternative sources that can meet your requirements in the interim:\n1. Warfarin Sodium 5mg Tablets from Teva Pharmaceuticals (NDC: 0093-0169-01) — bioequivalent, no dose adjustment required. Available through MedCore Distribution at current market rate.\n2. Acenocoumarol 4mg Tablets — a therapeutic alternative requiring INR monitoring adjustment and individual prescriber sign-off for each patient being switched.\n\nBased on your current on-hand stock, you have an estimated 14 days of dispensing supply — sufficient to comfortably bridge the backorder period if you source through MedCore within the next 7 days.\n\nPlease let us know how you'd like to proceed.\n\nRegards,\nPriya Nair | Supply Operations\nApex Pharma Group\nE: priya.nair@apexpharma.com | T: +1 (404) 555-0291",
  },
  vendor: "Apex Pharma",
  availableDate: "Apr 2",
  backordered: [
    {
      sku: "WARF5",
      name: "Warfarin Sodium 5mg Tablets",
      orderedQuantity: "x 120 TAB Ordered",
      daysOnHand: 14,
      stockoutDate: "Safe through Apr 2",
      alternatives: [
        "Warfarin 5mg — Teva Pharmaceuticals (bioequivalent, no dose change)",
        "Acenocoumarol 4mg (therapeutic alternative — requires prescriber sign-off per patient)",
      ],
    },
  ],
  miraInsight:
    "Current stock provides 14 days of cover — sufficient to bridge this backorder without emergency action. Source the Teva Warfarin 5mg through MedCore Distribution within the next 7 days to stay ahead of the Apr 2 backorder window. Acenocoumarol is a valid fallback but requires individual prescriber approval and INR monitoring recalibration for each patient — avoid if same-product sourcing is achievable.",
  ifActioned: {
    summary:
      "Alternative sourced in time. Anticoagulation protocols maintained with no dose adjustments required. Backorder window bridged without patient impact.",
    tags: ["Continuity maintained", "No prescriber notification required if Teva sourced"],
  },
  ifIgnored: {
    consequences: [
      "Stock depleted Apr 2",
      "Anticoagulation patients face supply gap",
      "Prescriber notification and INR review required if doses are missed",
    ],
    tags: [
      "Two alternatives available — inaction within 7 days creates avoidable clinical risk",
    ],
  },
};

// ── Not Confirmed ─────────────────────────────────────────

export const DEMO_NOT_CONFIRMED: NotConfirmedData = {
  vendor: "PharmaLink Co.",
  poNumber: "PO #2026-1051",
  poValue: 12450,
  expectedBy: "Mar 17, 10:00 AM",
  hoursOverdue: 48,
  scheduledDelivery: "Mar 25",
  skus: [
    {
      sku: "ATOR10",
      name: "Atorvastatin 10mg Tablets",
      quantity: "x 500 TAB",
    },
    {
      sku: "OMEP20",
      name: "Omeprazole 20mg Capsules",
      quantity: "x 300 CAP",
    },
    {
      sku: "MET500",
      name: "Metformin 500mg Tablets",
      quantity: "x 400 TAB",
    },
  ],
  miraInsight:
    "48 hours without supplier confirmation on a $12,450 PO is a significant flag. PharmaLink has a history of late confirmations during high-demand periods — this pattern emerged twice in Q4 and led to delayed deliveries both times. Chase now and get a written ETA. If no response by end of day, activate backup sourcing for Atorvastatin and Metformin, which carry the lowest days-on-hand in this PO.",
};

// ── Price Increase ────────────────────────────────────────

export const DEMO_PRICE_INCREASE: PriceIncreaseData = {
  vendor: "Alliance Medical",
  effectiveDate: "Apr 1, 2026",
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
    "A 20% unit price increase on Atorvastatin 20mg adds $80/month ($960 annually) to operating costs. Generic statins are widely available — McKesson, Cardinal Health, and PharmaLink Co. all carry bioequivalent products at current contract pricing. Ordering this run at the existing rate locks in savings before April 1. If volume is sufficient, consider issuing an RFQ to two alternative suppliers before renewing the Alliance Medical contract.",
};

// ── Demand Surge ──────────────────────────────────────────

export const DEMO_DEMAND_SURGE: DemandSurgeData = {
  demandSignal:
    "RX trend data shows a flu season antibiotic surge beginning within 21 days. Dispensing volumes are tracking 38% above the same period last year. Ordering now at current contract pricing ahead of the surge can avoid a stockout risk while capturing an estimated $3,023 in additional margin.",
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

// ── Delivery Delay ────────────────────────────────────────

export const DEMO_DELIVERY_DELAY: DeliveryDelayData = {
  email: {
    from: "logistics@medcore-distribution.com",
    to: "procurement@greenfield-pharmacy.com",
    subject: "UPDATE: PO #1043 Delivery Rescheduled — Cold-Chain Vehicle Out of Service",
    date: "Wed, 19 Mar 2026 05:48:21 +0000",
    body: "Hi Team,\n\nA quick but important update on your scheduled delivery for PO #1043.\n\nOur primary cold-chain vehicle (Unit V-14) required emergency maintenance this morning following a refrigeration unit fault detected during pre-departure inspection. As a precautionary measure, all temperature-sensitive stock has been held at our certified cold-storage facility (maintained at 2–8°C throughout). All lot numbers and temperature logs are documented and available on request.\n\nAs a result, we are rescheduling all Tuesday deliveries to Thursday morning, 21 March 2026. The revised ETA for your site is 09:00–11:00 AM. Your current on-hand stock for the affected items should comfortably bridge the 48-hour delay without any dispensing disruption.\n\nAffected items:\n— Lisinopril 10mg Tablets (x500) — safe through Mar 24\n— Metoprolol Succinate 50mg (x200) — safe through Mar 23\n\nWe apologise for the inconvenience. Our logistics coordinator will contact you tomorrow to confirm your exact receiving window.\n\nMedCore Distribution — Logistics Operations\nlogistics@medcore-distribution.com | T: +1 (312) 555-0190",
  },
  vendor: "MedCore Distribution",
  originalEta: "Mon Mar 20",
  revisedEta: "Wed Mar 22",
  delayDuration: "+ 48 Hours",
  stockoutRisk: "None Identified",
  affectedSkus: [
    {
      sku: "LISIN10",
      name: "Lisinopril 10mg Tablets",
      orderedQuantity: "x 500 TAB Ordered",
      daysOnHand: 5.2,
      safeThrough: "Safe through Mar 24",
    },
    {
      sku: "METOP50",
      name: "Metoprolol Succinate 50mg",
      orderedQuantity: "x 200 TAB Ordered",
      daysOnHand: 3.8,
      safeThrough: "Safe through Mar 23",
    },
  ],
};

// ── Early Arrival ─────────────────────────────────────────

export const DEMO_EARLY_ARRIVAL: EarlyArrivalData = {
  email: {
    from: "dispatch@pharmalink.com",
    to: "procurement@greenfield-pharmacy.com",
    subject: "ETA Update — PO #1099 Arriving 4 Hours Early Today",
    date: "Wed, 19 Mar 2026 10:02:14 +0000",
    body: "Good morning,\n\nA quick heads-up from the PharmaLink dispatch team regarding your delivery scheduled for today.\n\nOur driver is running ahead of schedule on today's route following fewer-than-expected stops in your area. The driver currently expects to arrive at your pharmacy receiving bay at approximately 2:30 PM today, rather than the originally scheduled 6:30 PM — approximately 4 hours early.\n\nPlease ensure your receiving team is available and that adequate cold-chain storage space is prepared. This delivery includes Insulin Glargine 100u/mL vials which must be transferred to refrigerated storage (2–8°C) immediately upon receipt — please do not leave on the loading bay.\n\nYour delivery includes:\n— Amoxicillin 500mg Capsules × 240 units\n— Insulin Glargine 100u/mL Vials × 80 units (cold-chain — immediate refrigeration required)\nShipment value: $7,440\n\nIf the early arrival is not convenient, please contact our dispatch coordinator immediately at dispatch@pharmalink.com or call +1 (415) 555-0194 and we can adjust the delivery slot.\n\nPharmaLink Co. Dispatch Team\ndispatch@pharmalink.com | T: +1 (415) 555-0194",
  },
  originalEta: "Today, 6:30 PM",
  newEta: "Today, 2:30 PM",
  hoursEarly: 4,
  recommendedActions: [
    { label: "Confirm a Receiving Bay Is Available at 2:30 PM", checked: false },
    { label: "Notify the Dispensary Lead", checked: false },
    { label: "Clear Refrigerated Storage Space for Insulin Glargine", checked: false },
    { label: "Update the PO Status in the Pharmacy System", checked: false },
  ],
  inTransitItems: [
    {
      sku: "AMOX500",
      name: "Amoxicillin 500mg Capsules",
      quantity: 240,
      subtotal: 5040,
    },
    {
      sku: "INS-GLA",
      name: "Insulin Glargine 100u/mL Vial",
      quantity: 80,
      subtotal: 2400,
    },
  ],
  total: 7440,
};

// ── Action Content Map ────────────────────────────────────

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
