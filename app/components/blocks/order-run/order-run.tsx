"use client";

import { Fragment, useState } from "react";

import { cn } from "@utilities/tailwind";
import { FormatService } from "@services/format";
import type { VendorOrder, SKUStatus } from "@models/procurement";
import { useDashboardStore } from "@providers/store-provider";
import { useGlanceStore } from "@stores/glance-store";

import styles from "./order-run.module.scss";

// ── Types ──────────────────────────────────────────────────────

type VendorStatus = "idle" | "sending" | "sent" | "failed";

// ── Helpers ────────────────────────────────────────────────────

function daysUntil(dateString: string): number {
  const d = new Date(dateString);

  if (isNaN(d.getTime())) return Infinity;

  return Math.ceil((d.getTime() - Date.now()) / 86_400_000);
}

function formatStockout(dateString: string): string {
  if (!dateString) return "—";

  const days = daysUntil(dateString);

  if (!isFinite(days)) return "—";

  if (days <= 0) return "Today";

  if (days === 1) return "Tomorrow";

  return `${days}d`;
}

// ── Sub-components ─────────────────────────────────────────────

function StatusBadge({ status }: { status: VendorStatus }) {
  if (status === "idle") return <span className={styles.statusIdle}>—</span>;

  if (status === "sending")
    return <span className={cn(styles.statusChip, styles.statusSending)}>Sending…</span>;

  if (status === "sent")
    return <span className={cn(styles.statusChip, styles.statusSent)}>Sent</span>;

  return <span className={cn(styles.statusChip, styles.statusFailed)}>Failed</span>;
}

function SkuStatusBadge({ status }: { status: SKUStatus }) {
  if (status === "out-of-stock")
    return <span className={cn(styles.skuBadge, styles.skuBadgeOutOfStock)}>Out of stock</span>;

  if (status === "urgent")
    return <span className={cn(styles.skuBadge, styles.skuBadgeUrgent)}>Urgent</span>;

  if (status === "low-stock")
    return <span className={cn(styles.skuBadge, styles.skuBadgeLowStock)}>Low stock</span>;

  return <span className={cn(styles.skuBadge, styles.skuBadgeNormal)}>Normal</span>;
}

