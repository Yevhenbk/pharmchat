import type { UpcomingRiskItem } from "@models/upcoming-risk";

interface Props {
  item: UpcomingRiskItem;
  className?: string;
}

export function RiskItem({ item, className }: Props) {
  return (
    <div className={className}>
      <p className="text-xs font-normal leading-[1] text-text-primary">
        <span className="font-semibold">{item.sku}</span> {item.productName}
      </p>
      <p className="mt-1 text-xs font-light leading-[1] text-text-muted-secondary">
        {item.description}
      </p>
    </div>
  );
}
