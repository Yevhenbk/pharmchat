"use client";

import { useEffect, useRef } from "react";
import styles from "./delete-item-modal.module.scss";

interface Props {
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteItemModal({
  itemName,
  onConfirm,
  onCancel,
}: Props) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelButtonRef.current?.focus();
  }, []);

  return (
    <div
      className={styles.dialog}
      onClick={(event) => event.stopPropagation()}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-item-header"
      aria-describedby="delete-item-subheader"
    >
      <p id="delete-item-header" className={styles.header}>
        Delete {itemName}
      </p>

      <p id="delete-item-subheader" className={styles.subheader}>
        Are you sure you want to delete {itemName}?
      </p>

      <div className={styles.actions}>
        <button
          ref={cancelButtonRef}
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="button"
          className={styles.deleteButton}
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
