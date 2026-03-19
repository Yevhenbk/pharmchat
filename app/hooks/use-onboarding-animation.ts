/**
 * Hook for managing onboarding animation state and autoplay
 */

import { useState, useEffect, useRef } from "react";
import {
  SEGMENTS,
  TOTAL_MS,
  MAX,
  BATCH,
  progMap,
} from "@/utilities/onboarding-timeline";

type OnboardingAnimationState = {
  pos: number;
  progress: number;
  autoPlayDone: boolean;
};

export function useOnboardingAnimation(): OnboardingAnimationState {
  const [pos, setPos] = useState(() =>
    new URLSearchParams(window.location.search).get("last") === "1" ? MAX : 0,
  );
  const [progress, setProgress] = useState(() =>
    new URLSearchParams(window.location.search).get("last") === "1" ? 100 : 0,
  );
  const [autoPlayDone, setAutoPlayDone] = useState(
    () =>
      new URLSearchParams(window.location.search).get("last") === "1",
  );
  const rafRef = useRef<number | null>(null);
  const touchY = useRef(0);

  // Lock body scroll while onboarding is visible
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Auto-advance via rAF — smooth 60fps with per-slide pauses
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("last") === "1") return;

    const start = performance.now();

    const calculateNextPos = (elapsedTime: number): number => {
      const result = SEGMENTS.reduce(
        (accumulator, seg) => {
          if (accumulator.found) return accumulator;

          const segmentEnd = accumulator.accumulated + seg.dur;

          if (elapsedTime <= segmentEnd) {
            const segmentProgress =
              (elapsedTime - accumulator.accumulated) / seg.dur;
            const position =
              seg.from + (seg.to - seg.from) * segmentProgress;

            return { found: true, position, accumulated: segmentEnd };
          }

          return { ...accumulator, accumulated: segmentEnd };
        },
        { found: false, position: 0, accumulated: 0 }
      );

      return result.position || MAX;
    };

    const tick = (now: number) => {
      const elapsedTime = now - start;
      const nextPos = Math.min(calculateNextPos(elapsedTime), MAX);
      const nextProgress = Math.min((elapsedTime / TOTAL_MS) * 100, 100);

      setPos(nextPos);
      setProgress(nextProgress);

      if (elapsedTime < TOTAL_MS) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setAutoPlayDone(true);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Manual scroll after autoplay ends
  useEffect(() => {
    if (!autoPlayDone) return;

    const onWheel = (event: WheelEvent) => {
      setPos((p) => {
        const next =
          event.deltaY > 0 ? Math.min(p + 1, MAX) : Math.max(p - 1, 0);
        setProgress(progMap(next));

        return next;
      });
    };

    const onTouchStart = (event: TouchEvent) => {
      touchY.current = event.touches[0].clientY;
    };

    const onTouchEnd = (event: TouchEvent) => {
      const d = touchY.current - event.changedTouches[0].clientY;

      if (Math.abs(d) > 20) {
        // Each swipe moves ~¼ of a slide for a natural feel on mobile
        const steps = Math.round(Math.min(Math.abs(d) / 8, BATCH / 2));
        setPos((p) => {
          const next =
            d > 0 ? Math.min(p + steps, MAX) : Math.max(p - steps, 0);
          setProgress(progMap(next));

          return next;
        });
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [autoPlayDone]);

  return {
    pos,
    progress,
    autoPlayDone,
  };
}
