import type { PriceIncreaseData, PriceIncreaseSKU } from "@models/action-content";
import { FormatService } from "@services/format";
import { ActionFooter } from "@components/blocks/action-footer/action-footer";
import { ActionItemLayout } from "@components/blocks/action-item-layout/action-item-layout";
import { ContentSectionLabel } from "@components/ui/content-section-label";
import { MiraInsightCard } from "@components/ui/mira-insight-card";

import styles from "./price-increase-content.module.scss";

interface Props {
  title: string;
  subtitle: string;
  data: PriceIncreaseData;
  onApprove?: () => void;
  onReject?: () => void;
}

function SkuPriceRow({ sku }: { sku: PriceIncreaseSKU }) {
  const monthlyImpact =
    (sku.newUnitPrice - sku.previousUnitPrice) * sku.monthlyUnits;

  return (
    <div className={styles.skuRow}>
      <div className={styles.skuHeader}>
        <span className={styles.skuCode}>{sku.sku}</span>
        <span className={styles.skuName}>{sku.name}</span>
      </div>

      <div className={styles.priceStats}>
        <div className={styles.priceStat}>
          <span className={styles.priceStatLabel}>Previous</span>
          <span className={styles.priceStatValueStrikethrough}>
            {FormatService.currency(sku.previousUnitPrice)}
          </span>
        </div>

        <div className={styles.priceStat}>
          <span className={styles.priceStatLabel}>New Price</span>
          <span className={styles.priceStatValue}>
            {FormatService.currency(sku.newUnitPrice)}
          </span>
        </div>

        <div className={styles.priceStat}>
          <span className={styles.priceStatLabel}>Increase</span>
          <span className={styles.priceStatValueWarning}>
            +{sku.percentageIncrease}%
          </span>
        </div>

        <div className={styles.priceStat}>
          <span className={styles.priceStatLabel}>Monthly Impact</span>
          <span className={styles.priceStatValueWarning}>
            +{FormatService.currency(monthlyImpact)}
          </span>
          <span className={styles.monthlyImpact}>
            {sku.monthlyUnits} units/mo
          </span>
        </div>
      </div>
    </div>
  );
}

export function PriceIncreaseContent({
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
      <div className={styles.section}>
        <ContentSectionLabel>
          OZAI PRICING IMPACT ANALYSIS
        </ContentSectionLabel>

        <div className={styles.contentCard}>
          <div className={styles.vendorRow}>
            <span className={styles.vendorName}>{data.vendor}</span>
            <span className={styles.effectiveDate}>
              Effective {data.effectiveDate}
            </span>
          </div>

          <div className={styles.skuList}>
            {data.skus.map((sku) => (
              <SkuPriceRow key={sku.sku} sku={sku} />
            ))}
          </div>

          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>
              Total Monthly Cost Increase
            </span>
            <span className={styles.totalValue}>
              +{FormatService.currency(data.totalMonthlyImpact)}/mo
            </span>
          </div>
        </div>

        <MiraInsightCard insight={data.miraInsight} />
      </div>

      <div className={styles.consequenceGrid}>
        <div className={styles.consequenceRejected}>
          <p className={styles.consequenceLabel}>If Rejected</p>
          <p className={styles.consequenceText}>
            Initiate re-negotiation or switch to an alternative supplier
            at current contract pricing. Supply continuity risk is low
            for this SKU.
          </p>
        </div>

        <div className={styles.consequenceAccepted}>
          <p className={styles.consequenceLabel}>If Accepted</p>
          <p className={styles.consequenceText}>
            +{FormatService.currency(data.totalMonthlyImpact)}/mo
            added to operating cost. No disruption to supply.
          </p>
        </div>
      </div>
    </ActionItemLayout>
  );
}
