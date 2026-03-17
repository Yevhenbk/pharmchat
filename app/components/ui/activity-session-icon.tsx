import { cn } from "@utilities/tailwind";
import { cssCustomProperties } from "@utilities/css";
import { ActivityCallIcon } from "@components/icons/activity-call-icon";
import { ActivityEmailIcon } from "@components/icons/activity-email-icon";
import { ActivityXIcon } from "@components/icons/activity-x-icon";
import type { ActivityCardVariant } from "@components/ui/activity-card";
import styles from "./activity-session-icon.module.scss";

export type ActivityIconType = "call" | "email" | "x";

const ICON_COLORS: Record<ActivityIconType, string> = {
  call: "var(--color-success)",
  x: "var(--color-success)",
  email: "var(--color-email)",
};

const ICON_COLORS_TRANSPARENT: Record<ActivityIconType, string> = {
  call: "rgb(85 159 50 / 0)",
  x: "rgb(85 159 50 / 0)",
  email: "rgb(37 99 235 / 0)",
};

const ACTIVE_BG_COLORS: Record<ActivityIconType, string> = {
  call: "var(--color-success-subtle)",
  x: "var(--color-success-subtle)",
  email: "color-mix(in srgb, var(--color-email) 8%, white)",
};

interface Props {
  icon: ActivityIconType;
  variant?: ActivityCardVariant;
  className?: string;
}

export function ActivitySessionIcon({
  icon,
  variant = "queued",
  className,
}: Props) {
  const isActive = variant === "active";
  const color = isActive
    ? ICON_COLORS[icon]
    : "var(--color-text-primary)";

  return (
    <div
      className={cn(
        "shrink-0",
        isActive && styles.travelingBorder,
        className,
      )}
      style={
        isActive
          ? cssCustomProperties({
              "--travel-color": color,
              "--travel-color-0": ICON_COLORS_TRANSPARENT[icon],
            })
          : undefined
      }
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-xl"
        style={{
          border: isActive ? "none" : `0.5px solid ${color}`,
          backgroundColor: isActive ? ACTIVE_BG_COLORS[icon] : "white",
          color,
          transition:
            "border-color 700ms ease-in-out, background-color 700ms ease-in-out, color 700ms ease-in-out",
        }}
      >
        {icon === "email" ? (
          <ActivityEmailIcon className="h-4 w-4" />
        ) : icon === "x" ? (
          <ActivityXIcon className="h-[18px] w-[18px]" />
        ) : (
          <ActivityCallIcon className="h-3.5 w-3.5" />
        )}
      </div>
    </div>
  );
}
