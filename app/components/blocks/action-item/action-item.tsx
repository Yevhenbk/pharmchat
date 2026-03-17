"use client";

import { cva } from "class-variance-authority";
import { cn } from "@utilities/tailwind";
import type { ActionItemData } from "@models/action-item";
import { ActionButton } from "@components/ui/action-button";
import { ActionItemIcon } from "@components/ui/action-item-icon";
import { DismissibleItem } from "@components/animations/dismissible-item/dismissible-item";
import styles from "./action-item.module.scss";

const iconVariants = cva(styles.icon, {
  variants: {
    severity: {
      critical: styles["icon-critical"],
      warning: styles["icon-warning"],
      fyi: styles["icon-fyi"],
    },
  },
});

const titleVariants = cva(styles.title, {
  variants: {
    severity: {
      critical: styles["title-critical"],
      warning: styles["title-warning"],
      fyi: styles["title-fyi"],
    },
  },
});

interface Props {
  item: ActionItemData;
  onIgnore?: () => void;
  onActionClick?: () => void;
  className?: string;
}

export function ActionItem({
  item,
  onIgnore,
  onActionClick,
  className,
}: Props) {
  return (
    <DismissibleItem
      className={cn(styles.item, className)}
      dismissingClassName={styles.dismissing}
      onDismiss={onIgnore}
    >
      {({ dismiss }) => (
        <>
          <div className={styles["info-group"]}>
            <div className={iconVariants({ severity: item.severity })}>
              <ActionItemIcon type={item.type} size={22} />
            </div>

            <div className={styles.content}>
              <p className={titleVariants({ severity: item.severity })}>
                {item.title}
              </p>

              {item.description ? (
                <p className={styles.description}>{item.description}</p>
              ) : null}
            </div>
          </div>

          <div className={styles.actions}>
            {item.ignoreLabel ? (
              <ActionButton variant="ignore" onClick={dismiss}>
                {item.ignoreLabel}
              </ActionButton>
            ) : null}

            {item.actions.map((action) => (
              <ActionButton key={action.label} onClick={onActionClick}>
                {action.label}
              </ActionButton>
            ))}
          </div>
        </>
      )}
    </DismissibleItem>
  );
}
