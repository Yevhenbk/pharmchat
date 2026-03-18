"use client";

import { useEffect, useRef } from "react";
import { cn } from "@utilities/tailwind";
import { ChatTextIcon } from "@components/icons/chat-text-icon";
import { AskMiraBulbIcon } from "@components/icons/ask-mira-bulb-icon";
import styles from "./ask-mira-widget.module.scss";

const IDLE_ORBIT_SPEED = 40;
const HOVER_ORBIT_SPEED = 138;
const SPEED_LERP = 0.08;

interface Props {
  className?: string;
  onClick?: (rect: DOMRect) => void;
}

export function AskMiraWidget({ className, onClick }: Props) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const orbitAngleRef = useRef(0);
  const orbitSpeedRef = useRef(IDLE_ORBIT_SPEED);
  const targetOrbitSpeedRef = useRef(IDLE_ORBIT_SPEED);

  useEffect(() => {
    const step = (timestamp: number) => {
      const lastTimestamp = lastTimestampRef.current ?? timestamp;
      const deltaSeconds = (timestamp - lastTimestamp) / 1000;

      lastTimestampRef.current = timestamp;

      orbitSpeedRef.current +=
        (targetOrbitSpeedRef.current - orbitSpeedRef.current) * SPEED_LERP;
      orbitAngleRef.current =
        (orbitAngleRef.current + orbitSpeedRef.current * deltaSeconds) % 360;

      widgetRef.current?.style.setProperty(
        "--bulb-orbit-angle",
        `${orbitAngleRef.current}deg`,
      );

      animationFrameRef.current = window.requestAnimationFrame(step);
    };

    animationFrameRef.current = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleChatClick = () => {
    if (!onClick || !widgetRef.current) {
      return;
    }

    onClick(widgetRef.current.getBoundingClientRect());
  };

  const handleMouseEnter = () => {
    targetOrbitSpeedRef.current = HOVER_ORBIT_SPEED;
  };

  const handleMouseLeave = () => {
    targetOrbitSpeedRef.current = IDLE_ORBIT_SPEED;
  };

  return (
    <div
      ref={widgetRef}
      className={cn(styles.widget, className)}
      onClick={handleChatClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
