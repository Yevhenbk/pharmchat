"use client";

import { cn } from "@utilities/tailwind";
import styles from "./stagger-fade-in-wrapper.module.scss";

interface Props {
  children: React.ReactNode;
  className?: string;
  /** Delay between each child in ms. Default 120. */
  delayStep?: number;
}

const DEFAULT_DELAY_STEP = 120;

export function StaggerFadeInWrapper({
  children,
  className,
  delayStep = DEFAULT_DELAY_STEP,
}: Props) {
  const wrapperStyle: Record<string, string> & React.CSSProperties = {
    "--stagger-delay-step": `${delayStep}ms`,
  };

  return (
    <div
      className={cn(styles.wrapper, className)}
      style={wrapperStyle}
    >
      {children}
    </div>
  );
}
