"use client";

import { useState } from "react";
import type { EarlyArrivalData } from "@models/action-content";
import { FormatService } from "@services/format";
import { EmailMessage } from "@components/blocks/email-message/email-message";
import { ActionFooter } from "@components/blocks/action-footer/action-footer";
import { ActionItemLayout } from "@components/blocks/action-item-layout/action-item-layout";
import { ContentSectionLabel } from "@components/ui/content-section-label";
import styles from "./early-arrival-content.module.scss";

interface Props {
  title: string;
  subtitle: string;
  data: EarlyArrivalData;
  onAcknowledge?: () => void;
}

function UpdatedSchedule({
  hoursEarly,
  originalEta,
  newEta,
}: {
  hoursEarly: number;
  originalEta: string;
  newEta: string;
}) {
  return (
    <div className={styles.scheduleCard}>
      <div className={styles.scheduleHeader}>
        <h4 className={styles.scheduleTitle}>Updated Schedule</h4>
        <span className={styles.earlyBadge}>
          {hoursEarly} HOURS EARLY
        </span>
      </div>

      <div className={styles.scheduleFields}>
        <div className={styles.scheduleField}>
          <span className={styles.scheduleLabel}>ORIGINAL ETA</span>
          <span className={styles.scheduleValueStrikethrough}>
            {originalEta}
          </span>
        </div>

        <div className={styles.scheduleField}>
          <span className={styles.scheduleLabel}>
            NEW CONFIRMED ETA
          </span>
          <span className={styles.scheduleValue}>{newEta}</span>
        </div>
      </div>
    </div>
  );
}

function RecommendedActions({
  checkedStates,
  onToggle,
  actions,
}: {
  checkedStates: boolean[];
  onToggle: (params: { index: number; checked: boolean }) => void;
  actions: EarlyArrivalData["recommendedActions"];
}) {
  return (
    <div className={styles.actionsCard}>
      <h4 className={styles.actionsTitle}>Recommended Action</h4>

      <div className={styles.actionsList}>
        {actions.map((action, index) => (
          <label key={action.label} className={styles.actionItem}>
            <input
              type="checkbox"
              checked={checkedStates[index]}
              onChange={(event) => onToggle({ index, checked: event.target.checked })}
              className={styles.actionCheckbox}
            />
            <span className={styles.actionLabel}>{action.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function EarlyArrivalContent({
  title,
  subtitle,
  data,
  onAcknowledge,
}: Props) {
  const [checkedStates, setCheckedStates] = useState(
    data.recommendedActions.map((action) => action.checked),
  );

  const hasChecked = checkedStates.some(Boolean);

  const acknowledgeLabel = hasChecked
    ? "Acknowledge Early Arrival & Action Tasks"
    : "Acknowledge Early Arrival";

  function handleToggle({
    index,
    checked,
  }: {
    index: number;
    checked: boolean;
  }) {
    setCheckedStates((previous) =>
      previous.map((value, itemIndex) =>
        itemIndex === index ? checked : value,
      ),
    );
  }

  return (
    <ActionItemLayout
      title={title}
      subtitle={subtitle}
      footer={
        <ActionFooter
          variant="acknowledge"
          acknowledgeLabel={acknowledgeLabel}
          onAcknowledge={onAcknowledge}
        />
      }
    >
      <EmailMessage data={data.email} />

      <div className={styles.section}>
        <ContentSectionLabel>
          INBOUND SHIPMENT OVERVIEW
        </ContentSectionLabel>

        <div className={styles.overviewGrid}>
          <UpdatedSchedule
            hoursEarly={data.hoursEarly}
            originalEta={data.originalEta}
            newEta={data.newEta}
          />

          <RecommendedActions
            actions={data.recommendedActions}
            checkedStates={checkedStates}
            onToggle={handleToggle}
          />
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionLabelLarge}>In-Transit Items</p>

        <div className={styles.itemsTable}>
          <div className={styles.itemsHeader}>
            <span>SKU/ITEM:</span>
            <span className={styles.itemsHeaderCenter}>QTY</span>
            <span className={styles.itemsHeaderRight}>SUBTOTAL</span>
          </div>

          {data.inTransitItems.map((item) => (
            <div key={item.sku + item.name} className={styles.itemRow}>
              <div className={styles.itemInfo}>
                <span className={styles.itemSku}>{item.sku}</span>
                <span className={styles.itemName}>{item.name}</span>
              </div>

              <span className={styles.itemQty}>{item.quantity}</span>

              <span className={styles.itemSubtotal}>
                {FormatService.currency(item.subtotal)}
              </span>
            </div>
          ))}

          <div className={styles.itemsTotalRow}>
            <span className={styles.itemsTotalLabel}>Total</span>
            <span className={styles.itemsTotalValue}>
              {FormatService.currency(data.total)}
            </span>
          </div>
        </div>
      </div>
    </ActionItemLayout>
  );
}
