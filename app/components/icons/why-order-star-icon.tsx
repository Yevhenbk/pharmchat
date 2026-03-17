import type { IconProps } from "./icon-props";

export function WhyOrderStarIcon({ className }: IconProps) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="7.5" cy="7.5" r="7.5" fill="var(--color-why-order-star-halo)" fillOpacity="0.22" />
      <g clipPath="url(#why-order-star-clip)">
        <path
          d="M5.89284 9.10716L1.875 7.5L5.89284 5.89284L7.5 1.875L9.10716 5.89284L13.125 7.5L9.10716 9.10716L7.5 13.125L5.89284 9.10716Z"
          fill="var(--color-mira-purple)"
        />
      </g>
      <defs>
        <clipPath id="why-order-star-clip">
          <rect
            width="12"
            height="12"
            fill="white"
            transform="translate(1.875 1.875)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
