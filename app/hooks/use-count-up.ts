"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_DURATION = 1200;

interface UseCountUpOptions {
  target: number;
  duration?: number;
  delay?: number;
}

export function useCountUp({
  target,
  duration = DEFAULT_DURATION,
  delay = 0,
}: UseCountUpOptions): number {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(
    undefined,
  );
  const currentRef = useRef(0);

  useEffect(() => {
    currentRef.current = current;
  });

  useEffect(() => {
    const startAnimation = () => {
      const startValue = currentRef.current;
      const range = target - startValue;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        const nextValue = startValue + eased * range;

        if (progress >= 1) {
          setCurrent(target);

          return;
        }

        setCurrent(nextValue);
        rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    };

    if (delay > 0) {
      timerRef.current = setTimeout(startAnimation, delay);
    }

    if (delay <= 0) {
      startAnimation();
    }

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay]);

  return current;
}
