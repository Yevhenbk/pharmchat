export function MiraSparkleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle
        cx="9"
        cy="9"
        r="9"
        fill="var(--mira-sparkle-bg, #BFDBFE)"
        fillOpacity="0.22"
      />
      <g clipPath="url(#mira-sparkle-clip)">
        <path
          d="M7.07141 10.9286L2.25 9L7.07141 7.07141L9 2.25L10.9286 7.07141L15.75 9L10.9286 10.9286L9 15.75L7.07141 10.9286Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="mira-sparkle-clip">
          <rect
            width="14.4"
            height="14.4"
            fill="white"
            transform="translate(2.25 2.25)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
