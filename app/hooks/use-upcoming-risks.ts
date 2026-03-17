"use client";

import { useMemo } from "react";

import type { UpcomingRiskItem } from "@models/upcoming-risk";
import { useDashboardStore } from "@providers/store-provider";
import { DEMO_UPCOMING_RISK_ITEMS } from "@/app/demo/upcoming-risk-data";

// ── Helpers ───────────────────────────────────────────────

function daysUntil(dateString: string): number | null {
  if (!dateString) {
    return null;
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return null;
  }

  return Math.ceil((date.getTime() - Date.now()) / 86_400_000);
}

function runoutDescription(days: number): string {
  if (days <= 0) {
    return "Stock depleted. Emergency order required.";
  }

  if (days === 1) {
    return "Runs out in 1 day at current dispensing rate.";
  }

  return `Runs out in ${days} days at current dispensing rate.`;
}

// ── Hook ──────────────────────────────────────────────────

export function useUpcomingRisks(): ReadonlyArray<UpcomingRiskItem> {
  const nationalShortages = useDashboardStore(
    (state) => state.nationalShortages,
  );
  const procurementData = useDashboardStore((state) => state.procurementData);

  return useMemo(() => {
    const allLineItems =
      procurementData?.vendors.flatMap((v) => v.lineItems) ?? [];

    const includedSkus = new Set<string>();
    const items: UpcomingRiskItem[] = [];

    // 1. FDA shortage matches — cross-reference generic name against line items
    for (const shortage of nationalShortages) {
      if (shortage.status !== "active") {
        continue;
      }

      const genericLower = shortage.genericName.toLowerCase();

      const match = allLineItems.find((item) => {
        const nameLower = item.name.toLowerCase();
        const firstWord = genericLower.split(" ")[0];

        return nameLower.includes(genericLower) || nameLower.includes(firstWord);
      });

      if (!match || includedSkus.has(match.skuCode)) {
        continue;
      }

      includedSkus.add(match.skuCode);

      items.push({
        id: `fda-${match.skuCode}`,
        sku: match.skuCode,
        productName: match.name,
        description: shortage.reason,
      });
    }

    // 2. Urgent / out-of-stock / imminent runout from procurement data
    for (const item of allLineItems) {
      if (includedSkus.has(item.skuCode)) {
        continue;
      }

      const days = daysUntil(item.runOutDate);
      const isImminentRunout = days !== null && days <= 7;
      const isUrgentStatus =
        item.status === "out-of-stock" || item.status === "urgent";

      if (!isUrgentStatus && !isImminentRunout) {
        continue;
      }

      includedSkus.add(item.skuCode);

      const description: string = (() => {
        if (days !== null && days <= 7) {
          return runoutDescription(days);
        }

        if (item.status === "out-of-stock") {
          return "Currently out of stock. Immediate sourcing required.";
        }

        return "Stock critically low. Approaching reorder threshold.";
      })();

      items.push({
        id: `status-${item.skuCode}`,
        sku: item.skuCode,
        productName: item.name,
        description,
      });
    }

    // 3. Fall back to demo data if nothing matched
    if (items.length === 0) {
      return DEMO_UPCOMING_RISK_ITEMS;
    }

    return items;
  }, [nationalShortages, procurementData]);
}
