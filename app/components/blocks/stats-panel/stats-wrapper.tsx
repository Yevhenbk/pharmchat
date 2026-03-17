import { cn } from "@utilities/tailwind";
import styles from "./stats-panel.module.scss";

interface Props {
  children: React.ReactNode;
  footerIcon: React.ReactNode;
  footerLabel: React.ReactNode;
  className?: string;
}

export function StatsWrapper({
  children,
  footerIcon,
  footerLabel,
  className,
}: Props) {
  return (
    <div className={cn(styles.outerWrapper, className)}>
      <div className={styles.innerWrapper}>
        <div className={styles.card}>
          {children}

          <div className={styles.glance}>
            <span className="flex size-5 shrink-0 items-center justify-center text-icon-stats">
              {footerIcon}
            </span>

            <span className="relative bottom-0 text-center text-base font-normal leading-none text-text-primary">
              {footerLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
