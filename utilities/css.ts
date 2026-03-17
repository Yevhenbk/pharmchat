/**
 * Type-safe wrapper for passing CSS custom properties to React's style prop.
 * React.CSSProperties doesn't include custom properties (--*), so this
 * function bridges the gap without using `as` type assertions.
 */
export function cssCustomProperties(
  properties: Record<string, string>,
): React.CSSProperties {
  return properties as React.CSSProperties;
}
