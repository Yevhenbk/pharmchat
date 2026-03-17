import { DEFAULT_ICON_SIZE, type IconProps } from "./icon-props";

export function ArrivingEarlyIcon({
  size = DEFAULT_ICON_SIZE,
  className,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 17 17"
      fill="none"
      className={className}
    >
      <circle
        cx="8.5"
        cy="8.5"
        r="8.2875"
        stroke="currentColor"
        strokeWidth="0.425"
      />
      <path
        d="M4.24805 9.51953H12.748C13.133 9.51953 13.4175 9.82811 13.3604 10.168C13.1914 11.1719 12.7137 12.1066 11.9844 12.8359C11.0598 13.7604 9.80547 14.2793 8.49805 14.2793C7.19081 14.2792 5.93713 13.7602 5.0127 12.8359C4.28333 12.1066 3.80571 11.1719 3.63672 10.168C3.57956 9.82822 3.86333 9.51974 4.24805 9.51953Z"
        stroke="currentColor"
        strokeWidth="0.34"
      />
      <circle
        cx="5.73906"
        cy="4.8875"
        r="0.631125"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.01275"
      />
      <circle
        cx="11.6883"
        cy="4.8875"
        r="0.631125"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.01275"
      />
    </svg>
  );
}
