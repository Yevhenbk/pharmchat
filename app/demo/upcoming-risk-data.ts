import type { UpcomingRiskItem } from "@models/upcoming-risk";

export const DEMO_UPCOMING_RISK_ITEMS: ReadonlyArray<UpcomingRiskItem> = [
  {
    id: "amox500",
    sku: "AMOX500",
    productName: "Amoxicillin 500mg Capsules",
    description: "Runs out in 4 days at current dispensing rate.",
  },
  {
    id: "met1000",
    sku: "MET1000",
    productName: "Metformin 1000mg Tablets",
    description: "Delivery unconfirmed. Supplier on backorder.",
  },
  {
    id: "ins-gla",
    sku: "INSGLA",
    productName: "Insulin Glargine 100u/mL Vial",
    description:
      "Partial shipment expected. May require emergency top-up order.",
  },
  {
    id: "salb100",
    sku: "SALB100",
    productName: "Salbutamol Inhaler 100mcg",
    description: "Prescription demand spike detected.",
  },
  {
    id: "warf5",
    sku: "WARF5",
    productName: "Warfarin 5mg Tablets",
    description: "Long supplier lead time. Order window approaching.",
  },
  {
    id: "omep20",
    sku: "OMEP20",
    productName: "Omeprazole 20mg Capsules",
    description:
      "Stock cover reduced due to higher-than-expected dispensing volume.",
  },
];
