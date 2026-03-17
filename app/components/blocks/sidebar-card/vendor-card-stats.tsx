import { FormatService } from "@services/format";
import styles from "./sidebar-card.module.scss";

interface Props {
  value: number;
  skuCount: number;
}

export function VendorCardStats({
  value,
  skuCount,
}: Props) {
  return (
    <div className={styles.metaRow}>
      <div className={styles.metaPair}>
        <span className={styles.metaLabel}>VALUE</span>
        <span className={styles.metaValue}>
          {FormatService.currency(value)}
        </span>
      </div>

      <div className={styles.metaPair}>
        <span className={styles.metaLabel}>SKUS</span>
        <span className={styles.metaValue}>{skuCount}</span>
      </div>
    </div>
  );
}
