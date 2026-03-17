import type {
  ProcurementRunData,
  VendorOrder,
  VendorUrgency,
} from "@models/procurement";
import { CardList } from "@components/blocks/sidebar-card/card-list";
import { SidebarCard } from "@components/blocks/sidebar-card/sidebar-card";
import { VendorCardHeader } from "@components/blocks/sidebar-card/vendor-card-header";
import { VendorCardStats } from "@components/blocks/sidebar-card/vendor-card-stats";
import { VendorCardStockout } from "@components/blocks/sidebar-card/vendor-card-stockout";
import { StaggerFadeInWrapper } from "@components/animations/stagger-fade-in-wrapper/stagger-fade-in-wrapper";

import { ProcurementStats } from "./procurement-stats";
import styles from "./po-queue-sidebar.module.scss";

const URGENCY_PRIORITY: Record<VendorUrgency, number> = {
  "out-of-stock": 0,
  urgent: 1,
};

const NO_URGENCY_PRIORITY = 2;

function parseStockoutDate(dateString: string): number {
  return new Date(`${dateString} ${new Date().getFullYear()}`).getTime();
}

function sortVendorsBySeverityThenDate(
  vendors: readonly VendorOrder[],
): readonly VendorOrder[] {
  return [...vendors].sort((a, b) => {
    const priorityA = a.urgency ? URGENCY_PRIORITY[a.urgency] : NO_URGENCY_PRIORITY;
    const priorityB = b.urgency ? URGENCY_PRIORITY[b.urgency] : NO_URGENCY_PRIORITY;
    const priorityDiff = priorityA - priorityB;

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return (
      parseStockoutDate(a.earliestStockout) -
      parseStockoutDate(b.earliestStockout)
    );
  });
}

interface Props {
  data: ProcurementRunData;
  selectedVendorId: string;
  onSelectVendor: (vendorId: string) => void;
  dismissingVendorId?: string;
  onDismissComplete?: () => void;
}

export function POQueueSidebar({
  data,
  selectedVendorId,
  onSelectVendor,
  dismissingVendorId,
  onDismissComplete,
}: Props) {
  const sortedVendors = sortVendorsBySeverityThenDate(data.vendors);

  return (
    <StaggerFadeInWrapper className={styles.container}>
      <h3 className={styles.title}>Procurement Run</h3>

      <ProcurementStats stats={data.stats} />

      <CardList>
        {sortedVendors.map((vendor) => (
          <SidebarCard
            key={vendor.id}
            selected={vendor.id === selectedVendorId}
            onClick={() => onSelectVendor(vendor.id)}
            shouldDismiss={vendor.id === dismissingVendorId}
            onDismiss={onDismissComplete}
          >
            <VendorCardHeader
              name={vendor.vendorName}
              urgency={vendor.urgency}
            />
            <VendorCardStats
              value={vendor.value}
              skuCount={vendor.skuCount}
            />
            <VendorCardStockout
              earliestStockout={vendor.earliestStockout}
            />
          </SidebarCard>
        ))}
      </CardList>
    </StaggerFadeInWrapper>
  );
}
