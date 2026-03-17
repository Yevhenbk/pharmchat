import type { IconProps } from "./icon-props";

export function OutOfStockIcon({ className }: IconProps) {
  return (
    <svg
      width={9}
      height={9}
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.49888 7.92843C5.4082 7.92843 6.28027 7.56721 6.92325 6.92423C7.56623 6.28125 7.92746 5.40917 7.92746 4.49986C7.92746 3.59055 7.56623 2.71848 6.92325 2.07549C6.28027 1.43251 5.4082 1.07129 4.49888 1.07129C3.58957 1.07129 2.7175 1.43251 2.07452 2.07549C1.43154 2.71848 1.07031 3.59055 1.07031 4.49986C1.07031 5.40917 1.43154 6.28125 2.07452 6.92423C2.7175 7.56721 3.58957 7.92843 4.49888 7.92843Z"
        stroke="currentColor"
        strokeWidth="0.428571"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.42857 3.85714C3.66526 3.85714 3.85714 3.66526 3.85714 3.42857C3.85714 3.19188 3.66526 3 3.42857 3C3.19188 3 3 3.19188 3 3.42857C3 3.66526 3.19188 3.85714 3.42857 3.85714Z"
        fill="currentColor"
      />
      <path
        d="M5.5692 3.85714C5.80589 3.85714 5.99777 3.66526 5.99777 3.42857C5.99777 3.19188 5.80589 3 5.5692 3C5.3325 3 5.14062 3.19188 5.14062 3.42857C5.14062 3.66526 5.3325 3.85714 5.5692 3.85714Z"
        fill="currentColor"
      />
      <path
        d="M3.21484 5.78585C3.47313 5.21443 3.9017 4.92871 4.50056 4.92871C5.39884 4.92871 5.52784 5.21457 5.78627 5.78585"
        stroke="currentColor"
        strokeWidth="0.428571"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
