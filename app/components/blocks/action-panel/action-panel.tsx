"use client";

import { useState } from "react";
import { cn } from "@utilities/tailwind";
import { cssCustomProperties } from "@utilities/css";
import type { ModalMode } from "@models/modal";
import type { ActionItemData, Severity } from "@models/action-item";
import { SEVERITY_TO_MODE } from "@demo/action-items-data";
import { useDashboardStore } from "@providers/store-provider";
import { SectionLabel } from "@components/ui/section-label";
import { ActionItem } from "@components/blocks/action-item/action-item";
import { ActionButton } from "@components/ui/action-button";
import { TodaysPosCubeIcon } from "@components/icons/todays-pos-cube";
import styles from "./action-panel.module.scss";

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
      <div className={styles.section}>
        <div
          className={styles["animate-item"]}
          style={staggerStyle(todaysPosLabelDelayIndex)}
        >
          <SectionLabel variant="todays-pos">
            PO Queue
          </SectionLabel>
        </div>

        <div
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
      </div>

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
            <div key={severity}>
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
            </div>
          );
        },
      )}
    </section>
  );
}

function TodaysPosIcon() {
  return <TodaysPosCubeIcon className={styles["todays-pos-icon"]} />;
}
