import { cn } from "@utilities/tailwind";

interface Props {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
  className?: string;
}

export function StatRow({ icon, label, value, className }: Props) {
  return (
    <div className={cn("flex items-center gap-3 py-2.5", className)}>
      {icon ? (
        <span className="flex size-[18px] shrink-0 items-center justify-center text-[#94a3b8]">
          {icon}
        </span>
      ) : null}

      <div className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
        <span className="truncate text-[13px] font-normal text-[#64748b]">
          {label}
        </span>
        <span className="shrink-0 text-[18px] font-600 text-[#1e293b] tabular-nums">
          {value}
        </span>
      </div>
    </div>
  );
}
