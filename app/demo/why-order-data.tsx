import type { SKULineItem, VendorOrder } from "@models/procurement";
import { WhyOrderDemandIcon } from "@components/icons/why-order-demand-icon";
import { WhyOrderInventoryIcon } from "@components/icons/why-order-inventory-icon";
import { WhyOrderLeadTimeIcon } from "@components/icons/why-order-lead-time-icon";
import { WhyOrderShieldIcon } from "@components/icons/why-order-shield-icon";
import { WhyOrderTruckIcon } from "@components/icons/why-order-truck-icon";

export interface WhyOrderCardData {
  readonly poNumber: string;
  readonly skuLabel: string;
  readonly recommendation: string;
  sections: ReadonlyArray<{
    id: string;
    icon: React.ReactNode;
    iconClassName?: string;
    title: string;
    body: React.ReactNode;
  }>;
}

export function getWhyOrderCardData({
  lineItem,
  vendor,
}: {
  lineItem: SKULineItem;
  vendor: VendorOrder;
}): WhyOrderCardData {
  const skuLabel = `${lineItem.skuCode} ${lineItem.name}`;
  const recommendation = `Order ${lineItem.recommendedQuantity} units now to avoid dispensing stockout on ${lineItem.runOutDate}.`;

  return {
    poNumber: vendor.poSummary.poNumber,
    skuLabel,
    recommendation,
    sections: [
      {
        id: "forecasted-demand",
        icon: <WhyOrderDemandIcon />,
        iconClassName: "bg-[var(--color-why-order-demand-bg)]",
        title: "Forecasted Demand",
        body: `Expected usage based on run-out date ${lineItem.runOutDate}. Current inventory: ${lineItem.currentInventory} units.`,
      },
      {
        id: "current-inventory",
        icon: <WhyOrderInventoryIcon />,
        iconClassName: "bg-[var(--color-why-order-inventory-bg)]",
        title: "Current Inventory",
        body: `On hand: ${lineItem.currentInventory} units – reorder point reached.`,
      },
      {
        id: "lead-time",
        icon: <WhyOrderLeadTimeIcon />,
        iconClassName: "bg-[var(--color-why-order-lead-time-bg)]",
        title: "Supplier Lead Time",
        body: `Lead time: ${vendor.poSummary.leadTimeDays} days. ETA: ${vendor.poSummary.leadTimeEta}. Ordering today keeps you in stock.`,
      },
      {
        id: "why-supplier",
        icon: <WhyOrderShieldIcon />,
        iconClassName: "bg-[var(--color-why-order-shield-bg)]",
        title: "Why This Supplier",
        body: (
          <ul className="list-disc list-inside">
            <li>Approved pharmaceutical distributor</li>
            <li>Supplier reliability: {vendor.poSummary.confidencePercent}%</li>
            <li>Consistent fill rates and regulatory compliance over the last 90 days</li>
          </ul>
        ),
      },
      {
        id: "delivery",
        icon: <WhyOrderTruckIcon />,
        iconClassName: "bg-[var(--color-why-order-delivery-bg)]",
        title: "Delivery",
        body: `Estimated delivery within ${vendor.poSummary.leadTimeDays} business days. ETA: ${vendor.poSummary.leadTimeEta}.`,
      },
    ],
  };
}
