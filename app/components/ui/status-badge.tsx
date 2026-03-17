import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utilities/tailwind";

const statusBadgeVariants = cva(
  [
    "inline-block text-2xs font-normal uppercase tracking-wide",
    "transition-opacity duration-[var(--transition-fast)]",
  ],
  {
    variants: {
      variant: {
        live: "text-live animate-pulse-live",
        done: "text-success/40",
      },
    },
  }
);

interface Props extends VariantProps<typeof statusBadgeVariants> {
  className?: string;
}

export function StatusBadge({ variant, className }: Props) {
  return (
    <span className={cn(statusBadgeVariants({ variant }), className)}>
      {variant === "live" ? "LIVE" : "DONE"}
    </span>
  );
}
