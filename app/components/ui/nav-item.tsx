"use client";

import { cn } from "@utilities/tailwind";

interface Props {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function NavItem({
  icon,
  label,
  active = false,
  onClick,
  className,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-1.5",
        "text-sm text-text-primary",
        "transition-all duration-[var(--transition-fast)]",
        "hover:bg-sidebar-bg/50",
        "focus-visible:ring-2 focus-visible:ring-info/40",
        "focus-visible:outline-none",
        active && "font-medium text-brand-green",
        className,
      )}
    >
      {icon ? <span className="size-4 shrink-0">{icon}</span> : null}
      <span>{label}</span>
    </button>
  );
}
