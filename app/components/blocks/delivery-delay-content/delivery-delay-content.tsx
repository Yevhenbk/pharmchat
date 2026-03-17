import type { DeliveryDelayData, AffectedSKU } from "@models/action-content";
import { EmailMessage } from "@components/blocks/email-message/email-message";
import { ActionFooter } from "@components/blocks/action-footer/action-footer";
import { ActionItemLayout } from "@components/blocks/action-item-layout/action-item-layout";
import { ContentSectionLabel } from "@components/ui/content-section-label";
import styles from "./delivery-delay-content.module.scss";

interface Props {
  title: string;
  subtitle: string;
  data: DeliveryDelayData;
  onAcknowledge?: () => void;
}

function VendorImpactCard({
  vendor,
  originalEta,
  revisedEta,
  delayDuration,
  stockoutRisk,
}: {
  vendor: string;
  originalEta: string;
  revisedEta: string;
  delayDuration: string;
  stockoutRisk: string;
}) {
  return (
    <div className={styles.impactCard}>
      <p className={styles.impactVendor}>{vendor}</p>

      <div className={styles.impactStats}>
        <div className={styles.impactStat}>
          <span className={styles.impactStatLabel}>ETA</span>
          <span className={styles.etaStrikethrough}>{originalEta}</span>
          <span className={styles.impactStatValue}>{revisedEta}</span>
        </div>

        <div className={styles.impactStat}>
          <span className={styles.impactStatLabel}>
            DELAY DURATION
          </span>
          <span className={styles.impactStatValueWarning}>
            {delayDuration}
          </span>
        </div>

        <div className={styles.impactStat}>
          <span className={styles.impactStatLabel}>STOCKOUT RISK</span>
          <span className={styles.impactStatValueSuccess}>
            {stockoutRisk}
          </span>
        </div>
      </div>
    </div>
  );
}

function AffectedSKURow({ sku }: { sku: AffectedSKU }) {
  return (
    <div className={styles.skuRow}>
      <div className={styles.skuInfo}>
        <div className={styles.skuCodeRow}>
          <span className={styles.skuCode}>{sku.sku}</span>
          <span className={styles.skuDetails}>{sku.name}</span>
        </div>
        <span className={styles.skuOrdered}>{sku.orderedQuantity}</span>
      </div>

      <div className={styles.skuBuffer}>
        <span className={styles.skuDaysOnHand}>
          {sku.daysOnHand} Days On Hand
        </span>
        <span className={styles.skuSafeThrough}>
          {sku.safeThrough}
        </span>
      </div>
    </div>
  );
}

export function DeliveryDelayContent({
  title,
  subtitle,
  data,
  onAcknowledge,
}: Props) {
  return (
    <ActionItemLayout
      title={title}
      subtitle={subtitle}
      footer={
        <ActionFooter
          variant="acknowledge"
          acknowledgeLabel="Acknowledge Delay"
          onAcknowledge={onAcknowledge}
        />
      }
    >
      <EmailMessage data={data.email} />

      <div className={styles.section}>
        <ContentSectionLabel>
          OZAI INVENTORY IMPACT SUMMARY
        </ContentSectionLabel>

        <div className={styles.contentCard}>
          <VendorImpactCard
            vendor={data.vendor}
            originalEta={data.originalEta}
            revisedEta={data.revisedEta}
            delayDuration={data.delayDuration}
            stockoutRisk={data.stockoutRisk}
          />

          <p className={styles.cardSubLabel}>
            AFFECTED SKUS & CURRENT BUFFER
          </p>

          <div className={styles.skuList}>
            {data.affectedSkus.map((sku) => (
              <AffectedSKURow key={sku.sku + sku.name} sku={sku} />
            ))}
          </div>
        </div>
      </div>
    </ActionItemLayout>
  );
}
