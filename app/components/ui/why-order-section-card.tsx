import { cn } from "@utilities/tailwind";

interface Props {
  icon: React.ReactNode;
  iconClassName?: string;
  title: string;
  body: React.ReactNode;
}

export function WhyOrderSectionCard({
  icon,
  iconClassName,
  title,
  body,
}: Props) {
  return (
    <div className="flex gap-3">
      <div
        className={cn(
          "flex size-[54px] shrink-0 items-center justify-center rounded-[12px] text-icon-stats",
          iconClassName,
        )}
      >
        {icon}
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-sm font-medium leading-snug text-mira-secondary">
          {title}
        </span>
        <div className="text-sm font-normal leading-snug text-text-muted [&_ul]:list-disc [&_ul]:list-outside [&_ul]:pl-4">
          {body}
        </div>
      </div>
    </div>
  );
}
