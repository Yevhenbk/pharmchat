"use client";

import { cn } from "@utilities/tailwind";

interface Props {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function ToggleSwitch({
  checked = false,
  onChange,
  className,
}: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer",
        "items-center rounded-full border border-border/40",
        "transition-colors duration-[var(--transition-base)]",
        "focus-visible:ring-2 focus-visible:ring-info/40",
        "focus-visible:outline-none",
        checked ? "bg-info" : "bg-sidebar-bg",
        className,
      )}
    >
      <span
        className={cn(
          "pointer-events-none block size-3.5 rounded-full bg-card-bg",
          "shadow-sm transition-transform duration-[var(--transition-base)]",
          checked ? "translate-x-[18px]" : "translate-x-[3px]",
        )}
      />
    </button>
  );
}
