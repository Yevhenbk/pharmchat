import type { OrderSnapshot } from "@models/action-content";
import { FormatService } from "@services/format";
import styles from "./order-cancelled-content.module.scss";

interface Props {
  label: string;
  order: OrderSnapshot;
  variant?: "default" | "highlight";
  costDelta?: number;
  leadTimeDelta?: string;
}

interface OrderSnapshotRowProps {
  label: string;
  value: React.ReactNode;
  children?: React.ReactNode;
  valueClassName?: string;
}

function OrderSnapshotRow({
  label,
  value,
  children,
  valueClassName,
}: OrderSnapshotRowProps) {
  return (
    <div className={styles.comparisonRow}>
      <span className={styles.comparisonFieldLabel}>{label}:</span>
      <span
        className={
          valueClassName ?? styles.comparisonFieldValue
        }
      >
        {value}
        {children}
      </span>
    </div>
  );
}

interface OrderSnapshotDetailsProps {
  order: OrderSnapshot;
  costDelta?: number;
  leadTimeDelta?: string;
}

function OrderSnapshotDetails({
  order,
  costDelta,
  leadTimeDelta,
}: OrderSnapshotDetailsProps) {
  return (
    <>
      <OrderSnapshotRow
        label="SKU"
        value={order.sku}
        valueClassName={styles.comparisonFieldValueSku}
      />

      <OrderSnapshotRow label="Product" value={order.product} />

      <OrderSnapshotRow label="Quantity" value={order.quantity} />

      <OrderSnapshotRow
        label="Total Cost"
        value={FormatService.currency(order.totalCost)}
      >
        {costDelta !== undefined && costDelta > 0 ? (
          <span className={styles.deltaPositive}>
            {" "}
            (+{FormatService.currency(costDelta)})
          </span>
        ) : null}
      </OrderSnapshotRow>

      <OrderSnapshotRow label="Lead Time" value={order.leadTime}>
        {leadTimeDelta ? (
          <span className={styles.deltaPositive}>
            {" "}
            ({leadTimeDelta})
          </span>
        ) : null}
      </OrderSnapshotRow>
    </>
  );
}

export function OrderSnapshotCard({
  label,
  order,
  variant = "default",
  costDelta,
  leadTimeDelta,
}: Props) {
  const containerClassName =
    variant === "highlight"
      ? styles.comparisonCardHighlight
      : styles.comparisonCard;

  return (
    <div className={containerClassName}>
      <p className={styles.comparisonLabel}>{label}</p>
      <p className={styles.comparisonVendor}>{order.vendor}</p>

      <div className={styles.comparisonFields}>
        <OrderSnapshotDetails
          order={order}
          costDelta={costDelta}
          leadTimeDelta={leadTimeDelta}
        />
      </div>
    </div>
  );
}

