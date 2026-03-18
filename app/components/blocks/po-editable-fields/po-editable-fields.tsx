"use client";

import { WhyOrderStarIcon } from "@components/icons/why-order-star-icon";
import styles from "./po-editable-fields.module.scss";

interface Props {
  poNumber: string;
  leadTimeEta: string;
  leadTimeDays: number;
  onPoNumberChange: (value: string) => void;
  onLeadTimeEtaChange: (value: string) => void;
  onLeadTimeDaysChange: (value: number) => void;
}

export function POEditableFields({
  poNumber,
  leadTimeEta,
  leadTimeDays,
  onPoNumberChange,
  onLeadTimeEtaChange,
  onLeadTimeDaysChange,
}: Props) {
  const handleLeadTimeDaysChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const parsed = parseInt(event.target.value, 10);

    if (!Number.isNaN(parsed) && parsed > 0) {
      onLeadTimeDaysChange(parsed);
    }
  };

  return (
    <div className={styles.wrapper}>
      <WhyOrderStarIcon className={styles.miraIcon} />

      <div className={styles.fields}>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>PO NUMBER</span>
          <input
            type="text"
            className={styles.fieldInput}
            value={poNumber}
            onChange={(event) => onPoNumberChange(event.target.value)}
            aria-label="PO Number"
          />
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>REQUESTED ETA</span>
          <input
            type="text"
            className={styles.fieldInput}
            value={leadTimeEta}
            onChange={(event) => onLeadTimeEtaChange(event.target.value)}
            aria-label="Requested ETA"
          />
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>LEAD DAYS</span>
          <input
            type="number"
            className={styles.fieldInput}
            value={leadTimeDays}
            min={1}
            onChange={handleLeadTimeDaysChange}
            aria-label="Lead days"
          />
        </div>
      </div>
    </div>
  );
}
