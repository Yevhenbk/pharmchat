"use client";

import { useState, useEffect } from "react";
import { cn } from "@utilities/tailwind";
import type { ModalMode } from "@models/modal";
import type { VendorOrder } from "@models/procurement";
import { useDashboardStore } from "@providers/store-provider";
import { ProcurementLogic } from "@services/procurement-logic";
import {
  buildVendorFromOrderCancelled,
  buildVendorFromDemandSurge,
} from "@demo/action-item-vendor-data";
import { POQueueContent as POQueueContentBlock } from "@components/blocks/po-queue-content/po-queue-content";
import { OrderCancelledContent } from "@components/blocks/order-cancelled-content/order-cancelled-content";
import { DemandSurgeContent } from "@components/blocks/demand-surge-content/demand-surge-content";
import { DeliveryDelayContent } from "@components/blocks/delivery-delay-content/delivery-delay-content";
import { EarlyArrivalContent } from "@components/blocks/early-arrival-content/early-arrival-content";
import { PartialFillContent } from "@components/blocks/partial-fill-content/partial-fill-content";
import { SkuBackorderedContent } from "@components/blocks/sku-backordered-content/sku-backordered-content";
import { NotConfirmedContent } from "@components/blocks/not-confirmed-content/not-confirmed-content";
import { PriceIncreaseContent } from "@components/blocks/price-increase-content/price-increase-content";
import { LiveEmailContent } from "@components/blocks/live-email-content/live-email-content";
import { POConfirmPopover } from "@components/blocks/po-confirm-popover/po-confirm-popover";
import styles from "./modal-content.module.scss";

interface ConfirmingState {
  readonly vendor: VendorOrder;
  readonly totalValue: number;
  readonly actionId: string;
}

interface Props {
  mode: ModalMode;
  actionId?: string;
  selectedVendor?: VendorOrder;
  isWhyOrderCardOpen?: boolean;
  onSKUInfoClick?: (skuId: string) => void;
  onDismissAction?: (id: string) => void;
  onDeleteModalOpenChange?: (open: boolean) => void;
  onNextVendor?: () => void;
  children?: React.ReactNode;
  className?: string;
}

