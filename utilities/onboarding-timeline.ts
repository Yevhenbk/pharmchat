/**
 * Onboarding animation timeline and scroll calculations
 * Ported from worksut app.main.tsx
 */

export const BATCH = 30; // steps per slide
export const MAX = 91; // total steps (3 slides × 30 + 1 for last slide)

export const SLIDE_MS = BATCH * 70; // ~2100 ms per slide
export const PAUSE_MS = 2800; // pause at end of each slide
export const S4_END = BATCH * 3 - 0.001; // Slide 4 stops here

export type TimelineSegment = {
  readonly from: number;
  readonly to: number;
  readonly dur: number;
};

/**
 * Timeline segments for auto-play animation
 * Each segment: { from, to } are pos values; dur is ms for that segment
 */
export const SEGMENTS: readonly TimelineSegment[] = [
  { from: 0, to: BATCH, dur: SLIDE_MS },
  { from: BATCH, to: BATCH, dur: PAUSE_MS },
  { from: BATCH, to: BATCH * 2, dur: SLIDE_MS },
  { from: BATCH * 2, to: BATCH * 2, dur: PAUSE_MS },
  { from: BATCH * 2, to: S4_END, dur: SLIDE_MS }, // slide 4 animates in
  { from: S4_END, to: S4_END, dur: 4200 }, // long pause: crosslines visible
  { from: BATCH * 3, to: BATCH * 3, dur: PAUSE_MS }, // rests on sign-in slide
] as const;

export const TOTAL_MS = SEGMENTS.reduce((s, seg) => s + seg.dur, 0);

// Loop-only timeline: slides 1–3, restarts after the crossline pause
export const LOOP_SEGMENTS = SEGMENTS.slice(0, 6) as TimelineSegment[];
export const LOOP_MS = LOOP_SEGMENTS.reduce((s, seg) => s + seg.dur, 0);

/**
 * Fractional position within the current slide (0→1).
 * At exact slide boundaries (pos=30,60,90) the modulo wraps to 0 —
 * return 1 instead so content stays fully visible during the pause.
 */
export const posMap = (p: number): number => {
  const floor = Math.floor(p / BATCH);
  const frac = p / BATCH - floor;

  return floor > 0 && frac < 1e-9 ? 1 : frac;
};

/**
 * Overall progress percentage (0→100)
 */
export const progMap = (p: number) => Math.min((p * 100) / MAX, 100);
