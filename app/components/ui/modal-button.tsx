"use client";

import { cva } from "class-variance-authority";
import { cn } from "@utilities/tailwind";

type ModalButtonVariant = "approve" | "reject" | "acknowledge";

interface Props {
  variant: ModalButtonVariant;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const modalButton = cva(
  "cursor-pointer border-0 rounded-md px-6 py-[10px] font-sans text-base font-normal text-card-bg transition-all duration-[150ms]",
  {
    variants: {
      variant: {
        approve: "bg-mira-olive hover:opacity-90",
        acknowledge: "bg-mira-olive hover:opacity-90",
        reject: "bg-critical hover:bg-critical/80",
      },
    },
  },
);

export function ModalButton({
  variant,
  onClick,
  children,
  className,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(modalButton({ variant }), className)}
    >
      {children}
    </button>
  );
}
