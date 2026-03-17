"use client";

import { useState } from "react";
import { cn } from "@utilities/tailwind";

interface DismissibleItemRenderProps {
  dismiss: () => void;
}

interface Props {
  className?: string;
  dismissingClassName?: string;
  onDismiss?: () => void;
  shouldDismiss?: boolean;
  children: (controls: DismissibleItemRenderProps) => React.ReactNode;
}

export function DismissibleItem({
  className,
  dismissingClassName,
  onDismiss,
  shouldDismiss,
  children,
}: Props) {
  const [dismissing, setDismissing] = useState(false);

  const handleDismiss = () => {
    setDismissing(true);
  };

  const handleDismissEnd = (
    event: React.TransitionEvent<HTMLDivElement> | React.AnimationEvent<HTMLDivElement>,
  ) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (dismissing || shouldDismiss) {
      onDismiss?.();
    }
  };

  const isDismissing = dismissing || shouldDismiss;

  return (
    <div
      className={cn(className, isDismissing && dismissingClassName)}
      onTransitionEnd={handleDismissEnd}
      onAnimationEnd={handleDismissEnd}
    >
      {children({ dismiss: handleDismiss })}
    </div>
  );
}
