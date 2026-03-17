import type { SKULineItem, VendorUrgency } from "@models/procurement";
import { cn } from "@utilities/tailwind";
import { FormatService } from "@services/format";
import { UrgencyBadge } from "@components/ui/urgency-badge";
import { QuantityInput } from "@components/ui/quantity-input";
import { InfoCircleIcon } from "@components/icons/info-circle-icon";
import { TrashIcon } from "@components/icons/trash-icon";
import styles from "./sku-table.module.scss";

function isVendorUrgency(status: string): status is VendorUrgency {
  return status === "out-of-stock" || status === "urgent";
}

interface Props {
  lineItems: readonly SKULineItem[];
  totalValue: number;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onInventoryChange?: (itemId: string, inventory: number) => void;
  onRemoveItem: (itemId: string) => void;
  onInfoClick: (itemId: string) => void;
  onConfirm: () => void;
}

const HEADERS = [
  "SKU",
  "Current Inv",
  "Run Out Date",
  "Quantity",
  "Order Value",
  "",
] as const;

function SKUTableRow({
  item,
  onQuantityChange,
  onInventoryChange,
  onRemoveItem,
  onInfoClick,
}: {
  item: SKULineItem;
  onQuantityChange: (quantity: number) => void;
  onInventoryChange?: (inventory: number) => void;
  onRemoveItem: () => void;
  onInfoClick: () => void;
}) {
  return (
    <div className={styles.row}>
      <div className={styles.cellSku}>
        <div className={styles.skuStack}>
          <div className={styles.skuCodeRow}>
            <span className={styles.skuCode}>{item.skuCode}</span>
            {isVendorUrgency(item.status) ? (
              <UrgencyBadge urgency={item.status} />
            ) : null}
          </div>

          <span className={styles.skuName}>{item.name}</span>
        </div>
      </div>

      <div className={styles.cell}>
        {onInventoryChange ? (
          <QuantityInput
            value={item.currentInventory}
            onChange={onInventoryChange}
          />
        ) : (
          item.currentInventory
        )}
      </div>

      <div className={styles.cell}>{item.runOutDate}</div>

      <div className={styles.cell}>
        <QuantityInput
          value={item.recommendedQuantity}
          onChange={onQuantityChange}
        />
      </div>

      <div className={styles.cell}>
        {FormatService.currency(item.orderValue)}
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={onInfoClick}
          aria-label={`View reasoning for ${item.skuCode}`}
        >
          <InfoCircleIcon className="size-4" />
        </button>

        <button
          type="button"
          className={cn(styles.iconButton, styles.iconButtonDelete)}
          onClick={onRemoveItem}
          aria-label={`Remove ${item.skuCode}`}
        >
          <TrashIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}

export function SKUTable({
  lineItems,
  totalValue,
  onQuantityChange,
  onInventoryChange,
  onRemoveItem,
  onInfoClick,
  onConfirm,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tableScrollArea}>
        <div className={styles.tableHeader}>
          {HEADERS.map((header) => (
            <div key={header || "actions"} className={styles.headerCell}>
              {header}
            </div>
          ))}
        </div>

        <div className={styles.tableBody}>
          {lineItems.map((item) => (
            <SKUTableRow
              key={item.id}
              item={item}
              onQuantityChange={(quantity) =>
                onQuantityChange(item.id, quantity)
              }
              onInventoryChange={
                onInventoryChange
                  ? (inventory) => onInventoryChange(item.id, inventory)
                  : undefined
              }
              onRemoveItem={() => onRemoveItem(item.id)}
              onInfoClick={() => onInfoClick(item.id)}
            />
          ))}
        </div>
      </div>

      <div className={styles.tableFooter}>
        <div className={styles.tableFooterLeft}>
          <span className={styles.tableFooterCount}>
            {lineItems.length} items
          </span>

          <span className={styles.tableFooterTotal}>
            Total: {FormatService.currency(totalValue)}
          </span>
        </div>

        <button
          type="button"
          className={styles.tableFooterConfirm}
          onClick={onConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
