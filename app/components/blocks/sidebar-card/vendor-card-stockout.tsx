import styles from "./sidebar-card.module.scss";

interface Props {
  earliestStockout: string;
}

export function VendorCardStockout({
  earliestStockout,
}: Props) {
  return (
    <div className={styles.metaPair}>
      <span className={styles.metaLabel}>EARLIEST STOCKOUT</span>
      <span className={styles.metaValue}>
        {earliestStockout.toUpperCase()}
      </span>
    </div>
  );
}
