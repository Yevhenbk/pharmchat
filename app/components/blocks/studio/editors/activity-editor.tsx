"use client";

import { useCallback } from "react";

import type { ActivityFeedTemplate } from "@models/activity-feed";
import { useStudioStore } from "@providers/studio-provider";
import { cn } from "@utilities/tailwind";

import { TextField, SelectField } from "./editor-field";
import styles from "./editors.module.scss";

const ICON_OPTIONS = ["call", "email", "x"] as const;

function TemplateCard({
  template,
  index,
}: {
  template: ActivityFeedTemplate;
  index: number;
}) {
  const activityTemplates = useStudioStore(
    (state) => state.activityTemplates,
  );
  const setActivityTemplates = useStudioStore(
    (state) => state.setActivityTemplates,
  );
  const expandedId = useStudioStore(
    (state) => state.expandedId,
  );
  const setExpandedId = useStudioStore(
    (state) => state.setExpandedId,
  );

  const itemId = `activity-${index}`;
  const isExpanded = expandedId === itemId;

  const updateTemplate = useCallback(
    (updates: Partial<ActivityFeedTemplate>) => {
      setActivityTemplates(
        activityTemplates.map((t, templateIndex) =>
          templateIndex === index
            ? { ...t, ...updates }
            : t,
        ),
      );
    },
    [index, activityTemplates, setActivityTemplates],
  );

  const removeTemplate = useCallback(() => {
    setActivityTemplates(
      activityTemplates.filter(
        (_, templateIndex) => templateIndex !== index,
      ),
    );
  }, [index, activityTemplates, setActivityTemplates]);

  const iconBadgeClass =
    template.icon === "call"
      ? styles.badgeFyi
      : template.icon === "email"
        ? styles.badgeInfo
        : styles.badgeWarning;

  return (
    <div className={styles.itemCard}>
      <div
        className={styles.itemHeader}
        onClick={() =>
          setExpandedId(isExpanded ? null : itemId)
        }
      >
        <div className={styles.itemHeaderLeft}>
          <span
            className={cn(styles.itemBadge, iconBadgeClass)}
          >
            {template.icon}
          </span>

          <span className={styles.itemTitle}>
            {template.title}
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
            <SelectField
              label="Icon"
              value={template.icon}
              options={ICON_OPTIONS}
              onChange={(value) =>
                updateTemplate({
                  icon:
                    value as ActivityFeedTemplate["icon"],
                })
              }
            />
          </div>

          <TextField
            label="Title"
            value={template.title}
            onChange={(value) =>
              updateTemplate({ title: value })
            }
          />

          <div style={{ marginTop: 12 }}>
            <TextField
              label="Description"
              value={template.description}
              onChange={(value) =>
                updateTemplate({ description: value })
              }
            />
          </div>

          <div className={styles.itemActions}>
            <button
              type="button"
              className={styles.removeButton}
              onClick={removeTemplate}
            >
              Remove Template
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function ActivityEditor() {
  const activityTemplates = useStudioStore(
    (state) => state.activityTemplates,
  );
  const setActivityTemplates = useStudioStore(
    (state) => state.setActivityTemplates,
  );

  function addTemplate() {
    const newTemplate: ActivityFeedTemplate = {
      title: "New activity",
      description: "Activity description",
      icon: "call",
    };

    setActivityTemplates([
      ...activityTemplates,
      newTemplate,
    ]);
  }

  return (
    <div className={styles.editorPanel}>
      <h2 className={styles.sectionTitle}>
        Activity Feed Templates ({activityTemplates.length})
      </h2>

      <div className={styles.itemList}>
        {activityTemplates.map((template, index) => (
          <TemplateCard
            key={`${template.title}-${index}`}
            template={template}
            index={index}
          />
        ))}
      </div>

      <button
        type="button"
        className={styles.addButton}
        onClick={addTemplate}
      >
        + Add Template
      </button>
    </div>
  );
}
