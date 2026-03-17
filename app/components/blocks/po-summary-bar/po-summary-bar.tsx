import type { POSummary } from "@models/procurement";
import { FormatService } from "@services/format";
import { StaggerFadeInWrapper } from "@components/animations/stagger-fade-in-wrapper/stagger-fade-in-wrapper";
import styles from "./po-summary-bar.module.scss";

interface Props {
  summary: POSummary;
}

export function POSummaryBar({ summary }: Props) {
  return (
    <StaggerFadeInWrapper className={styles.bar}>
      <div className={styles.item}>
        <span className={styles.itemLabel}>PO</span>
        <span className={styles.itemValue}>{summary.poNumber}</span>
      </div>

      <div className={styles.item}>
        <span className={styles.itemLabel}>VALUE</span>
        <span className={styles.itemValue}>
          {FormatService.currency(summary.value)}
        </span>
      </div>

      <div className={styles.item}>
        <span className={styles.itemLabel}>LEAD TIME</span>
        <span className={styles.itemValue}>
          {summary.leadTimeDays}d
        </span>
        <span className={styles.itemSub}>
          ETA: {summary.leadTimeEta}
        </span>
      </div>

      <div className={styles.item}>
        <span className={styles.itemLabel}>CONFIDENCE</span>
        <span className={styles.itemValue}>
          {summary.confidencePercent}%
        </span>
        <span className={styles.itemSub}>
          {summary.confidenceLabel} reliability
        </span>
      </div>

      <div className={styles.item}>
        <span className={styles.itemLabel}>SKUS</span>
        <span className={styles.itemValue}>{summary.skuCount}</span>
        <span className={styles.itemSub}>{summary.skuNote}</span>
      </div>
    </StaggerFadeInWrapper>
  );
}
