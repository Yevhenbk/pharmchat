"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@utilities/tailwind";
import type { VendorOrder } from "@models/procurement";
import { FormatService } from "@services/format";
import styles from "./po-confirm-popover.module.scss";

type RowState = "idle" | "processing" | "done";

interface RowData {
  readonly skuCode: string;
  readonly name: string;
  readonly quantity: number;
  readonly visible: boolean;
  readonly state: RowState;
}

const ROW_APPEAR_DELAY_MS = 120;
const ROW_STAGGER_MS = 230;
const ROW_PROCESS_DURATION_MS = 400;
const FOOTER_DELAY_MS = 150;
const BADGE_DELAY_MS = 350;
const TITLE_COMPLETE_DELAY_MS = 400;

function buildInitialRows({
  vendor,
}: {
  vendor: VendorOrder;
}): readonly RowData[] {
  return vendor.lineItems.map((item) => ({
    skuCode: item.skuCode,
    name: item.name,
    quantity: item.recommendedQuantity,
    visible: true,
    state: "idle",
  }));
}

function getStatusLabel({ state }: { state: RowState }): string {
  if (state === "processing") {
    return "Adding...";
  }

  if (state === "done") {
    return "OK";
  }

  return "\u2014";
}

interface Props {
  vendor: VendorOrder;
  totalValue: number;
  nextLabel?: string;
  onNextVendor: () => void;
}

export function POConfirmPopover({
  vendor,
  totalValue,
  nextLabel = "Next PO",
  onNextVendor,
}: Props) {
  const [visible, setVisible] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [title, setTitle] = useState("Building PO...");
  const [status, setStatus] = useState(
    "Generating document...",
  );
  const [rows, setRows] = useState<readonly RowData[]>(() =>
    buildInitialRows({ vendor }),
  );
  const [footerVisible, setFooterVisible] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const [complete, setComplete] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>(
    [],
  );

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const addTimer = useCallback(
    (callback: () => void, delay: number) => {
      const timer = setTimeout(callback, delay);
      timersRef.current.push(timer);

      return timer;
    },
    [],
  );

  const vendorId = vendor.id;
  const lineItemCount = vendor.lineItems.length;
  const poNumber = vendor.poSummary.poNumber;

  useEffect(() => {
    addTimer(() => setAnimating(true), 80);

    Array.from({ length: lineItemCount }).forEach(
      (_, index) => {
        const processDelay =
          ROW_APPEAR_DELAY_MS + index * ROW_STAGGER_MS;

        addTimer(() => {
          setRows((previous) =>
            previous.map((row, rowIndex) => {
              if (rowIndex !== index) {
                return row;
              }

              return { ...row, state: "processing" };
            }),
          );
        }, processDelay);

        const doneDelay =
          processDelay + ROW_PROCESS_DURATION_MS;

        addTimer(() => {
          setRows((previous) =>
            previous.map((row, rowIndex) => {
              if (rowIndex !== index) {
                return row;
              }

              return { ...row, state: "done" };
            }),
          );
        }, doneDelay);
      },
    );

    const lastRowDoneTime =
      ROW_APPEAR_DELAY_MS +
      (lineItemCount - 1) * ROW_STAGGER_MS +
      ROW_PROCESS_DURATION_MS;

    addTimer(() => {
      setFooterVisible(true);
      setStatus("Sending via email...");
      setTitle("Transmitting...");
    }, lastRowDoneTime + FOOTER_DELAY_MS);

    addTimer(() => {
      setBadgeVisible(true);
    }, lastRowDoneTime + FOOTER_DELAY_MS + BADGE_DELAY_MS);

    addTimer(() => {
      setTitle(`Order ${poNumber} Confirmed`);
      setStatus("Sent Successfully");
      setComplete(true);
    }, lastRowDoneTime + FOOTER_DELAY_MS + BADGE_DELAY_MS + TITLE_COMPLETE_DELAY_MS);

    return clearTimers;
  }, [vendorId, lineItemCount, poNumber, addTimer, clearTimers]);

  const handleNextClick = () => {
    setTitle("Filed \u2014 Moving to next PO");
    setVisible(false);
    setAnimating(false);

    addTimer(() => {
      onNextVendor();
    }, 400);
  };

  return (
    <div
      className={cn(
        styles.popover,
        visible && styles.popoverVisible,
      )}
    >
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <span
          className={cn(
            styles.status,
            complete && styles.statusComplete,
          )}
        >
          {status}
        </span>
      </div>

      <div className={styles.miniDocument}>
        <div
          className={cn(
            styles.scanLine,
            animating && styles.scanLineAnimating,
          )}
        />

        <div className={styles.miniHeader}>
          <span className={styles.miniHeaderCell}>SKU</span>
          <span className={styles.miniHeaderCell}>
            Description
          </span>
          <span className={styles.miniHeaderCell}>Qty</span>
          <span className={styles.miniHeaderCell}>
            Status
          </span>
        </div>

        {rows.map((row) => (
          <div
            key={row.skuCode}
            className={cn(
              styles.row,
              row.visible && styles.rowVisible,
              row.state === "processing" &&
                styles.rowProcessing,
              row.state === "done" && styles.rowDone,
            )}
          >
            <span className={styles.rowSku}>
              {row.skuCode}
            </span>
            <span className={styles.rowDescription}>
              {row.name}
            </span>
            <span className={styles.rowQuantity}>
              {row.quantity.toLocaleString()}
            </span>
            <span className={styles.rowStatus}>
              <span className={styles.statusDot} />
              <span className={styles.statusLabel}>
                {getStatusLabel({ state: row.state })}
              </span>
            </span>
          </div>
        ))}

        <div
          className={cn(
            styles.footer,
            footerVisible && styles.footerVisible,
          )}
        >
          <span className={styles.footerTotal}>
            {FormatService.currency(totalValue)}
          </span>
          <span
            className={cn(
              styles.ediBadge,
              badgeVisible && styles.ediBadgeVisible,
            )}
          >
            Sent via EMAIL
          </span>
        </div>
      </div>

      <button
        type="button"
        className={cn(
          styles.nextButton,
          complete && styles.nextButtonActive,
        )}
        disabled={!complete}
        onClick={handleNextClick}
      >
        {nextLabel} &rarr;
      </button>
    </div>
  );
}