function ActionContent({
  actionId,
  onDismissAction,
  onConfirmPO,
}: {
  actionId: string;
  onDismissAction?: (id: string) => void;
  onConfirmPO?: (state: ConfirmingState) => void;
}) {
  const actionItems = useDashboardStore(
    (state) => state.actionItems,
  );
  const actionContentMap = useDashboardStore(
    (state) => state.actionContentMap,
  );
  const nationalShortages = useDashboardStore(
    (state) => state.nationalShortages,
  );
  const analyzeActionEmail = useDashboardStore(
    (state) => state.analyzeActionEmail,
  );
  const analyzingActionIds = useDashboardStore(
    (state) => state.analyzingActionIds,
  );
  const failedAnalysisIds = useDashboardStore(
    (state) => state.failedAnalysisIds,
  );

  const actionItem = actionItems.find(
    (item) => item.id === actionId,
  );
  const contentEntry = actionContentMap[actionId];

  useEffect(() => {
    if (contentEntry?.type === "live-email" && !contentEntry.data.analysis) {
      analyzeActionEmail(actionId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionId, contentEntry?.type, analyzeActionEmail]);

  if (!actionItem || !contentEntry) {
    return <SkeletonContent />;
  }

  const dismiss = onDismissAction ? () => onDismissAction(actionId) : undefined;

  if (contentEntry.type === "order-cancelled") {
    const emailBody = contentEntry.data.email.body;

    const disruptionReport = ProcurementLogic.analyzeOrderDisruption({
      currentInventory: ProcurementLogic.buildInventoryFromLineItems(
        emailBody,
      ),
      emailBody,
      nationalShortages,
    });

    const handleApprove = () => {
      if (onConfirmPO) {
        const vendor = buildVendorFromOrderCancelled({
          data: contentEntry.data,
        });

        onConfirmPO({
          vendor,
          totalValue: vendor.value,
          actionId,
        });
      }
    };

    return (
      <OrderCancelledContent
        title={actionItem.title}
        subtitle={actionItem.description}
        data={contentEntry.data}
        disruptionReport={disruptionReport}
        onApprove={handleApprove}
        onReject={dismiss}
      />
    );
  }

  if (contentEntry.type === "demand-surge") {
    const handleApprove = () => {
      if (onConfirmPO) {
        const vendor = buildVendorFromDemandSurge({
          data: contentEntry.data,
        });

        onConfirmPO({
          vendor,
          totalValue: vendor.value,
          actionId,
        });
      }
    };

    return (
      <DemandSurgeContent
        title={actionItem.title}
        subtitle={actionItem.description}
        data={contentEntry.data}
        onApprove={handleApprove}
        onReject={dismiss}
      />
    );
  }

  if (contentEntry.type === "delivery-delay") {
    return (
      <DeliveryDelayContent
        title={actionItem.title}
        subtitle={actionItem.description}
        data={contentEntry.data}
        onAcknowledge={dismiss}
      />
    );
  }

  if (contentEntry.type === "early-arrival") {
    return (
      <EarlyArrivalContent
        title={actionItem.title}
        subtitle={actionItem.description}
        data={contentEntry.data}
        onAcknowledge={dismiss}
      />
    );
  }

  if (contentEntry.type === "partial-fill") {
    return (
      <PartialFillContent
        title={actionItem.title}
        subtitle={actionItem.description}
        data={contentEntry.data}
        onApprove={dismiss}
        onReject={dismiss}
      />
    );
  }

  if (contentEntry.type === "sku-backordered") {
    const emailBody = contentEntry.data.email.body;

    const disruptionReport = ProcurementLogic.analyzeOrderDisruption({
      currentInventory: ProcurementLogic.buildInventoryFromLineItems(
        emailBody,
      ),
      emailBody,
      nationalShortages,
    });

    return (
      <SkuBackorderedContent
        title={actionItem.title}
        subtitle={actionItem.description}
        data={contentEntry.data}
        disruptionReport={disruptionReport}
        onApprove={dismiss}
        onReject={dismiss}
      />
    );
  }

  if (contentEntry.type === "not-confirmed") {
    return (
      <NotConfirmedContent
        title={actionItem.title}
        subtitle={actionItem.description}
        data={contentEntry.data}
        onAcknowledge={dismiss}
      />
    );
  }

  if (contentEntry.type === "price-increase") {
    return (
      <PriceIncreaseContent
        title={actionItem.title}
        subtitle={actionItem.description}
        data={contentEntry.data}
        onApprove={dismiss}
        onReject={dismiss}
      />
    );
  }

  if (contentEntry.type === "live-email") {
    const { footerVariant } = contentEntry.data;

    return (
      <LiveEmailContent
        title={actionItem.title}
        subtitle={actionItem.description}
        data={contentEntry.data}
        isAnalyzing={analyzingActionIds.has(actionId)}
        analysisFailed={failedAnalysisIds.has(actionId)}
        onRetryAnalysis={() => analyzeActionEmail(actionId)}
        onApprove={footerVariant === "approve-reject" ? dismiss : undefined}
        onReject={footerVariant === "approve-reject" ? dismiss : undefined}
        onAcknowledge={footerVariant === "acknowledge" ? dismiss : undefined}
      />
    );
  }

  return <SkeletonContent />;
}

function SkeletonContent() {
  return (
    <div className={styles.contentInner}>
      <div className="mb-4 rounded-lg border border-border/20 bg-card-bg/30 p-4">
        <div className="skeleton-shimmer h-4 w-48" />
        <div className="skeleton-shimmer mt-2 h-3 w-full" />
        <div className="skeleton-shimmer mt-1 h-3 w-3/4" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="skeleton-shimmer h-12 w-full rounded-md" />
        <div className="skeleton-shimmer h-12 w-full rounded-md" />
      </div>
    </div>
  );
}

export function ModalContent({
  mode,
  actionId,
  selectedVendor,
  isWhyOrderCardOpen,
  onSKUInfoClick,
  onDismissAction,
  onDeleteModalOpenChange,
  onNextVendor,
  children,
  className,
}: Props) {
  const [confirming, setConfirming] = useState<ConfirmingState | null>(null);

  const handleConfirmPO = (state: ConfirmingState) => {
    setConfirming(state);
  };

  const handleConfirmDone = () => {
    const actionIdToDismiss = confirming?.actionId;
    setConfirming(null);

    if (actionIdToDismiss && onDismissAction) {
      onDismissAction(actionIdToDismiss);
    }
  };

  if (mode === "po-queue") {
    if (selectedVendor) {
      return (
        <div
          className={cn(
            styles.content,
            styles.contentNoScroll,
            "animate-fade-in",
            isWhyOrderCardOpen && styles.contentScrollLocked,
            className
          )}
        >
          <div
            key={selectedVendor.id}
            className={cn(
              styles.contentInnerWrap,
              isWhyOrderCardOpen && styles.contentInnerWrapBlurred
            )}
          >
            <POQueueContentBlock
              key={selectedVendor.id}
              vendor={selectedVendor}
              onSKUInfoClick={onSKUInfoClick}
              onDeleteModalOpenChange={onDeleteModalOpenChange}
              onNextVendor={onNextVendor}
            />
          </div>
          {children}
        </div>
      );
    }

    return null;
  }

  return (
    <div className={cn(styles.content, "animate-fade-in", className)}>
      <div key={actionId} className={styles.actionContentWrap}>
        {actionId ? (
          <ActionContent
            actionId={actionId}
            onDismissAction={onDismissAction}
            onConfirmPO={handleConfirmPO}
          />
        ) : (
          <SkeletonContent />
        )}
      </div>
      {children}

      {confirming ? (
        <POConfirmPopover
          vendor={confirming.vendor}
          totalValue={confirming.totalValue}
          nextLabel="Next"
          onNextVendor={handleConfirmDone}
        />
      ) : null}
    </div>
  );
}
