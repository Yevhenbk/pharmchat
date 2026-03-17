import styles from "./email-message.module.scss";

interface Props {
  label: string;
  value: string;
}

export function EmailField({ label, value }: Props) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}:</span>
      <span className={styles.fieldValue}>{value}</span>
    </div>
  );
}

