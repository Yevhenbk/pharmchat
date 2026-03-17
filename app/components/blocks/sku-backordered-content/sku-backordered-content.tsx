import type {
  BackorderedSKU,
  DisruptionReport,
  SkuBackorderedData,
} from "@models/action-content";
import { EmailMessage } from "@components/blocks/email-message/email-message";
import { ActionFooter } from "@components/blocks/action-footer/action-footer";
import { ActionItemLayout } from "@components/blocks/action-item-layout/action-item-layout";
import { ContentSectionLabel } from "@components/ui/content-section-label";
import { MiraInsightCard } from "@components/ui/mira-insight-card";

import styles from "./sku-backordered-content.module.scss";

interface Props {
  title: string;
  subtitle: string;
  data: SkuBackorderedData;
  disruptionReport?: DisruptionReport;
  onApprove?: () => void;
  onReject?: () => void;
}

function SkuRow({ sku }: { sku: BackorderedSKU }) {
  const isAtRisk = sku.daysOnHand <= 7;

  return (
    <div className={styles.skuRow}>
      <div className={styles.skuLeft}>
        <div className={styles.skuHeader}>
          <span className={styles.skuCode}>{sku.sku}</span>
          <span className={styles.skuName}>{sku.name}</span>
        </div>

        <span className={styles.skuQty}>{sku.orderedQuantity}</span>

        <div className={styles.alternativesRow}>
          <span className={styles.alternativesLabel}>
            Alternatives:
          </span>

          {sku.alternatives.length > 0 ? (
            sku.alternatives.map((alt) => (
              <span key={alt} className={styles.alternativeTag}>
                {alt}
              </span>
            ))
          ) : (
            <span className={styles.noAlternative}>None found</span>
          )}
        </div>
      </div>

      <div className={styles.skuRight}>
        <span className={styles.skuDaysOnHand}>
          {sku.daysOnHand} Days On Hand
        </span>

        <span
          className={
            isAtRisk ? styles.skuStockout : styles.skuStockoutSafe
          }
        >
          {sku.stockoutDate}
        </span>
      </div>
    </div>
  );
}

export function SkuBackorderedContent({
  title,
  subtitle,
  data,
  disruptionReport,
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

      {disruptionReport?.isNationalShortage && (
        <div className={styles.shortageAlert}>
          <p className={styles.shortageAlertTitle}>
            FDA National Drug Shortage Active
          </p>

          <p className={styles.shortageAlertText}>
            {disruptionReport.medicationName
              ? `${disruptionReport.medicationName.charAt(0).toUpperCase()}${disruptionReport.medicationName.slice(1)}`
              : "This medication"}{" "}
            is on the FDA national drug shortage registry. Standard
            restocking channels are unreliable. Source an approved
            alternative or emergency allocation immediately.
          </p>
        </div>
      )}

      <div className={styles.section}>
        <ContentSectionLabel>
          OZAI INVENTORY RISK ASSESSMENT
        </ContentSectionLabel>

        <div className={styles.contentCard}>
          <div className={styles.vendorRow}>
            <span className={styles.vendorName}>{data.vendor}</span>
            <span className={styles.availableDate}>
              Available: {data.availableDate}
            </span>
          </div>

          <div className={styles.skuList}>
            {data.backordered.map((sku) => (
              <SkuRow key={sku.sku} sku={sku} />
            ))}
          </div>
        </div>

        <MiraInsightCard insight={data.miraInsight} />
      </div>

      <div className={styles.consequenceGrid}>
        <div className={styles.consequenceIgnored}>
          <p className={styles.consequenceLabel}>If Ignored</p>

          <div className={styles.consequenceItems}>
            {data.ifIgnored.consequences.map((item) => (
              <span key={item} className={styles.consequenceTag}>
                {item}
              </span>
            ))}
          </div>

          {data.ifIgnored.tags[0] ? (
            <p className={styles.consequenceText}>
              {data.ifIgnored.tags[0]}
            </p>
          ) : null}
        </div>

        <div className={styles.consequenceActioned}>
          <p className={styles.consequenceLabel}>If Actioned</p>

          {data.ifActioned.tags?.map((tag) => (
            <span key={tag} className={styles.consequenceTag}>
              {tag}
            </span>
          ))}

          <p className={styles.consequenceText}>
            {data.ifActioned.summary}
          </p>
        </div>
      </div>
    </ActionItemLayout>
  );
}
