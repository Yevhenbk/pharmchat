"use client";

import { cn } from "@utilities/tailwind";
import type { VendorOrder } from "@models/procurement";
import { WhyOrderCard } from "@components/blocks/why-order-card/why-order-card";
import { getWhyOrderCardData } from "@demo/why-order-data";
import styles from "./sku-reasoning-sidebar.module.scss";

interface Props {
  open: boolean;
  onClose: () => void;
  skuId?: string | null;
  vendor?: VendorOrder;
  className?: string;
}

export function SKUReasoningSidebar({
  open,
  onClose,
  skuId,
  vendor,
  className,
}: Props) {
  if (!open) {
    return null;
  }

  const lineItem =
    skuId && vendor
      ? vendor.lineItems.find((item) => item.id === skuId)
      : undefined;
  const whyOrderData =
    lineItem && vendor
      ? getWhyOrderCardData({ lineItem, vendor })
      : undefined;

  if (!whyOrderData) {
    return null;
  }

  return (
    <div
      className={cn(
        styles.cardPlaceholder,
        "animate-slide-in-right",
        className,
      )}
      role="dialog"
      aria-label="Why order this item"
      onClick={onClose}
    >
      <div
        className={styles.cardInner}
        onClick={(event) => event.stopPropagation()}
        role="presentation"
      >
        <WhyOrderCard
          poNumber={whyOrderData.poNumber}
          skuLabel={whyOrderData.skuLabel}
          recommendation={whyOrderData.recommendation}
          sections={whyOrderData.sections}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
