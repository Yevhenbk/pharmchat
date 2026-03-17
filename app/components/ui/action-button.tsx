"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utilities/tailwind";

const actionButtonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-lg px-3 py-1.5",
    "text-[13px] font-medium leading-none whitespace-nowrap",
    "transition-colors duration-[120ms]",
    "cursor-pointer",
    "active:scale-[0.97]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[#eef2e6]",
          "text-[#3a5c10]",
          "hover:bg-[#e2ead4]",
          "focus-visible:ring-[#3a5c10]/30",
        ],
        ignore: [
          "bg-transparent",
          "text-[#94a3b8]",
          "hover:text-[#475569]",
          "hover:bg-[#f8fafc]",
          "focus-visible:ring-slate-300",
        ],
        outline: [
          "bg-[#f8fafc]",
          "text-[#475569]",
          "border border-[#e2e8f0]",
          "hover:bg-[#f1f5f9]",
          "hover:border-[#cbd5e1]",
          "focus-visible:ring-slate-300",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

interface Props extends VariantProps<typeof actionButtonVariants> {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
}

export function ActionButton({
  variant,
  children,
  onClick,
  className,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(actionButtonVariants({ variant }), className)}
    >
      {children}
    </button>
  );
}
