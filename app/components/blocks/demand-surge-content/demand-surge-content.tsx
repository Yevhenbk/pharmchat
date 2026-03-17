import type { DemandSurgeData, DemandSurgeSKURow } from "@models/action-content";
import { FormatService } from "@services/format";
import { DemandSignalsPanel } from "@components/blocks/demand-signals-panel/demand-signals-panel";
import { ActionFooter } from "@components/blocks/action-footer/action-footer";
import { ActionItemLayout } from "@components/blocks/action-item-layout/action-item-layout";
import { ContentSectionLabel } from "@components/ui/content-section-label";
import styles from "./demand-surge-content.module.scss";

interface Props {
  title: string;
  subtitle: string;
  data: DemandSurgeData;
  onApprove?: () => void;
  onReject?: () => void;
}

function InventoryTable({
  label,
  vendor,
  rows,
  total,
  variant = "current",
  totalDelta,
}: {
  label: string;
  vendor: string;
  rows: readonly (DemandSurgeSKURow & { quantityDelta?: number })[];
  total: number;
  variant?: "current" | "optimized";
  totalDelta?: number;
}) {
  return (
    <div
      className={
        variant === "optimized"
          ? styles.tableCardHighlight
          : styles.tableCard
      }
    >
      <p className={styles.tableLabel}>{label}</p>
      <p className={styles.tableVendor}>{vendor}</p>

      <div className={styles.tableHeader}>
        <span>SKU/ITEM</span>
        <span className={styles.tableHeaderRight}>QTY</span>
        <span className={styles.tableHeaderRight}>SUBTOTAL</span>
      </div>

      {rows.map((row) => (
        <div key={`${row.sku}-${row.name}`} className={styles.tableRow}>
          <div className={styles.skuCell}>
            <span className={styles.skuCode}>{row.sku}</span>
            <span className={styles.skuName}>{row.name}</span>
          </div>

          <span className={styles.qtyCell}>
            {row.quantity}
            {row.quantityDelta !== undefined && row.quantityDelta > 0 ? (
              <span className={styles.qtyDelta}>
                +{row.quantityDelta}
              </span>
            ) : null}
          </span>

          <span className={styles.subtotalCell}>
            {FormatService.currency(row.subtotal)}
          </span>
        </div>
      ))}

      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>
          {variant === "optimized" ? "Adjusted PO Total" : "Total"}
        </span>
        <span className={styles.totalValue}>
          {FormatService.currency(total)}
          {totalDelta !== undefined && totalDelta > 0 ? (
            <span className={styles.totalDelta}>
              {" "}
              (+{FormatService.currency(totalDelta)})
            </span>
          ) : null}
        </span>
      </div>
    </div>
  );
}

function CoverageStats({
  stockCoverageDays,
  poRevenue,
  variant = "current",
}: {
  stockCoverageDays: number;
  poRevenue: number;
  variant?: "current" | "optimized";
}) {
  return (
    <div
      className={
        variant === "optimized"
          ? styles.coverageRowApproved
          : styles.coverageRow
      }
    >
      <div className={styles.coverageStat}>
        <span className={styles.coverageLabel}>Stock Coverage</span>
        <span
          className={
            variant === "optimized"
              ? styles.coverageValueSuccess
              : styles.coverageValueWarning
          }
        >
          {stockCoverageDays} days
        </span>
      </div>

      <div className={styles.coverageStat}>
        <span className={styles.coverageLabel}>PO Revenue</span>
        <span
          className={
            variant === "optimized"
              ? styles.coverageValueSuccess
              : styles.coverageValue
          }
        >
          {FormatService.currencyWhole(poRevenue)}
        </span>
      </div>

      <span
        className={
          variant === "optimized"
            ? styles.coverageBadgeApproved
            : styles.coverageBadge
        }
      >
        {variant === "optimized" ? "IF APPROVED" : "Current"}
      </span>
    </div>
  );
}

export function DemandSurgeContent({
  title,
  subtitle,
  data,
  onApprove,
  onReject,
}: Props) {
  return (
    <ActionItemLayout
      title={title}
      subtitle={subtitle}
      footer={
        <ActionFooter
          variant="approve-reject"
          onApprove={onApprove}
          onReject={onReject}
        />
      }
    >
      <DemandSignalsPanel signal={{ summary: data.demandSignal }} />

      <div className={styles.section}>
        <ContentSectionLabel>
          OZAI RECOMMENDATION - INVENTORY UPLIFT STRATEGY
        </ContentSectionLabel>

        <div className={styles.tableGrid}>
          <InventoryTable
            label="CURRENT ORDER"
            vendor={data.currentOrder.vendor}
            rows={data.currentOrder.rows}
            total={data.currentOrder.total}
          />

          <InventoryTable
            label="OPTIMIZED QUANTITIES"
            vendor={data.optimizedOrder.vendor}
            rows={data.optimizedOrder.rows}
            total={data.optimizedOrder.total}
            variant="optimized"
            totalDelta={data.optimizedOrder.totalDelta}
          />
        </div>

        <div className={styles.coverageGrid}>
          <CoverageStats
            stockCoverageDays={data.currentCoverage.stockCoverageDays}
            poRevenue={data.currentCoverage.poRevenue}
          />

          <CoverageStats
            stockCoverageDays={
              data.optimizedCoverage.stockCoverageDays
            }
            poRevenue={data.optimizedCoverage.poRevenue}
            variant="optimized"
          />
        </div>
      </div>
    </ActionItemLayout>
  );
}
