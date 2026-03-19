import type { ActionItemData, Severity } from "@models/action-item";
import type { ModalMode } from "@models/modal";

export const SEVERITY_TO_MODE: Record<Severity, ModalMode> = {
  critical: "critical",
  warning: "warning",
  fyi: "fyi",
};

export const DEMO_ACTION_ITEMS: readonly ActionItemData[] = [
  {
    id: "po-1099",
    type: "order-cancelled",
    severity: "critical",
    title: "PO 1099: Order Cancelled",
    description:
      "ClearPath Rx unable to fulfill 240 units of Amoxicillin 500mg. Therapeutic alternative found.",
    actions: [{ label: "Replace" }],
    timeAgo: "Yesterday",
  },
  {
    id: "po-2031",
    type: "order-cancelled",
    severity: "critical",
    title: "PO 2031: Order Cancelled",
    description:
      "Apex Pharma unable to fulfill 160 tablets of Doxycycline Hyclate 100mg. National shortage active.",
    actions: [{ label: "Replace" }],
    timeAgo: "3 hrs ago",
  },
  {
    id: "po-2045",
    type: "order-cancelled",
    severity: "critical",
    title: "PO 2045: Order Cancelled",
    description:
      "Summit Pharma unable to fulfill 500 tablets of Metoprolol Tartrate 50mg. Manufacturer allocation freeze.",
    actions: [{ label: "Replace" }],
    timeAgo: "Today",
  },
  {
    id: "po-2067",
    type: "order-cancelled",
    severity: "critical",
    title: "PO 2067: Order Cancelled",
    description:
      "ClearPath Rx unable to fulfill 80 units of Morphine Sulfate 10mg/mL Injection. DEA quota cap in effect.",
    actions: [{ label: "Replace" }],
    timeAgo: "1 hr ago",
  },
  {
    id: "po-2089",
    type: "order-cancelled",
    severity: "critical",
    title: "PO 2089: Order Cancelled",
    description:
      "MedCore unable to fulfill 40 vials of Methotrexate Sodium 25mg/mL Injection. Force majeure declared.",
    actions: [{ label: "Replace" }],
    timeAgo: "2 hrs ago",
  },
  {
    id: "po-1042",
    type: "delayed",
    severity: "critical",
    title: "PO 1042: Delayed by 2 days",
    description:
      "MedCore Distribution updated delivery to Mar 22. Cold-chain vehicle maintenance — Insulin Glargine and Lisinopril affected.",
    actions: [{ label: "Review" }],
    timeAgo: "2 days ago",
  },
  {
    id: "po-1802",
    type: "partial-fill",
    severity: "critical",
    title: "PO 1047: Partial fill - Stock at risk",
    description:
      "Supplier can deliver 80 of 160 units. Remaining 80 backordered. Risk of stockout in 4 days.",
    actions: [{ label: "Review" }],
    timeAgo: "3 hrs ago",
  },
  {
    id: "po-892",
    type: "demand-surge",
    severity: "critical",
    title: "PO 892: Prescription Demand Surge",
    description:
      "RX trend analysis shows a 24% increase in antibiotic prescriptions for the upcoming flu season cycle.",
    actions: [{ label: "Review" }],
    timeAgo: "1 day ago",
  },
  {
    id: "po-1002",
    type: "sku-backordered",
    severity: "critical",
    title: "PO 1002: SKU backordered by supplier",
    description:
      "Insulin Glargine 100u/mL unavailable until Apr 2 — no alternatives in PharmaLink network. Current stock runs out Mar 21.",
    actions: [{ label: "Review" }],
    timeAgo: "2 hrs ago",
  },
  {
    id: "po-1893",
    type: "not-confirmed",
    severity: "critical",
    title: "PO 1051: Not yet confirmed",
    description:
      "PO-1051 ($12,450) — no supplier confirmation after 48 hours. Atorvastatin, Omeprazole and Metformin delivery date at risk.",
    actions: [{ label: "Chase" }],
    timeAgo: "Yesterday",
  },
  {
    id: "po-1043-delay",
    type: "delayed",
    severity: "warning",
    title: "PO 1043: Delayed by 2 days",
    description:
      "Shipment arriving 2 days late. No stockout risk, dispensing stock remains sufficient.",
    ignoreLabel: "Ignore",
    actions: [{ label: "Review" }],
    timeAgo: "2 days ago",
  },
  {
    id: "po-1047",
    type: "partial-fill",
    severity: "warning",
    title: "PO 1047: Partial Fill",
    description: "Vendor shipping 180 of 200 units. No immediate dispensing risk.",
    ignoreLabel: "Ignore",
    actions: [{ label: "Impact" }],
    timeAgo: "3 hrs ago",
  },
  {
    id: "po-1899",
    type: "sku-backordered",
    severity: "warning",
    title: "SKU backordered by supplier",
    description:
      "Warfarin 5mg unavailable until Apr 2 — two therapeutic alternatives confirmed. Current stock runs out Apr 2.",
    ignoreLabel: "Ignore",
    actions: [{ label: "Replace" }],
    timeAgo: "Yesterday",
  },
  {
    id: "po-1899-price",
    type: "price-increase",
    severity: "fyi",
    title: "Price update: Increase",
    description:
      "Alliance Medical has increased unit pricing for: Atorvastatin 20mg by 20%",
    ignoreLabel: "Ignore",
    actions: [{ label: "Review" }],
    timeAgo: "Yesterday",
  },
  {
    id: "po-1099-fyi",
    type: "arriving-early",
    severity: "fyi",
    title: "PO 1099: Shipment arriving early",
    description: "Shipment arriving 4 hours earlier than scheduled.",
    ignoreLabel: "Ignore",
    actions: [{ label: "Review" }],
    timeAgo: "Yesterday",
  },
  {
    id: "po-1899-eta",
    type: "delayed",
    severity: "fyi",
    title: "PO 1899: Minor ETA Shift",
    description:
      "Shipment arriving 1 day later than planned. Dispensing stock remains sufficient.",
    ignoreLabel: "Ignore",
    actions: [{ label: "Review" }],
    timeAgo: "Yesterday",
  },
];

export function getActionItemById(
  id: string,
): ActionItemData | undefined {
  return DEMO_ACTION_ITEMS.find((item) => item.id === id);
}
