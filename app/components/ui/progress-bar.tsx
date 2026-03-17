import { cn } from "@utilities/tailwind";

interface Props {
  value: number;
  className?: string;
}

export function ProgressBar({ value, className }: Props) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "h-1 w-full overflow-hidden rounded-full bg-sidebar-bg",
        className,
      )}
    >
      <div
        className="h-full rounded-full bg-info transition-all duration-[var(--transition-base)]"
        style={{ width: `${clampedValue.toString()}%` }}
      />
    </div>
  );
}
