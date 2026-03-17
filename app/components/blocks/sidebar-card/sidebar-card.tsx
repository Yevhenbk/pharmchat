import { cn } from "@utilities/tailwind";
import { DismissibleItem } from "@components/animations/dismissible-item/dismissible-item";
import styles from "./sidebar-card.module.scss";

interface Props {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  shouldDismiss?: boolean;
  onDismiss?: () => void;
  disabled?: boolean;
}

export function SidebarCard({
  selected,
  onClick,
  children,
  className,
  shouldDismiss,
  onDismiss,
  disabled,
}: Props) {
  return (
    <DismissibleItem
      className={styles.cardWrapper}
      dismissingClassName={styles.cardWrapperDismissing}
      shouldDismiss={shouldDismiss}
      onDismiss={onDismiss}
    >
      {() => (
        <button
          type="button"
          onClick={disabled ? undefined : onClick}
          disabled={disabled}
          className={cn(
            styles.card,
            disabled && styles.cardDisabled,
            selected && styles.cardSelected,
            className,
          )}
        >
          {children}
        </button>
      )}
    </DismissibleItem>
  );
}
