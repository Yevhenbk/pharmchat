import type { ActionItemData } from "@models/action-item";

import { CardList } from "@components/blocks/sidebar-card/card-list";
import { SidebarCard } from "@components/blocks/sidebar-card/sidebar-card";
import { SidebarCardAction } from "@components/blocks/sidebar-card/sidebar-card-action";
import { ActionItemsIcon } from "@components/icons/action-items-icon";

import styles from "./action-sidebar.module.scss";

interface Props {
  items: readonly ActionItemData[];
  selectedId: string;
  onSelectItem: (id: string) => void;
  dismissingId?: string;
  onDismissComplete?: () => void;
}

const TYPE_LABELS: Record<string, string> = {
  "order-cancelled": "Order Cancelled",
  "delayed": "2 Day Delay",
  "partial-fill": "Partial Fill - Inventory at Risk",
  "sku-backordered": "SKU Backordered",
  "not-confirmed": "Order Not Confirmed",
  "price-increase": "Price Update: Increase",
  "price-decrease": "Price Update: Decrease",
  "arriving-early": "Arriving Early",
  "demand-surge": "Demand Surge",
};

function formatPoNumber(id: string): string {
  const match = id.match(/\d+/);

  return match ? `PO ${match[0]}` : id.toUpperCase();
}

export function ActionSidebar({
  items,
  selectedId,
  onSelectItem,
  dismissingId,
  onDismissComplete,
}: Props) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Procurement Run</h3>

      <div className={styles.countRow}>
        <span className={styles.countLabel}>
          <ActionItemsIcon className={styles.countIcon} />
          ACTION ITEMS
        </span>

        <div className={styles.countValue}>{items.length}</div>
      </div>

      <div className={styles.countDivider} />

      <CardList>
        {items.map((item) => (
          <SidebarCard
            key={item.id}
            selected={item.id === selectedId}
            onClick={() => onSelectItem(item.id)}
            shouldDismiss={item.id === dismissingId}
            onDismiss={item.id === dismissingId ? onDismissComplete : undefined}

          >
            <SidebarCardAction
              poNumber={formatPoNumber(item.id)}
              typeLabel={TYPE_LABELS[item.type] ?? item.type}
              severity={item.severity}
              description={item.description}
              timeAgo={item.timeAgo}
            />
          </SidebarCard>
        ))}
      </CardList>
    </div>
  );
}
