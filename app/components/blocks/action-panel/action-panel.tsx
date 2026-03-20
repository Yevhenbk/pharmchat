"use client";

import { useState } from "react";
import { cn } from "@utilities/tailwind";
import { cssCustomProperties } from "@utilities/css";
import type { ModalMode } from "@models/modal";
import type { ActionItemData, Severity } from "@models/action-item";
import { SEVERITY_TO_MODE } from "@demo/action-items-data";
import { motion } from "motion/react";
import { useDashboardStore } from "@providers/store-provider";
import { useGlanceStore } from "@stores/glance-store";
import { FormatService } from "@services/format";
import { API_ROUTES } from "@/app/constants/api";
import { SectionLabel } from "@components/ui/section-label";
import { ActionItem } from "@components/blocks/action-item/action-item";
import { ActionButton } from "@components/ui/action-button";
import { TodaysPosCubeIcon } from "@components/icons/todays-pos-cube";
import styles from "./action-panel.module.scss";

// ── Order Run section ──────────────────────────────────────────

type VendorStatus = "idle" | "sending" | "sent" | "failed";

function OrderRunSection() {
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
  const [statuses, setStatuses] = useState<Record<string, VendorStatus>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [runComplete, setRunComplete] = useState(false);

  const selectedVendors = vendors.filter((v) => selectedIds.has(v.id));
  const totalValue = selectedVendors.reduce((sum, v) => sum + v.value, 0);
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

  const executeRun = async () => {
    if (isRunning || selectedVendors.length === 0) return;

    setIsRunning(true);

    for (const vendor of selectedVendors) {
      setStatuses((previous) => ({ ...previous, [vendor.id]: "sending" }));

      try {
        // eslint-disable-next-line no-await-in-loop
        await fetch(API_ROUTES.SEND_PO, {
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
      <p className={styles["order-run-empty"]}>All orders confirmed.</p>
    );
  }

  return (
    <div className={styles["order-run-list"]}>
      {vendors.map((vendor) => {
        const status = statuses[vendor.id] ?? "idle";
        const isSelected = selectedIds.has(vendor.id);

        return (
          <label
            key={vendor.id}
            className={cn(
              styles["order-run-row"],
              !isSelected && styles["order-run-row-dimmed"],
              isRunning && styles["order-run-row-locked"],
            )}
          >
            <input
              type="checkbox"
              className={styles["order-run-checkbox"]}
              checked={isSelected}
              onChange={() => toggleSelect(vendor.id)}
              disabled={isRunning}
            />
            <div className={styles["order-run-vendor"]}>
              <span className={styles["order-run-vendor-name"]}>
                {vendor.vendorName}
              </span>
              {vendor.urgency && (
                <span
                  className={cn(
                    styles["order-run-badge"],
                    vendor.urgency === "out-of-stock"
                      ? styles["order-run-badge-critical"]
                      : styles["order-run-badge-urgent"],
                  )}
                >
                  {vendor.urgency === "out-of-stock" ? "OOS" : "Urgent"}
                </span>
              )}
            </div>
            <span className={styles["order-run-value"]}>
              {FormatService.compactCurrency(vendor.value)}
            </span>
            {status === "sending" && (
              <span className={cn(styles["order-run-status"], styles["order-run-status-sending"])}>
                Sending…
              </span>
            )}
            {status === "sent" && (
              <span className={cn(styles["order-run-status"], styles["order-run-status-sent"])}>
                Sent
              </span>
            )}
            {status === "failed" && (
              <span className={cn(styles["order-run-status"], styles["order-run-status-failed"])}>
                Failed
              </span>
            )}
          </label>
        );
      })}

      <div className={styles["order-run-footer"]}>
        {allDone ? (
          <span className={cn(styles["order-run-done"], failedCount > 0 && styles["order-run-done-warn"])}>
            {failedCount > 0
              ? `${sentCount} sent · ${failedCount} failed`
              : `All ${sentCount} PO${sentCount !== 1 ? "s" : ""} sent ✓`}
          </span>
        ) : (
          <>
            <span className={styles["order-run-count"]}>
              {selectedIds.size} of {vendors.length} selected
            </span>
            <button
              type="button"
              className={styles["order-run-btn"]}
              onClick={executeRun}
              disabled={isRunning || selectedIds.size === 0}
            >
              {isRunning
                ? `${sentCount + failedCount}/${selectedVendors.length}…`
                : `Send ${selectedIds.size} PO${selectedIds.size !== 1 ? "s" : ""} · ${FormatService.compactCurrency(totalValue)}`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const SECTION_LABELS: Record<Severity, string> = {
  critical: "Critical",
  warning: "Warning",
  fyi: "FYI",
};

const DELAY_STEP = 80;
const SECTION_GAP = 60;
const SECTION_GAP_SLOTS = SECTION_GAP / DELAY_STEP;

interface SeveritySectionDelays {
  readonly severity: Severity;
  readonly items: readonly ActionItemData[];
  readonly labelDelayIndex: number;
  readonly itemDelayIndices: readonly number[];
}

interface StaggerDelays {
  readonly todaysPosLabelDelayIndex: number;
  readonly todaysPosRowDelayIndex: number;
  readonly severitySections: readonly SeveritySectionDelays[];
}

function computeStaggerDelays({
  itemsBySeverity,
}: {
  itemsBySeverity: (severity: Severity) => readonly ActionItemData[];
}): StaggerDelays {
  const todaysPosLabelDelayIndex = 0;
  const todaysPosRowDelayIndex = 1;

  const baseOffset = todaysPosRowDelayIndex + 1 + SECTION_GAP_SLOTS;

  const severitySections = (
    ["critical", "warning", "fyi"] as const
  ).reduce<{
    readonly sections: readonly SeveritySectionDelays[];
    readonly nextIndex: number;
  }>(
    (accumulator, severity) => {
      const items = itemsBySeverity(severity);

      if (items.length === 0) {
        return {
          sections: [
            ...accumulator.sections,
            {
              severity,
              items,
              labelDelayIndex: 0,
              itemDelayIndices: [],
            },
          ],
          nextIndex: accumulator.nextIndex,
        };
      }

      const labelDelayIndex = accumulator.nextIndex;

      const itemDelayIndices = items.map(
        (_, index) => labelDelayIndex + 1 + index,
      );

      const nextIndex =
        labelDelayIndex + 1 + items.length + SECTION_GAP_SLOTS;

      return {
        sections: [
          ...accumulator.sections,
          { severity, items, labelDelayIndex, itemDelayIndices },
        ],
        nextIndex,
      };
    },
    { sections: [], nextIndex: baseOffset },
  );

  return {
    todaysPosLabelDelayIndex,
    todaysPosRowDelayIndex,
    severitySections: severitySections.sections,
  };
}

interface Props {
  activeTab?: "rx-deck" | "order-run";
  poCount?: number;
  onOpenPOQueue?: () => void;
  onOpenAction?: (params: {
    mode: ModalMode;
    actionId?: string;
  }) => void;
  onDismissAction?: (id: string) => void;
  dismissedIds?: ReadonlySet<string>;
  className?: string;
}

function staggerStyle(index: number): React.CSSProperties {
  return cssCustomProperties({
    "--stagger-delay": `${index * DELAY_STEP}ms`,
  });
}

export function ActionPanel({
  activeTab = "rx-deck",
  poCount = 12,
  onOpenPOQueue,
  onOpenAction,
  onDismissAction,
  dismissedIds,
  className,
}: Props) {
  const actionItems = useDashboardStore(
    (state) => state.actionItems,
  );

  const [localDismissedIds, setLocalDismissedIds] =
    useState<ReadonlySet<string>>(new Set());

  const effectiveDismissedIds = dismissedIds ?? localDismissedIds;

  const visibleItems = actionItems.filter(
    (item) => !effectiveDismissedIds.has(item.id),
  );

  const handleDismiss = (id: string) => {
    if (onDismissAction) {
      onDismissAction(id);

      return;
    }

    setLocalDismissedIds((current) => new Set([...current, id]));
  };

  const itemsBySeverity = (
    severity: Severity,
  ): readonly ActionItemData[] => {
    return visibleItems.filter((item) => item.severity === severity);
  };

  const {
    todaysPosLabelDelayIndex,
    todaysPosRowDelayIndex,
    severitySections,
  } = computeStaggerDelays({ itemsBySeverity });

  return (
    <section className={cn(styles.panel, className)}>
      <motion.div layout className={styles.section}>
        <div
          className={styles["animate-item"]}
          style={staggerStyle(todaysPosLabelDelayIndex)}
        >
          <SectionLabel variant="todays-pos">
            {activeTab === "order-run" ? "Order Run" : "PO Queue"}
          </SectionLabel>
        </div>

        <div
          className={cn(
            styles["po-queue-body"],
            activeTab === "order-run" && styles["po-queue-body-expanded"],
          )}
        >
          {activeTab === "order-run" ? (
            <div
              key="order-run"
              className={styles["animate-item"]}
              style={staggerStyle(todaysPosRowDelayIndex)}
            >
              <OrderRunSection />
            </div>
          ) : (
            <div
              key="rx-deck"
              className={cn(
                styles["todays-pos-row"],
                styles["animate-item"],
              )}
              style={staggerStyle(todaysPosRowDelayIndex)}
            >
              <TodaysPosIcon />

              <div className={styles["todays-pos-content"]}>
                <p className={styles["todays-pos-title"]}>
                  {poCount} POs to approve &amp; send
                </p>
                <p className={styles["todays-pos-desc"]}>
                  Includes orders that must be placed today to avoid
                  stock-outs.
                </p>
              </div>

              <ActionButton
                variant="outline"
                className="w-16 text-why-order-demand"
                onClick={onOpenPOQueue}
              >
                PO que
              </ActionButton>
            </div>
          )}
        </div>
      </motion.div>

      {severitySections.map(
        ({
          severity,
          items,
          labelDelayIndex,
          itemDelayIndices,
        }) => {
          if (items.length === 0) {
            return null;
          }

          return (
            <motion.div key={severity} layout="position">
              <div className={styles.divider} />

              <div className={styles.section}>
                <div
                  className={styles["animate-item"]}
                  style={staggerStyle(labelDelayIndex)}
                >
                  <SectionLabel variant={severity}>
                    {SECTION_LABELS[severity]}
                  </SectionLabel>
                </div>
                <div className={styles.items}>
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className={styles["animate-item"]}
                      style={staggerStyle(
                        itemDelayIndices[index],
                      )}
                    >
                      <ActionItem
                        item={item}
                        onIgnore={() =>
                          handleDismiss(item.id)
                        }
                        onActionClick={() =>
                          onOpenAction?.({
                            mode: SEVERITY_TO_MODE[severity],
                            actionId: item.id,
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        },
      )}
    </section>
  );
}

function TodaysPosIcon() {
  return <TodaysPosCubeIcon className={styles["todays-pos-icon"]} />;
}
