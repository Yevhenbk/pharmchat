import { cn } from "@utilities/tailwind";
import { StatusBadge } from "@components/ui/status-badge";
import styles from "./activity-item.module.scss";

interface Props {
  title: string;
  description?: string;
  status: "live" | "done";
  poNumber?: string;
  time?: string;
  className?: string;
}

export function ActivityItem({
  title,
  description,
  status,
  poNumber,
  time,
  className,
}: Props) {
  return (
    <div className={cn(styles.item, "animate-slide-up", className)}>
      <div className={styles.icon}>
        <div className="skeleton-shimmer size-8 rounded-md" />
      </div>

      <div className={styles.content}>
        <p className="text-sm font-normal text-text-primary">{title}</p>

        {description ? (
          <p className="mt-0.5 text-xs text-text-muted">{description}</p>
        ) : null}
      </div>

      <div className={styles.meta}>
        <StatusBadge variant={status} />

        {poNumber ? (
          <span className="text-2xs text-text-muted/60">{poNumber}</span>
        ) : null}

        {time ? (
          <span className="text-2xs text-text-muted/60">{time}</span>
        ) : null}
      </div>
    </div>
  );
}
