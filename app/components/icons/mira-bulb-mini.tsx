import type { SVGProps } from "react";

export function MiraBulbMini(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 32.35 32.35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <defs>
        <filter
          id="miniBulbBlurOuter"
          x="0"
          y="0"
          width="32.35"
          height="32.35"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur stdDeviation="3.58" result="blur" />
        </filter>
        <filter
          id="miniBulbBlurInner"
          x="7.92"
          y="8.63"
          width="20.21"
          height="20.21"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur stdDeviation="2.39" result="blur" />
        </filter>
        <linearGradient
          id="miniBulbGradOuter"
          x1="5.84"
          y1="9.69"
          x2="24.18"
          y2="20.47"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#c8d4a0" />
          <stop offset="0.889" stopColor="#8fa05a" />
        </linearGradient>
        <linearGradient
          id="miniBulbGradInner"
          x1="13"
          y1="15.42"
          x2="24.52"
          y2="26.06"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#dce8b4" />
          <stop offset="0.5" stopColor="#a8be6c" />
          <stop offset="1" stopColor="#8fa05a" />
        </linearGradient>
      </defs>
      <g filter="url(#miniBulbBlurOuter)">
        <circle
          cx="16.18"
          cy="16.18"
          r="9.01"
          transform="rotate(21.84 16.18 16.18)"
          fill="url(#miniBulbGradOuter)"
          fillOpacity="0.5"
        />
      </g>
      <g filter="url(#miniBulbBlurInner)">
        <circle
          cx="18.03"
          cy="18.74"
          r="5.33"
          transform="rotate(18.36 18.03 18.74)"
          fill="url(#miniBulbGradInner)"
        />
      </g>
    </svg>
  );
}
