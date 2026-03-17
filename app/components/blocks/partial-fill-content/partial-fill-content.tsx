import type { PartialFillData, PartialFillSKURow } from "@models/action-content";
import { EmailMessage } from "@components/blocks/email-message/email-message";
import { ActionFooter } from "@components/blocks/action-footer/action-footer";
import { ActionItemLayout } from "@components/blocks/action-item-layout/action-item-layout";
import { ContentSectionLabel } from "@components/ui/content-section-label";
import { MiraInsightCard } from "@components/ui/mira-insight-card";

import styles from "./partial-fill-content.module.scss";

interface Props {
  title: string;
  subtitle: string;
  data: PartialFillData;
  onApprove?: () => void;
  onReject?: () => void;
}

function SkuFillRow({ row }: { row: PartialFillSKURow }) {
  const isAtRisk = row.daysOnHand <= 7;

  return (
    <div className={styles.skuRow}>
      <div className={styles.skuHeader}>
        <span className={styles.skuCode}>{row.sku}</span>
        <span className={styles.skuName}>{row.name}</span>
      </div>

      <div className={styles.fillStats}>
        <div className={styles.fillStat}>
          <span className={styles.fillStatLabel}>Ordered</span>
          <span className={styles.fillStatValue}>
            {row.orderedQuantity}
          </span>
        </div>

        <div className={styles.fillStat}>
          <span className={styles.fillStatLabel}>Delivered</span>
          <span className={styles.fillStatValue}>
            {row.deliveredQuantity}
          </span>
        </div>

        <div className={styles.fillStat}>
          <span className={styles.fillStatLabel}>Backordered</span>
          <span className={styles.fillStatValueWarning}>
            {row.backorderedQuantity}
          </span>
        </div>

        <div className={styles.fillStat}>
          <span className={styles.fillStatLabel}>Days on Hand</span>
          <span
            className={
              isAtRisk
                ? styles.fillStatValueWarning
                : styles.fillStatValue
            }
          >
            {row.daysOnHand}
          </span>
        </div>
      </div>

      <div className={styles.stockoutRow}>
        <div className={styles.stockoutStat}>
          <span className={styles.stockoutLabel}>Stockout Risk</span>
          <span
            className={
              isAtRisk
                ? styles.stockoutValue
                : styles.stockoutValueSafe
            }
          >
            {isAtRisk ? row.stockoutDate : "No immediate risk"}
          </span>
        </div>
      </div>
    </div>
  );
}

export function PartialFillContent({
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
      <EmailMessage data={data.email} />

      <div className={styles.section}>
        <ContentSectionLabel>
          OZAI PARTIAL FILL ANALYSIS
        </ContentSectionLabel>

        <div className={styles.contentCard}>
          <div className={styles.vendorRow}>
            <span className={styles.vendorName}>{data.vendor}</span>
            <span className={styles.backorderEta}>
              Backorder ETA: {data.backorderEta}
            </span>
          </div>

          <div className={styles.skuList}>
            {data.skus.map((row) => (
              <SkuFillRow key={row.sku} row={row} />
            ))}
          </div>
        </div>

        <MiraInsightCard insight={data.miraInsight} />
      </div>

      <div className={styles.consequenceGrid}>
        <div className={styles.consequenceRejected}>
          <p className={styles.consequenceLabel}>If Rejected</p>

          <div className={styles.consequenceItems}>
            {data.ifRejected.consequences.map((item) => (
              <span key={item} className={styles.consequenceTag}>
                {item}
              </span>
            ))}
          </div>

          {data.ifRejected.tags[0] ? (
            <p className={styles.consequenceText}>
              {data.ifRejected.tags[0]}
            </p>
          ) : null}
        </div>

        <div className={styles.consequenceApproved}>
          <p className={styles.consequenceLabel}>If Accepted</p>

          {data.ifAccepted.tags?.map((tag) => (
            <span key={tag} className={styles.consequenceTag}>
              {tag}
            </span>
          ))}

          <p className={styles.consequenceText}>
            {data.ifAccepted.summary}
          </p>
        </div>
      </div>
    </ActionItemLayout>
  );
}
