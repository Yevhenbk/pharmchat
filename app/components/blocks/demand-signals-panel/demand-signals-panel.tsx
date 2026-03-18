import type { DemandSignal } from "@models/procurement";
import { WhyOrderStarIcon } from "@components/icons/why-order-star-icon";
import styles from "./demand-signals-panel.module.scss";

interface Props {
  signal: DemandSignal;
}

export function DemandSignalsPanel({ signal }: Props) {
  return (
    <>
      <div className={styles.desktopPanel}>
        <div className={styles.panel}>
          <div className={styles.heading}>
            <WhyOrderStarIcon className={styles.icon} />
            <span className={styles.label}>DEMAND SIGNALS</span>
          </div>

          <p className={styles.summary}>{signal.summary}</p>
        </div>
      </div>

      <details className={styles.mobileAccordion}>
        <summary className={styles.mobileSummary}>
          <WhyOrderStarIcon className={styles.icon} />
          <span className={styles.label}>DEMAND SIGNALS</span>
        </summary>

        <div className={styles.mobileContent}>
          <p className={styles.summary}>{signal.summary}</p>
        </div>
      </details>
    </>
  );
}
