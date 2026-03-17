import styles from "./action-item-layout.module.scss";

interface Props {
  title: string;
  subtitle: string;
  footer: React.ReactNode;
  children: React.ReactNode;
}

export function ActionItemLayout({
  title,
  subtitle,
  footer,
  children,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <hr className={styles.headerDivider} />

      <div className={styles.body}>{children}</div>

      {footer}
    </div>
  );
}
