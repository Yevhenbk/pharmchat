import type { IconProps } from "./icon-props";

export function TodaysPosCubeIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
    >
      <g filter="url(#filter0_d_1_16430)">
        <rect
          x="0.836195"
          y="0.753187"
          width="29.9917"
          height="29.9917"
          rx="2.49396"
          fill="var(--color-input-bg)"
          stroke="var(--color-border)"
          strokeWidth="0.00832708"
        />
      </g>
      <path
        d="M16.3557 14.9371L9.21037 10.8435M16.3557 14.9371V23.1241M16.3557 14.9371L19.9288 12.8907M9.21037 10.8435C9.4583 10.4179 9.81392 10.065 10.2415 9.82038L12.5941 8.47239M9.21037 10.8435C8.96697 11.2613 8.83243 11.7419 8.83243 12.242V17.6322C8.8327 18.1242 8.96321 18.6075 9.21069 19.0328C9.45817 19.4581 9.81381 19.8104 10.2415 20.0537L14.9466 22.7497C15.3756 22.9953 15.8614 23.1244 16.3557 23.1241M16.3557 23.1241C16.85 23.1244 17.3358 22.9953 17.7647 22.7497L22.4698 20.0537C23.3417 19.5546 23.8789 18.6323 23.8789 17.6322V12.242C23.879 11.7507 23.7489 11.2682 23.5019 10.8435M19.9288 12.8907L23.5019 10.8435M19.9288 12.8907L12.5941 8.47239M12.5941 8.47239L14.9466 7.1244C15.3755 6.87844 15.8613 6.74902 16.3557 6.74902C16.8501 6.74902 17.3359 6.87844 17.7647 7.1244L22.4698 9.82038C22.8977 10.0649 23.2537 10.4178 23.5019 10.8435"
        stroke="#5D6FF1"
        strokeWidth="0.379323"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="filter0_d_1_16430"
          x="-0.000676692"
          y="-0.000413708"
          width="31.6654"
          height="31.6654"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.0832708" />
          <feGaussianBlur stdDeviation="0.416354" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.364706 0 0 0 0 0.435294 0 0 0 0 0.945098 0 0 0 0.31 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1_16430"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_16430"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
