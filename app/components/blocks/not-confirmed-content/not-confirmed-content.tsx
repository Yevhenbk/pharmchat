"use client";

import { useState } from "react";
import type { NotConfirmedData } from "@models/action-content";
import { FormatService } from "@services/format";
import { ActionFooter } from "@components/blocks/action-footer/action-footer";
import { ActionItemLayout } from "@components/blocks/action-item-layout/action-item-layout";
import { ContentSectionLabel } from "@components/ui/content-section-label";
import { MiraInsightCard } from "@components/ui/mira-insight-card";

import styles from "./not-confirmed-content.module.scss";

interface Props {
  title: string;
  subtitle: string;
  data: NotConfirmedData;
  onAcknowledge?: () => void;
}

const CHASE_ACTIONS = [
  "Call vendor directly and request written confirmation",
  "Escalate to account manager if no response within 2 hours",
  "Flag delivery date as at-risk in the pharmacy system",
  "Identify a backup supplier for critical SKUs on this PO",
] as const;

export function NotConfirmedContent({
  title,
  subtitle,
  data,
  onAcknowledge,
}: Props) {
  const [checkedStates, setCheckedStates] = useState(
    CHASE_ACTIONS.map(() => false),
  );

  const hasChecked = checkedStates.some(Boolean);

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
          acknowledgeLabel={
            hasChecked ? "Chase Supplier & Log Actions" : "Chase Supplier"
          }
          onAcknowledge={onAcknowledge}
        />
      }
    >
      <div className={styles.section}>
        <ContentSectionLabel>
          OZAI CONFIRMATION STATUS
        </ContentSectionLabel>

        <div className={styles.statusCard}>
          <div className={styles.vendorRow}>
            <span className={styles.vendorName}>{data.vendor}</span>
            <span className={styles.poNumber}>{data.poNumber}</span>
          </div>

          <div className={styles.statusStats}>
            <div className={styles.statusStat}>
              <span className={styles.statusStatLabel}>PO Value</span>
              <span className={styles.statusStatValue}>
                {FormatService.currency(data.poValue)}
              </span>
            </div>

            <div className={styles.statusStat}>
              <span className={styles.statusStatLabel}>
                Expected By
              </span>
              <span className={styles.statusStatValue}>
                {data.expectedBy}
              </span>
            </div>

            <div className={styles.statusStat}>
              <span className={styles.statusStatLabel}>
                Hours Overdue
              </span>
              <span className={styles.statusStatValueWarning}>
                +{data.hoursOverdue}h
              </span>
            </div>

            <div className={styles.statusStat}>
              <span className={styles.statusStatLabel}>
                Scheduled Delivery
              </span>
              <span className={styles.statusStatValue}>
                {data.scheduledDelivery}
              </span>
            </div>
          </div>

          <div className={styles.skuSection}>
            <p className={styles.skuSectionLabel}>Items on This PO</p>

            <div className={styles.skuList}>
              {data.skus.map((sku) => (
                <div key={sku.sku} className={styles.skuRow}>
                  <div className={styles.skuLeft}>
                    <span className={styles.skuCode}>{sku.sku}</span>
                    <span className={styles.skuName}>{sku.name}</span>
                  </div>

                  <span className={styles.skuQty}>{sku.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.actionsCard}>
          <p className={styles.actionsTitle}>Recommended Chase Actions</p>

          <div className={styles.actionsList}>
            {CHASE_ACTIONS.map((action, index) => (
              <label key={action} className={styles.actionItem}>
                <input
                  type="checkbox"
                  checked={checkedStates[index]}
                  onChange={(event) =>
                    handleToggle({ index, checked: event.target.checked })
                  }
                  className={styles.actionCheckbox}
                />
                <span className={styles.actionLabel}>{action}</span>
              </label>
            ))}
          </div>
        </div>

        <MiraInsightCard insight={data.miraInsight} />
      </div>
    </ActionItemLayout>
  );
}
