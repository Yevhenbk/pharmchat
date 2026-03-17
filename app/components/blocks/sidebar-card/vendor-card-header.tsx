import type { VendorUrgency } from "@models/procurement";
import { UrgencyBadge } from "@components/ui/urgency-badge";
import styles from "./sidebar-card.module.scss";

interface Props {
  name: string;
  urgency?: VendorUrgency;
}

export function VendorCardHeader({
  name,
  urgency,
}: Props) {
  return (
    <div className={styles.header}>
      <span className={styles.name}>{name}</span>

      {urgency ? <UrgencyBadge urgency={urgency} /> : null}
    </div>
  );
}
