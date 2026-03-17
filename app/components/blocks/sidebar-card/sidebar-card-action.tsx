import type { Severity } from "@models/action-item";
import { cn } from "@utilities/tailwind";
import styles from "./sidebar-card.module.scss";

interface Props {
  poNumber: string;
  typeLabel: string;
  severity: Severity;
  description: string;
  timeAgo?: string;
}

const SEVERITY_CLASS: Record<Severity, string> = {
  critical: styles.typeLabelCritical,
  warning: styles.typeLabelWarning,
  fyi: styles.typeLabelFyi,
};

export function SidebarCardAction({
  poNumber,
  typeLabel,
  severity,
  description,
  timeAgo,
}: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className={styles.actionHeader}>
        <span className={styles.poNumber}>{poNumber}</span>

        {timeAgo ? (
          <span className={styles.timeAgo}>{timeAgo}</span>
        ) : null}
      </div>

      <span className={cn(styles.typeLabel, SEVERITY_CLASS[severity])}>
        {typeLabel}
      </span>

      <p className={styles.actionDescription}>{description}</p>
    </div>
  );
}
