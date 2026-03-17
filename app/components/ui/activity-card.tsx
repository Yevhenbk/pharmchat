import { cn } from "@utilities/tailwind";
import {
  ActivitySessionIcon,
  type ActivityIconType,
} from "@components/ui/activity-session-icon";

export type ActivityCardVariant = "active" | "next" | "queued";

interface Props {
  title: string;
  description: string;
  icon?: ActivityIconType;
  poNumber: string;
  placedAt: string;
  variant?: ActivityCardVariant;
  className?: string;
}

export function ActivityCard({
  title,
  description,
  icon = "call",
  poNumber,
  placedAt,
  variant = "queued",
  className,
}: Props) {
  const isActive = variant === "active";

  return (
    <div
      className={cn(
        "flex items-center gap-4 transition-opacity duration-700 ease-in-out",
        !isActive && "opacity-35",
        className,
      )}
    >
      <ActivitySessionIcon icon={icon} variant={variant} />

      <div className="flex min-w-0 flex-1 items-center justify-between gap-6">
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13.5px] font-normal leading-snug text-[#1e293b]">
            <span className="text-[#94a3b8] pr-1.5 text-[12.5px]">
              PO #{poNumber}
            </span>
            {title}
          </div>

          <div className="mt-0.5 truncate text-[12px] text-[#94a3b8]">
            {description}
          </div>
        </div>

        <span className="shrink-0 text-[11px] text-[#94a3b8]/70 tabular-nums">
          {placedAt}
        </span>
      </div>
    </div>
  );
}
