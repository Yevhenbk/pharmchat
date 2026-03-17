import { DEFAULT_ICON_SIZE, type IconProps } from "./icon-props";

export function PartialFillIcon({
  size = DEFAULT_ICON_SIZE,
  className,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      fill="none"
      width={size}
      height={size}
      className={className}
    >
      <path
        d="M2 15 H28 V25 Q28 28 25 28 H5 Q2 28 2 25 Z"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <line
        x1="0.5"
        y1="15"
        x2="29.5"
        y2="15"
        stroke="currentColor"
        strokeWidth="0.75"
      />
    </svg>
  );
}
