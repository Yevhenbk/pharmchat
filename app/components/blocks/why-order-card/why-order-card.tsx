import { cn } from "@utilities/tailwind";
import { WhyOrderStarIcon } from "@components/icons/why-order-star-icon";
import { WhyOrderPackageIcon } from "@components/icons/why-order-package-icon";
import { WhyOrderSectionCard } from "@components/ui/why-order-section-card";
import { CloseIcon } from "@components/icons/close-icon";

interface WhyOrderSection {
  id: string;
  icon: React.ReactNode;
  iconClassName?: string;
  title: string;
  body: React.ReactNode;
}

interface Props {
  poNumber: string;
  skuLabel: string;
  recommendation: string;
  sections: ReadonlyArray<WhyOrderSection>;
  onClose?: () => void;
  className?: string;
}

export function WhyOrderCard({
  poNumber,
  skuLabel,
  recommendation,
  sections,
  onClose,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex h-full min-h-0 w-full max-w-[413px] flex-col border border-text-muted bg-card-bg p-5",
        "rounded-tl-[20px] rounded-tr-[11px] rounded-br-[11px] rounded-bl-[20px]",
        className,
      )}
    >
      <header className="mb-4 flex shrink-0 flex-col gap-3">
        <div className="flex items-center gap-2">
          <WhyOrderStarIcon />
          <span className="bg-[linear-gradient(90deg,var(--color-mira-purple)_0%,var(--color-mira-secondary)_64.42%)] bg-clip-text text-xl font-medium leading-snug text-transparent">
            Why order this Item?
          </span>

          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="ml-auto flex size-7 shrink-0 cursor-pointer items-center justify-center rounded border-none bg-transparent text-[var(--color-text-muted)] transition-all hover:bg-[color-mix(in_srgb,var(--color-border)_12%,transparent)] hover:text-[var(--color-text-primary)]"
            >
              <CloseIcon />
            </button>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex items-center gap-1">
            <span className="-scale-x-100 inline-block">
              <WhyOrderPackageIcon />
            </span>
            <span className="truncate text-sm font-medium leading-4 text-text-muted-secondary">
              {poNumber}
            </span>
          </div>

          <div className="truncate text-base font-normal leading-[17px] text-text-primary">
            {skuLabel}
          </div>

          <p className="text-base font-bold leading-[17px] text-text-primary">
            {recommendation}
          </p>
        </div>
      </header>

      <div className="h-px w-full shrink-0 bg-text-muted" />

      <div className="mt-2 flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto pt-4">
        {sections.map((section) => (
          <WhyOrderSectionCard
            key={section.id}
            icon={section.icon}
            iconClassName={section.iconClassName}
            title={section.title}
            body={section.body}
          />
        ))}
      </div>
    </div>
  );
}
