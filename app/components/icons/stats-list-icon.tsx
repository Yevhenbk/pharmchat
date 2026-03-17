import type { SVGProps } from "react";

export function StatsListIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.199219 4.2002C0.199219 2.3147 0.199219 1.3717 0.785219 0.786195C1.37122 0.200695 2.31372 0.200195 4.19922 0.200195H5.19922C7.08472 0.200195 8.02772 0.200195 8.61322 0.786195C9.19872 1.3722 9.19922 2.3147 9.19922 4.2002V6.2002C9.19922 8.0857 9.19922 9.02869 8.61322 9.61419C8.02722 10.1997 7.08472 10.2002 5.19922 10.2002H4.19922C2.31372 10.2002 1.37072 10.2002 0.785219 9.61419C0.199719 9.02819 0.199219 8.0857 0.199219 6.2002V4.2002Z"
        stroke="currentColor"
        strokeWidth="0.4"
      />
      <path
        d="M2.69922 4.2002H6.69922M2.69922 6.2002H5.19922"
        stroke="currentColor"
        strokeWidth="0.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
