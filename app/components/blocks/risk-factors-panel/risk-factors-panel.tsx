import type { RiskFactor } from "@models/procurement";
import { RiskBadge } from "@components/ui/risk-badge";
import { WhyOrderStarIcon } from "@components/icons/why-order-star-icon";
import styles from "./risk-factors-panel.module.scss";

interface Props {
  factors: readonly RiskFactor[];
}

export function RiskFactorsPanel({ factors }: Props) {
  if (factors.length === 0) {
    return null;
  }

  return (
    <>
      <div className={styles.desktopPanel}>
        <div className={styles.panel}>
          <span className={styles.heading}>
            <WhyOrderStarIcon className={styles.icon} />
            <span className={styles.label}>RISK FACTORS</span>
          </span>

          <div className={styles.badges}>
            {factors.map((factor) => (
              <RiskBadge key={factor.id}>
                {factor.label}
              </RiskBadge>
            ))}
          </div>
        </div>
      </div>

      <details className={styles.mobileAccordion}>
        <summary className={styles.mobileSummary}>
          <WhyOrderStarIcon className={styles.icon} />
          <span className={styles.label}>RISK FACTORS</span>
        </summary>

        <div className={styles.mobileContent}>
          <div className={styles.badges}>
            {factors.map((factor) => (
              <RiskBadge key={factor.id}>
                {factor.label}
              </RiskBadge>
            ))}
          </div>
        </div>
      </details>
    </>
  );
}
