/**
 * Animation transformation helpers
 * Ported from worksut SlidePropTypes.ts T namespace
 */

export const AnimationTransforms = {
  /**
   * Slides from `initial` vh down to 0 as `by` goes 0→1
   */
  y: (initial: number, by: number, batch: number, sleeper = 0) =>
    by + sleeper > 1 ? 0 : initial - (by + sleeper) * batch,

  /**
   * Slides from `initial` vh right to 0 as `by` goes 0→1
   */
  x: (initial: number, by: number, batch: number, sleeper = 0) =>
    by + sleeper > 1 ? 0 : initial + (by + sleeper) * batch,

  /**
   * Opacity fades 0→1 as `by` goes 0→1
   */
  opacity: (by: number) => by,

  /**
   * Scales from max*max down to min; snaps to min after by > 0.8
   */
  scale: (max: number, by: number, min: number) =>
    by > 0.8 ? min : max - by * max,
};