function LineItemsTable({ vendor }: { vendor: VendorOrder }) {
  return (
    <table className={styles.innerTable}>
      <thead>
        <tr>
          <th className={styles.innerTh}>SKU</th>
          <th className={styles.innerTh}>Drug Name</th>
          <th className={styles.innerTh}>Status</th>
          <th className={styles.innerTh}>Qty</th>
          <th className={styles.innerTh}>Unit Price</th>
          <th className={styles.innerTh}>Value</th>
        </tr>
      </thead>
      <tbody>
        {vendor.lineItems.map((item) => (
          <tr key={item.id}>
            <td className={cn(styles.innerTd, styles.skuCode)}>{item.skuCode}</td>
            <td className={styles.innerTd}>{item.name}</td>
            <td className={styles.innerTd}>
              <SkuStatusBadge status={item.status} />
            </td>
            <td className={styles.innerTd}>{item.recommendedQuantity}</td>
            <td className={styles.innerTd}>{FormatService.currency(item.unitPrice)}</td>
            <td className={styles.innerTd}>{FormatService.currency(item.orderValue)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ── Main component ─────────────────────────────────────────────

interface Props {
  className?: string;
}

export function OrderRun({ className }: Props) {
  const procurementData = useDashboardStore((state) => state.procurementData);
  const confirmedVendorIds = useDashboardStore((state) => state.confirmedVendorIds);
  const logActivity = useDashboardStore((state) => state.logActivity);
  const incrementSentPoCount = useGlanceStore((state) => state.incrementSentPoCount);

  const vendors = procurementData
    ? procurementData.vendors.filter((v) => !confirmedVendorIds.has(v.id))
    : [];

  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(
    () => new Set(vendors.map((v) => v.id)),
  );
  const [expandedIds, setExpandedIds] = useState<ReadonlySet<string>>(new Set());
  const [statuses, setStatuses] = useState<Record<string, VendorStatus>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [runComplete, setRunComplete] = useState(false);

  const selectedVendors = vendors.filter((v) => selectedIds.has(v.id));
  const totalValue = selectedVendors.reduce((sum, v) => sum + v.value, 0);
  const urgentCount = vendors.filter((v) => v.urgency).length;

  const sentCount = Object.values(statuses).filter((s) => s === "sent").length;
  const failedCount = Object.values(statuses).filter((s) => s === "failed").length;
  const allDone = runComplete && sentCount + failedCount === selectedVendors.length;

  const toggleSelect = (id: string) => {
    setSelectedIds((previous) => {
      const next = new Set(previous);

      if (next.has(id)) next.delete(id);
      else next.add(id);

      return next;
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((previous) => {
      const next = new Set(previous);

      if (next.has(id)) next.delete(id);
      else next.add(id);

      return next;
    });
  };

  const toggleAll = () => {
    setSelectedIds(
      selectedIds.size === vendors.length
        ? new Set()
        : new Set(vendors.map((v) => v.id)),
    );
  };

  const executeRun = async () => {
    if (isRunning || selectedVendors.length === 0) return;

    setIsRunning(true);

    for (const vendor of selectedVendors) {
      setStatuses((previous) => ({ ...previous, [vendor.id]: "sending" }));

      try {
        // eslint-disable-next-line no-await-in-loop
        await fetch("/api/send-po", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ vendor, lineItems: vendor.lineItems }),
        });

        setStatuses((previous) => ({ ...previous, [vendor.id]: "sent" }));
        incrementSentPoCount();
        logActivity({
          title: `PO sent to ${vendor.vendorName}`,
          description: `${vendor.lineItems.length} item${vendor.lineItems.length === 1 ? "" : "s"} — ${FormatService.currency(vendor.value)}`,
          icon: "email",
          poNumber: vendor.poSummary.poNumber.replace(/^PO-/i, ""),
        });
      } catch {
        setStatuses((previous) => ({ ...previous, [vendor.id]: "failed" }));
      }
    }

    setIsRunning(false);
    setRunComplete(true);
  };

  if (vendors.length === 0) {
    return (
      <div className={cn(styles.root, className)}>
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No pending orders</p>
          <p className={styles.emptyDesc}>
            All vendors have been confirmed. Check Rx Deck for new supplier emails.
          </p>
        </div>
      </div>
    );
  }

  const runDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={cn(styles.root, className)}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>Order Run</h1>
          <span className={styles.date}>{runDate}</span>
        </div>
        <div className={styles.chips}>
          <span className={styles.chip}>
            {vendors.length} vendor{vendors.length !== 1 ? "s" : ""}
          </span>
          <span className={styles.chip}>
            {FormatService.compactCurrency(
              vendors.reduce((sum, v) => sum + v.value, 0),
            )}{" "}
            proposed spend
          </span>
          {urgentCount > 0 && (
            <span className={cn(styles.chip, styles.chipUrgent)}>
              {urgentCount} urgent
            </span>
          )}
        </div>
      </div>

      {/* Completion banner */}
      {allDone && (
        <div className={cn(styles.banner, failedCount > 0 ? styles.bannerWarn : styles.bannerSuccess)}>
          {failedCount > 0
            ? `${sentCount} PO${sentCount !== 1 ? "s" : ""} sent · ${failedCount} failed — retry failed vendors manually`
            : `All ${sentCount} PO${sentCount !== 1 ? "s" : ""} sent successfully`}
        </div>
      )}

      {/* Vendor table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={cn(styles.th, styles.thCheck)}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={selectedIds.size === vendors.length && vendors.length > 0}
                  onChange={toggleAll}
                  disabled={isRunning}
                />
              </th>
              <th className={styles.th}>Vendor</th>
              <th className={styles.th}>SKUs</th>
              <th className={styles.th}>Value</th>
              <th className={styles.th}>Urgency</th>
              <th className={styles.th}>Stockout</th>
              <th className={cn(styles.th, styles.thStatus)}>Status</th>
              <th className={cn(styles.th, styles.thExpand)} />
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => {
              const status = statuses[vendor.id] ?? "idle";
              const isExpanded = expandedIds.has(vendor.id);
              const isSelected = selectedIds.has(vendor.id);
              const days = daysUntil(vendor.earliestStockout);

              return (
                <Fragment key={vendor.id}>
                  <tr className={cn(styles.row, !isSelected && styles.rowDimmed)}>
                    <td className={styles.td}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={isSelected}
                        onChange={() => toggleSelect(vendor.id)}
                        disabled={isRunning}
                      />
                    </td>
                    <td className={styles.td}>
                      <div className={styles.vendorCell}>
                        <span className={styles.vendorName}>{vendor.vendorName}</span>
                        <span className={styles.poNumber}>{vendor.poSummary.poNumber}</span>
                      </div>
                    </td>
                    <td className={styles.td}>{vendor.skuCount}</td>
                    <td className={styles.td}>{FormatService.compactCurrency(vendor.value)}</td>
                    <td className={styles.td}>
                      {vendor.urgency ? (
                        <span
                          className={cn(
                            styles.badge,
                            vendor.urgency === "out-of-stock"
                              ? styles.badgeCritical
                              : styles.badgeUrgent,
                          )}
                        >
                          {vendor.urgency === "out-of-stock" ? "Out of stock" : "Urgent"}
                        </span>
                      ) : (
                        <span className={styles.badgeNormal}>Normal</span>
                      )}
                    </td>
                    <td className={styles.td}>
                      <span
                        className={cn(
                          styles.stockout,
                          days <= 3 && styles.stockoutCritical,
                          days > 3 && days <= 7 && styles.stockoutWarning,
                        )}
                      >
                        {formatStockout(vendor.earliestStockout)}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <StatusBadge status={status} />
                    </td>
                    <td className={styles.td}>
                      <button
                        type="button"
                        className={cn(styles.expandBtn, isExpanded && styles.expandBtnOpen)}
                        onClick={() => toggleExpand(vendor.id)}
                        aria-label={isExpanded ? "Collapse line items" : "Expand line items"}
                      >
                        <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path
                            d="M2 4l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr className={styles.expandedRow}>
                      <td colSpan={8} className={styles.expandedTd}>
                        <LineItemsTable vendor={vendor} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom action bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomBarLeft}>
          <span className={styles.selectionSummary}>
            {selectedIds.size} of {vendors.length} vendor{vendors.length !== 1 ? "s" : ""} selected
          </span>
          <span className={styles.totalValue}>{FormatService.currency(totalValue)}</span>
        </div>
        <button
          type="button"
          className={cn(styles.executeBtn, isRunning && styles.executeBtnRunning)}
          onClick={executeRun}
          disabled={isRunning || selectedIds.size === 0 || allDone}
        >
          {isRunning
            ? `Sending… (${sentCount + failedCount} / ${selectedVendors.length})`
            : allDone
              ? "Run complete"
              : `Send ${selectedIds.size} PO${selectedIds.size !== 1 ? "s" : ""}`}
        </button>
      </div>
    </div>
  );
}
