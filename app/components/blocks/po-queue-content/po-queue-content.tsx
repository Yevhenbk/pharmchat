"use client";

import { useState } from "react";

import { cn } from "@utilities/tailwind";
import type { VendorOrder, SKULineItem } from "@models/procurement";
import { FormatService } from "@services/format";
import { useInventoryStore } from "@stores/inventory-store";
import { useGlanceStore } from "@stores/glance-store";
import { useDashboardStore } from "@providers/store-provider";
import { API_ROUTES } from "@/app/constants/api";
import { POSummaryBar } from "@components/blocks/po-summary-bar/po-summary-bar";
import { POEditableFields } from "@components/blocks/po-editable-fields/po-editable-fields";
import { DemandSignalsPanel } from "@components/blocks/demand-signals-panel/demand-signals-panel";
import { RiskFactorsPanel } from "@components/blocks/risk-factors-panel/risk-factors-panel";
import { SKUTable } from "@components/blocks/sku-table/sku-table";
import { DeleteItemModal } from "@components/blocks/delete-item-modal/delete-item-modal";
import { POConfirmPopover } from "@components/blocks/po-confirm-popover/po-confirm-popover";
import { StaggerFadeInWrapper } from "@components/animations/stagger-fade-in-wrapper/stagger-fade-in-wrapper";
import { ContentSectionLabel } from "@components/ui/content-section-label";

import styles from "./po-queue-content.module.scss";

interface Props {
  vendor: VendorOrder;
  onSKUInfoClick?: (skuId: string) => void;
  onDeleteModalOpenChange?: (open: boolean) => void;
  onNextVendor?: () => void;
}

export function POQueueContent({
  vendor,
  onSKUInfoClick,
  onDeleteModalOpenChange,
  onNextVendor,
}: Props) {
  const inventoryOverrides = useInventoryStore((state) => state.overrides);
  const setInventory = useInventoryStore((state) => state.setInventory);
  const logActivity = useDashboardStore((state) => state.logActivity);
  const incrementSentPoCount = useGlanceStore(
    (state) => state.incrementSentPoCount,
  );

  const [lineItems, setLineItems] = useState<readonly SKULineItem[]>(() =>
    vendor.lineItems.map((item) => ({
      ...item,
      currentInventory:
        inventoryOverrides[item.skuCode] ?? item.currentInventory,
    })),
  );
  const [poNumber, setPoNumber] = useState(vendor.poSummary.poNumber);
  const [leadTimeEta, setLeadTimeEta] = useState(vendor.poSummary.leadTimeEta);
  const [leadTimeDays, setLeadTimeDays] = useState(
    vendor.poSummary.leadTimeDays,
  );
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleInventoryChange = (itemId: string, inventory: number) => {
    const target = lineItems.find((item) => item.id === itemId);

    if (target) {
      setInventory(target.skuCode, inventory);
    }

    setLineItems((previous) =>
      previous.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        return { ...item, currentInventory: inventory };
      }),
    );
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setLineItems((previous) =>
      previous.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        return {
          ...item,
          recommendedQuantity: quantity,
          orderValue: item.unitPrice * quantity,
        };
      }),
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setLineItems((previous) =>
      previous.filter((item) => item.id !== itemId),
    );
  };

  const handleTrashClick = (itemId: string) => {
    setPendingDeleteId(itemId);
    onDeleteModalOpenChange?.(true);
  };

  const handleDeleteConfirm = () => {
    if (pendingDeleteId) {
      handleRemoveItem(pendingDeleteId);
    }

    setPendingDeleteId(null);
    onDeleteModalOpenChange?.(false);
  };

  const handleDeleteCancel = () => {
    setPendingDeleteId(null);
    onDeleteModalOpenChange?.(false);
  };

  const handleInfoClick = (itemId: string) => {
    onSKUInfoClick?.(itemId);
  };

  const overriddenVendor: VendorOrder = {
    ...vendor,
    poSummary: {
      ...vendor.poSummary,
      poNumber,
      leadTimeEta,
      leadTimeDays,
    },
  };

  const handleConfirm = () => {
    setIsConfirming(true);
    incrementSentPoCount();

    logActivity({
      title: `PO sent to ${overriddenVendor.vendorName}`,
      description: `${lineItems.length} item${lineItems.length === 1 ? "" : "s"} — ${FormatService.currency(totalValue)}`,
      icon: "email",
      poNumber: poNumber.replace(/^PO-/i, ""),
    });

    fetch(API_ROUTES.SEND_PO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vendor: overriddenVendor, lineItems }),
    }).catch((error) => {
      console.error("[POQueueContent] Failed to send PO email:", error);
    });
  };

  const totalValue = lineItems.reduce(
    (total, item) => total + item.orderValue,
    0,
  );

  return (
    <div className={styles.container}>
      <div
        className={cn(
          styles.scrollArea,
          pendingDeleteId && styles.scrollAreaBlurred,
        )}
      >
        <StaggerFadeInWrapper className={styles.staggerContent}>
          <h3 className={styles.vendorName}>{vendor.vendorName}</h3>

          <POSummaryBar summary={vendor.poSummary} />

          <POEditableFields
            poNumber={poNumber}
            leadTimeEta={leadTimeEta}
            leadTimeDays={leadTimeDays}
            onPoNumberChange={setPoNumber}
            onLeadTimeEtaChange={setLeadTimeEta}
            onLeadTimeDaysChange={setLeadTimeDays}
          />

          <div className={styles.divider} />

          <div className={styles.signalsRow}>
            <DemandSignalsPanel signal={vendor.demandSignal} />
            <RiskFactorsPanel factors={vendor.riskFactors} />
          </div>

          <div className={styles.divider} />

          <div className={styles.tableSection}>
            <ContentSectionLabel>
              PURCHASE ORDER RECOMMENDATION
            </ContentSectionLabel>

            <SKUTable
              lineItems={lineItems}
              totalValue={totalValue}
              onQuantityChange={handleQuantityChange}
              onInventoryChange={handleInventoryChange}
              onRemoveItem={handleTrashClick}
              onInfoClick={handleInfoClick}
              onConfirm={handleConfirm}
            />
          </div>
        </StaggerFadeInWrapper>
      </div>

      {pendingDeleteId ? (
        <div
          className={styles.deleteModalWrap}
          onClick={handleDeleteCancel}
          role="presentation"
        >
          <DeleteItemModal
            itemName={
              lineItems.find((item) => item.id === pendingDeleteId)?.name ?? ""
            }
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />
        </div>
      ) : null}

      {isConfirming ? (
        <POConfirmPopover
          vendor={overriddenVendor}
          totalValue={totalValue}
          onNextVendor={() => {
            setIsConfirming(false);
            onNextVendor?.();
          }}
        />
      ) : null}
    </div>
  );
}
