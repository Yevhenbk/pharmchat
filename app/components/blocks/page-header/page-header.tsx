"use client";

import { useMemo } from "react";
import { cn } from "@utilities/tailwind";
import { useDashboardStore } from "@providers/store-provider";
import styles from "./page-header.module.scss";

interface Props {
  className?: string;
}

function formatSpend(amount: number): string {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}k`;
  }

  return `$${amount.toLocaleString("en-US")}`;
}

export function PageHeader({ className }: Props) {
  const procurementData = useDashboardStore((state) => state.procurementData);
  const confirmedVendorIds = useDashboardStore(
    (state) => state.confirmedVendorIds,
  );

  const today = useMemo(() => {
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date());
  }, []);

  const pendingPOs = procurementData
    ? procurementData.vendors.length - confirmedVendorIds.size
    : null;
  const proposedSpend = procurementData?.stats.proposedSpend ?? null;
  const stockOutsAtRisk = procurementData?.stats.stockOutsAtRisk ?? null;

  return (
    <header className={cn(styles.header, className)}>
      <div className={styles["header-content"]}>
        <div
          className={cn(styles["header-text"], styles["animate-header-text"])}
        >
          <h1 className={styles["header-title"]}>Procurement Run</h1>
          <p className={styles["header-date"]}>{today}</p>
        </div>

        <div
          className={cn(styles.chips, styles["animate-header-text"])}
          aria-label="Run summary"
        >
          <div className={styles.chip}>
            <span className={styles.chipValue}>{pendingPOs ?? "–"}</span>
            <span className={styles.chipLabel}>POs pending</span>
          </div>

          <div className={styles.chipDivider} />

          <div className={styles.chip}>
            <span className={styles.chipValue}>
              {proposedSpend !== null ? formatSpend(proposedSpend) : "–"}
            </span>
            <span className={styles.chipLabel}>proposed spend</span>
          </div>

          {stockOutsAtRisk !== null && stockOutsAtRisk > 0 && (
            <>
              <div className={styles.chipDivider} />
              <div className={cn(styles.chip, styles.chipDanger)}>
                <span className={styles.chipValue}>{stockOutsAtRisk}</span>
                <span className={styles.chipLabel}>stock-outs at risk</span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.divider} />
    </header>
  );
}
