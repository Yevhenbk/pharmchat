import { cn } from "@utilities/tailwind";

interface Props {
  label: string;
  value: string | number;
  children?: React.ReactNode;
  className?: string;
}

export function StatBlock({
  label,
  value,
  children,
  className,
}: Props) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-xs text-text-muted">{label}</span>
      <span className="text-sm font-medium text-text-primary">
        {value}
      </span>
      {children}
    </div>
  );
}
