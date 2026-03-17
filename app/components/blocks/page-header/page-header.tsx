import { cn } from "@utilities/tailwind";
import styles from "./page-header.module.scss";

interface Props {
  className?: string;
}

export function PageHeader({ className }: Props) {
  return (
    <header className={cn(styles.header, className)}>
      <div className={styles["header-content"]}>
        <div
          className={cn(styles["header-text"], styles["animate-header-text"])}
        >
          <h1 className={styles["header-title"]}>Action required</h1>
          <p className={styles["header-subtitle"]}>
            Hi Sam! Here&apos;s what needs your attention
          </p>
        </div>
      </div>
      <div className={styles.divider} />
    </header>
  );
}
