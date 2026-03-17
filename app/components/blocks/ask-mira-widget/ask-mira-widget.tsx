"use client";

import { useRef, useState } from "react";
import { cn } from "@utilities/tailwind";
import { ChatTextIcon } from "@components/icons/chat-text-icon";
import { AskMiraMicIcon } from "@components/icons/ask-mira-mic-icon";
import { AskMiraBulbIcon } from "@components/icons/ask-mira-bulb-icon";
import styles from "./ask-mira-widget.module.scss";

interface Props {
  className?: string;
  onClick?: (rect: DOMRect) => void;
}

export function AskMiraWidget({ className, onClick }: Props) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);

  const handleChatClick = () => {
    if (!onClick || !widgetRef.current) {
      return;
    }

    onClick(widgetRef.current.getBoundingClientRect());
  };

  const handleMicClick = () => {
    setIsListening((previous) => !previous);
  };

  return (
    <div ref={widgetRef} className={cn(styles.widget, className)}>
      <header className={styles.header}>
        <span className={styles.title}>Ask Mira</span>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.controlButton}
            aria-label="Chat"
            onClick={handleChatClick}
          >
            <ChatTextIcon className={styles.controlIcon} />
          </button>

          <button
            type="button"
            className={styles.controlButton}
            aria-label="Microphone"
            onClick={handleMicClick}
          >
            <AskMiraMicIcon className={styles.controlIcon} />
          </button>
        </div>
      </header>

      <div className={styles.canvas}>
        <AskMiraBulbIcon
          className={cn(styles.bulb, isListening && styles.bulbListening)}
        />
      </div>
    </div>
  );
}
