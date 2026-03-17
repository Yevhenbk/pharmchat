import { DEFAULT_ICON_SIZE, type IconProps } from "./icon-props";

export function OrderCancelledIcon({
  size = DEFAULT_ICON_SIZE,
  className,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <circle
        cx="8"
        cy="8"
        r="7.78947"
        stroke="currentColor"
        strokeWidth="0.421053"
      />
      <line
        x1="2.37848"
        y1="13.3248"
        x2="13.3258"
        y2="2.3774"
        stroke="currentColor"
        strokeWidth="0.421053"
      />
    </svg>
  );
}
