import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utilities/tailwind";

const sectionLabelVariants = cva(
  "text-[11px] font-600 uppercase tracking-[0.07em] leading-none",
  {
    variants: {
      variant: {
        critical: "text-[#9e4545]",
        warning: "text-[#b45309]",
        fyi: "text-[#3a5c10]",
        "todays-pos": "text-[#64748b]",
      },
    },
  },
);

interface Props extends VariantProps<typeof sectionLabelVariants> {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ variant, children, className }: Props) {
  return (
    <p className={cn(sectionLabelVariants({ variant }), className)}>
      {children}
    </p>
  );
}
