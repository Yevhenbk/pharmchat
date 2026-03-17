import type { SVGProps } from "react";

export function ChatTextIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Corner brackets */}
        <path d="M2.75 7.5V5a2.25 2.25 0 0 1 2.25-2.25H7.5" />
        <path d="M2.75 14.5V17a2.25 2.25 0 0 0 2.25 2.25H7.5" />
        <path d="M14.5 2.75H17a2.25 2.25 0 0 1 2.25 2.25V7.5" />
        <path d="M14.5 19.25H17a2.25 2.25 0 0 0 2.25-2.25V14.5" />
        {/* T letter */}
        <path d="M7.25 7.15h7.5" />
        <path d="M11 7.15v7.7" />
        <path d="M9.5 14.85h3" />
      </g>
    </svg>
  );
}
