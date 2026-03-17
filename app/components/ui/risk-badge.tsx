import { cn } from "@utilities/tailwind";

const RISK_BADGE_CLASSES = [
  "inline-flex items-center rounded-full px-2 py-1",
  "text-2xs font-normal leading-none whitespace-nowrap",
  "bg-[#f3f4f6] text-[var(--color-text-primary)]",
];

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function RiskBadge({ children, className }: Props) {
  return (
    <span className={cn(RISK_BADGE_CLASSES, className)}>
      {children}
    </span>
  );
}
