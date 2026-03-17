import { DEFAULT_ICON_SIZE, type IconProps } from "./icon-props";

export function NotConfirmedIcon({
  size = DEFAULT_ICON_SIZE,
  className,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 14 13"
      fill="none"
      className={className}
    >
      <path
        d="M6.68713 7.32143V5.67011V4.01879M1.37979 12.2754H11.9945C12.8289 12.2754 13.3596 11.3837 12.9627 10.6499L7.65535 0.852114C7.23867 0.0831496 6.13559 0.0831496 5.7189 0.852114L0.412114 10.6499C0.0141464 11.3837 0.545321 12.2754 1.37979 12.2754Z"
        stroke="currentColor"
        strokeWidth="0.55044"
        strokeLinecap="round"
      />
    </svg>
  );
}
