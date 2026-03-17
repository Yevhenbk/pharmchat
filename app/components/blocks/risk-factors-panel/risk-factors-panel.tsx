import type { RiskFactor } from "@models/procurement";
import { RiskBadge } from "@components/ui/risk-badge";
import styles from "./risk-factors-panel.module.scss";

interface Props {
  factors: readonly RiskFactor[];
}

export function RiskFactorsPanel({ factors }: Props) {
  if (factors.length === 0) {
    return null;
  }

  return (
    <div className={styles.panel}>
      <span className={styles.label}>RISK FACTORS</span>

      <div className={styles.badges}>
        {factors.map((factor) => (
          <RiskBadge key={factor.id}>
            {factor.label}
          </RiskBadge>
        ))}
      </div>
    </div>
  );
}
