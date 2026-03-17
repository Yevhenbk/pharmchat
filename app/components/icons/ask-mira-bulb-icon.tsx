import type { SVGProps } from "react";

export function AskMiraBulbIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="232"
      height="232"
      viewBox="0 68 232 232"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <defs>
        <filter
          id="askMiraBulbBlurOuter"
          x="0"
          y="63.647"
          width="231.04"
          height="231.04"
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
          <feGaussianBlur
            stdDeviation="20"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id="askMiraBulbBlurInner"
          x="50.353"
          y="118"
          width="140"
          height="140"
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
          <feGaussianBlur
            stdDeviation="10"
            result="effect1_foregroundBlur"
          />
        </filter>
        <linearGradient
          id="askMiraBulbGradientOuter"
          x1="73.995"
          y1="161.047"
          x2="173.655"
          y2="245.607"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#c8d4a0" />
          <stop offset="0.889423" stopColor="#8fa05a" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient
          id="askMiraBulbGradientInner"
          x1="88.686"
          y1="160.333"
          x2="174.686"
          y2="253.833"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#dce8b4" />
          <stop offset="1" stopColor="#a8be6c" />
        </linearGradient>
      </defs>
      <g filter="url(#askMiraBulbBlurOuter)">
        <circle
          cx="115.52"
          cy="179.167"
          r="75.5"
          transform="rotate(21.8386 115.52 179.167)"
          fill="url(#askMiraBulbGradientOuter)"
          fillOpacity="0.6"
        />
      </g>
      <g filter="url(#askMiraBulbBlurInner)">
        <circle
          cx="120.353"
          cy="188"
          r="50"
          fill="url(#askMiraBulbGradientInner)"
          fillOpacity="0.65"
        />
      </g>
    </svg>
  );
}
