"use client";

import { useState, useCallback } from "react";

import { cn } from "@utilities/tailwind";
import type { ModalState, ModalMode } from "@models/modal";
import { MODAL_TITLES } from "@models/modal";
import { ModalBlurWrapper } from "@components/blocks/modal-blur-wrapper/modal-blur-wrapper";
import { CloseIcon } from "@components/icons/close-icon";
import styles from "./deck-modal.module.scss";

interface Props {
  state: ModalState;
  onClose: () => void;
  hideCloseButton?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function DeckModal({
  state,
  onClose,
  hideCloseButton,
  children,
  className,
}: Props) {
  const [isClosing, setIsClosing] = useState(false);
  const [lastMode, setLastMode] = useState<ModalMode | null>(null);

  const isOpen = state.mode !== "closed";

  if (isOpen && state.mode !== lastMode) {
    setLastMode(state.mode);
  }

  const handleClose = useCallback(() => {
    setIsClosing(true);
  }, []);

  const handleAnimationEnd = useCallback(() => {
    if (isClosing) {
      setIsClosing(false);
      onClose();
    }
  }, [isClosing, onClose]);

  if (!isOpen && !isClosing) {
    return null;
  }

  const mode = isOpen ? state.mode : lastMode;

  return (
    <div
      className={cn(styles.overlay, isClosing && styles.overlayClosing)}
      onClick={handleClose}
      role="presentation"
    >
      <ModalBlurWrapper>
        <div
          className={cn(
            styles.modal,
            isClosing ? "animate-modal-close" : "animate-modal-open",
            className,
          )}
          onClick={(event) => event.stopPropagation()}
          onAnimationEnd={handleAnimationEnd}
          role="dialog"
          aria-modal="true"
          aria-label={mode ? MODAL_TITLES[mode] : undefined}
        >
          {!hideCloseButton ? (
            <button
              type="button"
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="Close modal"
            >
              <CloseIcon />
            </button>
          ) : null}

          <div className={styles.body}>{children}</div>
        </div>
      </ModalBlurWrapper>
    </div>
  );
}
