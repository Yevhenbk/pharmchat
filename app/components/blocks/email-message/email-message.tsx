import { cn } from "@utilities/tailwind";
import type { EmailData } from "@models/action-content";
import { EmailField } from "./email-field";
import styles from "./email-message.module.scss";

interface Props {
  data: EmailData;
  className?: string;
}

export function EmailMessage({ data, className }: Props) {
  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.fieldsGrid}>
        <div className={styles.fieldColumn}>
          <EmailField label="From" value={data.from} />
          <EmailField label="Subject" value={data.subject} />
        </div>

        {data.to && data.date ? (
          <div className={styles.fieldColumn}>
            {data.to ? <EmailField label="To" value={data.to} /> : null}
            {data.date ? <EmailField label="Date" value={data.date} /> : null}
          </div>
        ) : null}

        {data.cc ? (
          <div className={styles.fieldColumn}>
            <EmailField label="CC" value={data.cc} />
          </div>
        ) : null}
      </div>

      <div className={styles.divider} />

      <div className={styles.body}>
        {data.body.split("\n\n").map((paragraph, index) => (
          <p key={`p-${index.toString()}`}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
