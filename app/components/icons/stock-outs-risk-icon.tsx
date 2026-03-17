import type { IconProps } from "./icon-props";

export function StockOutsRiskIcon({ className }: IconProps) {
  return (
    <svg
      width={7}
      height={8}
      viewBox="0 0 7 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.09277 2.30762L0.186523 4.04492V0.222656L6.09277 2.30762Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.185294"
      />
      <path
        d="M0.09375 4.16924V0.0927734L6.39375 2.3163L0.09375 4.16924ZM0.09375 4.16924V7.09277V4.16924Z"
        fill="currentColor"
      />
      <path
        d="M0.09375 4.16924V0.0927734L6.39375 2.3163L0.09375 4.16924ZM0.09375 4.16924V7.09277"
        stroke="currentColor"
        strokeWidth="0.185294"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
