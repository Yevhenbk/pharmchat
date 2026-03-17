import type {
  DisruptionReport,
  OrderCancelledData,
} from "@models/action-content";
import { EmailMessage } from "@components/blocks/email-message/email-message";
import { ActionFooter } from "@components/blocks/action-footer/action-footer";
import { ActionItemLayout } from "@components/blocks/action-item-layout/action-item-layout";
import { ContentSectionLabel } from "@components/ui/content-section-label";

import { OrderSnapshotCard } from "./order-snapshot-card";
import { ConsequencePanel } from "./consequence-panel";
import styles from "./order-cancelled-content.module.scss";

interface Props {
  title: string;
  subtitle: string;
  data: OrderCancelledData;
  disruptionReport?: DisruptionReport;
  onApprove?: () => void;
  onReject?: () => void;
}

function buildRecommendationLabel(
  disruptionReport: DisruptionReport | undefined,
): string {
  if (!disruptionReport) {
    return "OZAI RECOMMENDATION: REPLACE ORDER";
  }

  return `OZAI RECOMMENDATION: ${disruptionReport.recommendedAction.toUpperCase()}`;
}

export function OrderCancelledContent({
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
            is currently listed on the FDA national drug shortage
            registry. Restocking from any standard supply chain
            may fail. Source an approved alternative immediately.
          </p>
        </div>
      )}

      {data.isDosageChange && data.clinicalWarning && (
        <div className={styles.clinicalAlert}>
          <p className={styles.clinicalAlertText}>
            {data.clinicalWarning}
          </p>
        </div>
      )}

      <div className={styles.section}>
        <ContentSectionLabel>
          {buildRecommendationLabel(disruptionReport)}
        </ContentSectionLabel>

        <div className={styles.comparisonGrid}>
          <OrderSnapshotCard
            label="ORIGINAL ORDER"
            order={data.originalOrder}
          />

          <OrderSnapshotCard
            label="PROPOSED REPLACEMENT"
            order={data.proposedReplacement}
            variant="highlight"
            costDelta={data.costDelta}
            leadTimeDelta={data.leadTimeDelta}
          />
        </div>
      </div>

      <div className={styles.consequenceGrid}>
        <ConsequencePanel
          label="If Rejected"
          variant="rejected"
          items={data.ifRejected.consequences}
          tags={data.ifRejected.tags}
        />

        <ConsequencePanel
          label="If Approved"
          variant="approved"
          items={data.ifApproved.tags}
          tags={[data.ifApproved.summary]}
        />
      </div>
    </ActionItemLayout>
  );
}
