import styles from "./order-cancelled-content.module.scss";

interface Props {
  label: string;
  variant: "rejected" | "approved";
  items?: readonly string[];
  tags?: readonly string[];
}

export function ConsequencePanel({
  label,
  variant,
  items,
  tags,
}: Props) {
  const containerClassName =
    variant === "rejected"
      ? styles.consequenceRejected
      : styles.consequenceApproved;

  return (
    <div className={containerClassName}>
      <p className={styles.consequenceLabel}>{label}</p>

      {items ? (
        <div className={styles.consequenceItems}>
          {items.map((item) => (
            <span key={item} className={styles.consequenceTag}>
              {item}
            </span>
          ))}
        </div>
      ) : null}

      {tags && tags.length > 0 ? (
        <p className={styles.consequenceText}>{tags[0]}</p>
      ) : null}
    </div>
  );
}
