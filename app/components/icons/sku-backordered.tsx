import { DEFAULT_ICON_SIZE, type IconProps } from "./icon-props";

export function SkuBackorderedIcon({
  size = DEFAULT_ICON_SIZE,
  className,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 15 12"
      fill="none"
      className={className}
    >
      <path
        d="M6.75 11.25L0.25 4.75M0.25 4.75V9.25M0.25 4.75H4.75M7.75 0.25L14.25 6.75M14.25 6.75V2.25M14.25 6.75H9.75"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
