"use client";

import { useRef } from "react";
import { cn } from "@utilities/tailwind";
import { ChatTextIcon } from "@components/icons/chat-text-icon";
import { AskMiraBulbIcon } from "@components/icons/ask-mira-bulb-icon";
import styles from "./ask-mira-widget.module.scss";

interface Props {
  className?: string;
  onClick?: (rect: DOMRect) => void;
}

export function AskMiraWidget({ className, onClick }: Props) {
  const widgetRef = useRef<HTMLDivElement>(null);

  const handleChatClick = () => {
    if (!onClick || !widgetRef.current) {
      return;
    }

    onClick(widgetRef.current.getBoundingClientRect());
  };

  return (
    <div ref={widgetRef} className={cn(styles.widget, className)} onClick={handleChatClick}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.controlButton}
          aria-label="Chat"
          onClick={handleChatClick}
        >
          <ChatTextIcon className={styles.controlIcon} />
          <span className={styles.title}>Ask Mira</span>
        </button>
      </header>

      <div className={styles.canvas}>
        <AskMiraBulbIcon className={styles.bulb} />
      </div>
    </div>
  );
}
