"use client";

import { useMemo } from "react";

import { useStudioStore } from "@providers/studio-provider";
import { ProcurementService } from "@services/procurement-service";

import styles from "./editors.module.scss";

export function StatsEditor() {
  const vendors = useStudioStore((state) => state.vendors);

  const stats = useMemo(
    () => ProcurementService.deriveStats(vendors),
    [vendors],
  );

  return (
    <div className={styles.editorPanel}>
      <h2 className={styles.sectionTitle}>
        Order Run Stats
      </h2>

      <p className={styles.derivedNote}>
        These values are automatically derived from vendor
        and line item data. Edit vendors and their line items
        to change these numbers.
      </p>

      <div className={styles.fieldGrid}>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>
            Purchase Order Count
          </span>
          <span className={styles.derivedValue}>
            {stats.purchaseOrderCount}
          </span>
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>
            Supplier Count
          </span>
          <span className={styles.derivedValue}>
            {stats.supplierCount}
          </span>
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>
            Proposed Spend
          </span>
          <span className={styles.derivedValue}>
            ${stats.proposedSpend.toLocaleString()}
          </span>
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>
            Stock-Outs at Risk
          </span>
          <span className={styles.derivedValue}>
            {stats.stockOutsAtRisk}
          </span>
        </div>
      </div>
    </div>
  );
}
