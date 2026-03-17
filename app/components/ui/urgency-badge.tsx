import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utilities/tailwind";
import type { VendorUrgency } from "@models/procurement";

const urgencyBadgeVariants = cva(
  [
    "inline-flex items-center rounded-[2px] bg-[#FAF5F0] px-1.5 py-1",
    "font-sans text-2xs font-normal leading-none whitespace-nowrap",
  ],
  {
    variants: {
      urgency: {
        "out-of-stock": "text-critical",
        urgent: "text-warning",
      },
    },
  },
);

const URGENCY_LABELS: Record<VendorUrgency, string> = {
  "out-of-stock": "Out of stock",
  urgent: "Urgent",
};

interface Props
  extends VariantProps<typeof urgencyBadgeVariants> {
  urgency: VendorUrgency;
  className?: string;
}

export function UrgencyBadge({ urgency, className }: Props) {
  return (
    <span className={cn(urgencyBadgeVariants({ urgency }), className)}>
      {URGENCY_LABELS[urgency]}
    </span>
  );
}
