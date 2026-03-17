"use client";

import type {
  LiveEmailData,
  LiveEmailAnalysis,
} from "@models/action-content";
import { MiraInsightCard } from "@components/ui/mira-insight-card";
import { ActionFooter } from "@components/blocks/action-footer/action-footer";
import styles from "./live-email-content.module.scss";

// ── Helpers ───────────────────────────────────────────────

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/\s+on\w+="[^"]*"/gi, "")
    .replace(/\s+on\w+='[^']*'/gi, "");
}

interface Props {
  title: string;
  subtitle: string;
  data: LiveEmailData;
  isAnalyzing?: boolean;
  analysisFailed?: boolean;
  onRetryAnalysis?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  onAcknowledge?: () => void;
}

// ── Section components ────────────────────────────────────

function OrderDetailsCard({
  analysis,
  isAnalyzing,
}: {
  analysis: LiveEmailAnalysis | undefined;
  isAnalyzing: boolean;
}) {
  const allFields = [
    { label: "Vendor", value: analysis?.orderDetails.vendor },
    { label: "SKU(s)", value: analysis?.orderDetails.skus },
    { label: "Quantity", value: analysis?.orderDetails.quantity },
    { label: "Value", value: analysis?.orderDetails.value },
    { label: "Date", value: analysis?.orderDetails.date },
    { label: "PO Ref", value: analysis?.orderDetails.poRef },
  ];

  const visibleFields = analysis
    ? allFields.filter(({ value }) => value && value !== "—")
    : allFields;

  return (
    <div className={styles.placeholderCard}>
      <p className={styles.placeholderLabel}>Order Details</p>
      <div className={styles.placeholderGrid}>
        {visibleFields.map(({ label, value }) => (
          <div key={label} className={styles.placeholderField}>
            <span className={styles.placeholderFieldLabel}>{label}</span>
            {value && value !== "—" ? (
              <span className={styles.fieldValue}>{value}</span>
            ) : isAnalyzing ? (
              <div className="skeleton-shimmer mt-1 h-3.5 w-3/4 rounded" />
            ) : (
              <span className={styles.placeholderFieldValue}>
                Awaiting AI parse
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ImpactAnalysisCard({
  analysis,
  isAnalyzing,
}: {
  analysis: LiveEmailAnalysis | undefined;
  isAnalyzing: boolean;
}) {
  const allChips = [
    { label: "Stockout Risk", value: analysis?.impactAnalysis.stockoutRisk },
    {
      label: "Financial Exposure",
      value: analysis?.impactAnalysis.financialExposure,
    },
    { label: "Rx at Risk", value: analysis?.impactAnalysis.rxAtRisk },
    {
      label: "Shortage Listed",
      value: analysis?.impactAnalysis.shortageListed,
    },
  ];

  const visibleChips = analysis
    ? allChips.filter(
        ({ value }) => value && value !== "—" && value !== "Unknown",
      )
    : allChips;

  return (
    <div className={styles.placeholderCard}>
      <p className={styles.placeholderLabel}>Impact Analysis</p>
      <div className={styles.impactChips}>
        {visibleChips.map(({ label, value }) => (
          <div key={label} className={styles.impactChip}>
            <span className={styles.impactChipLabel}>{label}</span>
            {value && value !== "—" && value !== "Unknown" ? (
              <span className={styles.fieldValue}>{value}</span>
            ) : isAnalyzing ? (
              <div className="skeleton-shimmer mt-1 h-3.5 w-2/3 rounded" />
            ) : (
              <span className={styles.impactChipValue}>Pending</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendedActionsCard({
  analysis,
  isAnalyzing,
}: {
  analysis: LiveEmailAnalysis | undefined;
  isAnalyzing: boolean;
}) {
  if (isAnalyzing) {
    return (
      <div className={styles.placeholderCard}>
        <p className={styles.placeholderLabel}>Recommended Actions</p>
        <div className={styles.actionsList}>
          {[1, 2, 3].map((n) => (
            <div key={n} className={styles.actionItem}>
              <span className={styles.actionNumber}>{n}</span>
              <div className="skeleton-shimmer h-3.5 w-full rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!analysis?.recommendedActions.length) {
    return null;
  }

  return (
    <div className={styles.placeholderCard}>
      <p className={styles.placeholderLabel}>Recommended Actions</p>
      <div className={styles.actionsList}>
        {analysis.recommendedActions.map((action, index) => (
          <div key={index} className={styles.actionItem}>
            <span className={styles.actionNumber}>{index + 1}</span>
            <span className={styles.actionLabel}>{action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsequencePanels({
  analysis,
  isAnalyzing,
}: {
  analysis: LiveEmailAnalysis | undefined;
  isAnalyzing: boolean;
}) {
  return (
    <div className={styles.consequenceGrid}>
      <div className={styles.consequenceIgnored}>
        <p className={styles.consequenceLabel}>If Ignored</p>
        {analysis?.ifIgnored ? (
          <p className={styles.consequenceText}>{analysis.ifIgnored}</p>
        ) : isAnalyzing ? (
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="skeleton-shimmer h-3 w-full rounded" />
            <div className="skeleton-shimmer h-3 w-4/5 rounded" />
          </div>
        ) : (
          <p className={styles.consequencePlaceholder}>
            AI will describe the consequences of taking no action.
          </p>
        )}
      </div>
      <div className={styles.consequenceActioned}>
        <p className={styles.consequenceLabel}>If Actioned</p>
        {analysis?.ifActioned ? (
          <p className={styles.consequenceText}>{analysis.ifActioned}</p>
        ) : isAnalyzing ? (
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="skeleton-shimmer h-3 w-full rounded" />
            <div className="skeleton-shimmer h-3 w-3/5 rounded" />
          </div>
        ) : (
          <p className={styles.consequencePlaceholder}>
            AI will describe the outcome of following the recommendation.
          </p>
        )}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────

export function LiveEmailContent({
  title,
  subtitle,
  data,
  isAnalyzing = false,
  analysisFailed = false,
  onRetryAnalysis,
  onApprove,
  onReject,
  onAcknowledge,
}: Props) {
  const { email, miraInsight, footerVariant, analysis } = data;

  const effectiveMiraInsight = analysis?.miraInsight || miraInsight;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.emailCard}>
        <div className={styles.emailMeta}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>From</span>
            <span className={styles.metaValue}>{email.from}</span>
          </div>

          {email.to ? (
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>To</span>
              <span className={styles.metaValue}>{email.to}</span>
            </div>
          ) : null}

          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Subject</span>
            <span className={styles.metaValueSubject}>{email.subject}</span>
          </div>

          {email.date ? (
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Date</span>
              <span className={styles.metaValue}>{email.date}</span>
            </div>
          ) : null}
        </div>

        {email.bodyHtml ? (
          <iframe
            className={styles.emailFrame}
            srcDoc={sanitizeHtml(email.bodyHtml)}
            sandbox="allow-popups"
            title="Email body"
          />
        ) : (
          <div className={styles.emailBody}>
            {email.body
              .split("\n")
              .filter((line) => line.trim())
              .map((line, index) => (
                <p key={index} className={styles.emailLine}>
                  {line}
                </p>
              ))}
          </div>
        )}
      </div>

      {analysisFailed && !analysis ? (
        <div className={styles.placeholderCard}>
          <p className={styles.placeholderLabel}>Analysis</p>
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#94a3b8]">
              Gemini analysis failed — Mira could not reach the AI service.
            </p>
            {onRetryAnalysis ? (
              <button
                type="button"
                onClick={onRetryAnalysis}
                className="ml-4 shrink-0 rounded-md border border-[#cbd5e1] px-3 py-1.5 text-xs font-500 text-[#475569] transition-colors hover:bg-[#f8fafc]"
              >
                Retry
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      <OrderDetailsCard analysis={analysis} isAnalyzing={isAnalyzing} />

      <ImpactAnalysisCard analysis={analysis} isAnalyzing={isAnalyzing} />

      <RecommendedActionsCard analysis={analysis} isAnalyzing={isAnalyzing} />

      <MiraInsightCard
        insight={effectiveMiraInsight}
        isAnalyzing={isAnalyzing && !analysis?.miraInsight}
      />

      <ConsequencePanels analysis={analysis} isAnalyzing={isAnalyzing} />

      {footerVariant === "approve-reject" ? (
        <ActionFooter
          variant="approve-reject"
          onApprove={onApprove}
          onReject={onReject}
        />
      ) : (
        <ActionFooter
          variant="acknowledge"
          acknowledgeLabel="Acknowledge"
          onAcknowledge={onAcknowledge}
        />
      )}
    </div>
  );
}
