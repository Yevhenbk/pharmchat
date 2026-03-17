"use client";

import { useCallback } from "react";

import type { ActionItemData } from "@models/action-item";
import { ACTION_ITEM_TYPES, SEVERITIES } from "@models/action-item";
import { useStudioStore } from "@providers/studio-provider";
import { cn } from "@utilities/tailwind";

import { TextField, SelectField } from "./editor-field";
import styles from "./editors.module.scss";

const SEVERITY_BADGE_CLASS: Record<string, string> = {
  critical: styles.badgeCritical,
  warning: styles.badgeWarning,
  fyi: styles.badgeFyi,
};

function ActionItemCard({ item }: { item: ActionItemData }) {
  const actionItems = useStudioStore(
    (state) => state.actionItems,
  );
  const setActionItems = useStudioStore(
    (state) => state.setActionItems,
  );
  const expandedId = useStudioStore(
    (state) => state.expandedId,
  );
  const setExpandedId = useStudioStore(
    (state) => state.setExpandedId,
  );

  const isExpanded = expandedId === item.id;

  const updateItem = useCallback(
    (updates: Partial<ActionItemData>) => {
      setActionItems(
        actionItems.map((ai) =>
          ai.id === item.id ? { ...ai, ...updates } : ai,
        ),
      );
    },
    [item.id, actionItems, setActionItems],
  );

  const removeItem = useCallback(() => {
    setActionItems(
      actionItems.filter((ai) => ai.id !== item.id),
    );
  }, [item.id, actionItems, setActionItems]);

  return (
    <div className={styles.itemCard}>
      <div
        className={styles.itemHeader}
        onClick={() =>
          setExpandedId(isExpanded ? null : item.id)
        }
      >
        <div className={styles.itemHeaderLeft}>
          <span
            className={cn(
              styles.itemBadge,
              SEVERITY_BADGE_CLASS[item.severity],
            )}
          >
            {item.severity}
          </span>

          <span className={styles.itemTitle}>
            {item.title}
          </span>

          <span className={styles.itemSubtitle}>
            {item.type}
          </span>
        </div>

        <span
          className={cn(
            styles.chevron,
            isExpanded && styles.chevronOpen,
          )}
        >
          &#9654;
        </span>
      </div>

      {isExpanded && (
        <div className={styles.itemBody}>
          <div
            className={styles.fieldGrid}
            style={{ paddingTop: 16 }}
          >
            <TextField
              label="ID"
              value={item.id}
              onChange={(value) => updateItem({ id: value })}
            />

            <SelectField
              label="Type"
              value={item.type}
              options={ACTION_ITEM_TYPES}
              onChange={(value) =>
                updateItem({
                  type: value as ActionItemData["type"],
                })
              }
            />

            <SelectField
              label="Severity"
              value={item.severity}
              options={SEVERITIES}
              onChange={(value) =>
                updateItem({
                  severity:
                    value as ActionItemData["severity"],
                })
              }
            />

            <TextField
              label="Time Ago"
              value={item.timeAgo ?? ""}
              onChange={(value) =>
                updateItem({
                  timeAgo: value || undefined,
                })
              }
            />
          </div>

          <TextField
            label="Title"
            value={item.title}
            onChange={(value) =>
              updateItem({ title: value })
            }
          />

          <div style={{ marginTop: 12 }}>
            <TextField
              label="Description"
              value={item.description}
              multiline
              onChange={(value) =>
                updateItem({ description: value })
              }
            />
          </div>

          <div
            className={styles.fieldGrid}
            style={{ marginTop: 12 }}
          >
            <TextField
              label="Ignore Label"
              value={item.ignoreLabel ?? ""}
              onChange={(value) =>
                updateItem({
                  ignoreLabel: value || undefined,
                })
              }
            />

            <TextField
              label="Action Button Label"
              value={item.actions[0]?.label ?? ""}
              onChange={(value) =>
                updateItem({
                  actions: [{ label: value }],
                })
              }
            />
          </div>

          <div className={styles.itemActions}>
            <button
              type="button"
              className={styles.removeButton}
              onClick={removeItem}
            >
              Remove Action Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function ActionItemsEditor() {
  const actionItems = useStudioStore(
    (state) => state.actionItems,
  );
  const setActionItems = useStudioStore(
    (state) => state.setActionItems,
  );

  function addItem() {
    const newItem: ActionItemData = {
      id: `action-${Date.now()}`,
      type: "delayed",
      severity: "warning",
      title: "New Action Item",
      description: "Description here",
      actions: [{ label: "Review" }],
      timeAgo: "Just now",
    };

    setActionItems([...actionItems, newItem]);
  }

  return (
    <div className={styles.editorPanel}>
      <h2 className={styles.sectionTitle}>
        Action Items ({actionItems.length})
      </h2>

      <div className={styles.itemList}>
        {actionItems.map((item) => (
          <ActionItemCard key={item.id} item={item} />
        ))}
      </div>

      <button
        type="button"
        className={styles.addButton}
        onClick={addItem}
      >
        + Add Action Item
      </button>
    </div>
  );
}
