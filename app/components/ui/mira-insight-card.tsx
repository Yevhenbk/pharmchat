import { MiraBulbMini } from "@components/icons/mira-bulb-mini";

import styles from "./mira-insight-card.module.scss";

interface Props {
  insight: string;
  isAnalyzing?: boolean;
}

export function MiraInsightCard({ insight, isAnalyzing = false }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <MiraBulbMini className={styles.icon} />
        <span className={styles.label}>Mira Insight</span>
      </div>

      {isAnalyzing ? (
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="skeleton-shimmer h-3 w-full rounded" />
          <div className="skeleton-shimmer h-3 w-4/5 rounded" />
        </div>
      ) : (
        <p className={styles.text}>{insight}</p>
      )}
    </div>
  );
}
