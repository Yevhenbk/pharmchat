/**
 * Hook for managing onboarding animation state and autoplay
 */

import { useState, useEffect, useRef } from "react";
import {
  SEGMENTS,
  LOOP_SEGMENTS,
  TOTAL_MS,
  LOOP_MS,
  MAX,
  S4_END,
  BATCH,
  progMap,
  type TimelineSegment,
} from "@/utilities/onboarding-timeline";

type OnboardingAnimationState = {
  pos: number;
  progress: number;
  autoPlayDone: boolean;
};

function calcPos(
  elapsedTime: number,
  segs: readonly TimelineSegment[],
  maxPos: number,
): number {
  const result = segs.reduce(
    (accumulator, seg) => {
      if (accumulator.found) return accumulator;

      const segEnd = accumulator.accumulated + seg.dur;

      if (elapsedTime <= segEnd) {
        const t = (elapsedTime - accumulator.accumulated) / seg.dur;

        return {
          found: true,
          position: seg.from + (seg.to - seg.from) * t,
          accumulated: segEnd,
        };
      }

      return { ...accumulator, accumulated: segEnd };
    },
    { found: false, position: 0, accumulated: 0 },
  );

  return result.position || maxPos;
}

export function useOnboardingAnimation(
  options: { loop?: boolean } = {},
): OnboardingAnimationState {
  const { loop = false } = options;

  const isLastSlide =
    !loop &&
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("last") === "1";

  const [pos, setPos] = useState(() => (isLastSlide ? MAX : 0));
  const [progress, setProgress] = useState(() => (isLastSlide ? 100 : 0));
  const [autoPlayDone, setAutoPlayDone] = useState(() => isLastSlide);
  const rafRef = useRef<number | null>(null);
  const touchY = useRef(0);

  // Lock body scroll while onboarding is visible
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Auto-advance via rAF
  useEffect(() => {
    if (!loop && new URLSearchParams(window.location.search).get("last") === "1") return;

    const start = performance.now();
    const activeSegments = loop ? LOOP_SEGMENTS : SEGMENTS;
    const activeTotalMs = loop ? LOOP_MS : TOTAL_MS;
    const activeMax = loop ? S4_END : MAX;

    const tick = (now: number) => {
      const elapsed = now - start;
      const effectiveElapsed = loop ? elapsed % activeTotalMs : elapsed;
      const nextPos = Math.min(calcPos(effectiveElapsed, activeSegments, activeMax), activeMax);
      const nextProgress = Math.min((effectiveElapsed / activeTotalMs) * 100, 100);

      setPos(nextPos);
      setProgress(nextProgress);

      if (loop || elapsed < TOTAL_MS) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setAutoPlayDone(true);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loop]);

  // Manual scroll after autoplay ends (non-loop mode only)
  useEffect(() => {
    if (loop || !autoPlayDone) return;

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
  }, [autoPlayDone, loop]);

  return { pos, progress, autoPlayDone };
}
