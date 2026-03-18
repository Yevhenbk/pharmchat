import { cn } from "@utilities/tailwind";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function ContentSectionLabel({
  children,
  className,
}: Props) {
  return (
    <p
      className={cn(
        "text-xs font-bold tracking-wide text-text-primary",
        className,
      )}
    >
      {children}
    </p>
  );
}
