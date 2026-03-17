import type { ActionItemType } from "@models/action-item";

import type { IconProps } from "@components/icons/icon-props";
import { OrderCancelledIcon } from "@components/icons/order-cancelled";
import { DelayedIcon } from "@components/icons/delayed";
import { PartialFillIcon } from "@components/icons/partial-fill";
import { SkuBackorderedIcon } from "@components/icons/sku-backordered";
import { NotConfirmedIcon } from "@components/icons/not-confirmed";
import { PriceIncreaseIcon } from "@components/icons/price-increase";
import { PriceDecreaseIcon } from "@components/icons/price-decrease";
import { ArrivingEarlyIcon } from "@components/icons/arriving-early";
import { SparkleIcon } from "@components/icons/sparkle-icon";

const ICONS: Record<ActionItemType, React.FC<IconProps>> = {
  "order-cancelled": OrderCancelledIcon,
  "delayed": DelayedIcon,
  "partial-fill": PartialFillIcon,
  "sku-backordered": SkuBackorderedIcon,
  "not-confirmed": NotConfirmedIcon,
  "price-increase": PriceIncreaseIcon,
  "price-decrease": PriceDecreaseIcon,
  "arriving-early": ArrivingEarlyIcon,
  "demand-surge": SparkleIcon,
};

interface Props {
  type: ActionItemType;
  size?: number;
  className?: string;
}

export function ActionItemIcon({
  type,
  size,
  className,
}: Props) {
  const Icon = ICONS[type];

  return <Icon size={size} className={className} />;
}
