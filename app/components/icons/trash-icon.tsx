import type { IconProps } from "./icon-props";

export function TrashIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 15 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1.59375 2.22949L2.76235 15.0841C2.822 15.7402 3.37216 16.2427 4.03104 16.2427H10.6218C11.2807 16.2427 11.8308 15.7402 11.8905 15.0841L13.0591 2.22949"
        stroke="currentColor"
        strokeWidth="0.636962"
        strokeLinecap="round"
      />
      <path
        d="M0.320312 2.22949L14.3335 2.22949"
        stroke="currentColor"
        strokeWidth="0.636962"
        strokeLinecap="round"
      />
      <line
        x1="5.89178"
        y1="0.477356"
        x2="8.75811"
        y2="0.477356"
        stroke="currentColor"
        strokeWidth="0.955443"
        strokeLinecap="round"
      />
    </svg>
  );
}
