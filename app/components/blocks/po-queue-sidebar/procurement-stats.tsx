import type { ProcurementRunStats } from "@models/procurement";
import { FormatService } from "@services/format";
import { PurchaseOrdersIcon } from "@components/icons/purchase-orders-icon";
import { ProposedSpendIcon } from "@components/icons/proposed-spend-icon";
import { StockOutsRiskIcon } from "@components/icons/stock-outs-risk-icon";
import { StaggerFadeInWrapper } from "@components/animations/stagger-fade-in-wrapper/stagger-fade-in-wrapper";

import styles from "./procurement-stats.module.scss";

interface Props {
  stats: ProcurementRunStats;
}

function StatBlock({
  icon,
  label,
  value,
  subtitle,
  variant = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
  variant?: "default" | "danger";
}) {
  return (
    <div className={styles.block}>
      <span className={styles.label}>
        {icon}
        {label}
      </span>

      <span
        className={
          variant === "danger" ? styles.valueDanger : styles.value
        }
      >
        {value}
      </span>

      {subtitle ? (
        <span
          className={
            variant === "danger"
              ? styles.subtitleDanger
              : styles.subtitle
          }
        >
          {subtitle}
        </span>
      ) : null}
    </div>
  );
}

export function ProcurementStats({ stats }: Props) {
  return (
    <StaggerFadeInWrapper className={styles.container}>
      <StatBlock
        icon={<PurchaseOrdersIcon className={styles.purchaseOrdersIcon} />}
        label="PURCHASE ORDERS"
        value={String(stats.purchaseOrderCount)}
        subtitle={`Across ${stats.supplierCount} suppliers`}
      />

      <div className={styles.divider} />

      <StatBlock
        icon={<ProposedSpendIcon className={styles.proposedSpendIcon} />}
        label="PROPOSED SPEND"
        value={FormatService.currencyWhole(stats.proposedSpend)}
      />

      <div className={styles.divider} />

      <StatBlock
        icon={<StockOutsRiskIcon className={styles.stockOutsRiskIcon} />}
        label="STOCK-OUTS AT RISK"
        value={String(stats.stockOutsAtRisk)}
        subtitle="SKUs at risk"
        variant="danger"
      />
    </StaggerFadeInWrapper>
  );
}
