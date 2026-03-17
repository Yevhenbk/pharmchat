"use client";

import { cn } from "@utilities/tailwind";
import { useDashboardStore } from "@providers/store-provider";
import { useGlanceStore } from "@stores/glance-store";
import { StatRow } from "@components/ui/stat-row";
import { EditableStatValue } from "@components/ui/editable-stat-value";
import { CountUpValue } from "@components/ui/count-up-value";
import { StatsCardIcon } from "@components/icons/stats-card-icon";
import { StatsListIcon } from "@components/icons/stats-list-icon";
import { StatsTruckIcon } from "@components/icons/stats-truck-icon";
import { StatsLightningIcon } from "@components/icons/stats-lightning-icon";
import { StatsRiskIcon } from "@components/icons/stats-risk-icon";
import { RiskItem } from "@components/ui/risk-item";
import { useUpcomingRisks } from "@hooks/use-upcoming-risks";

import { StatsWrapper } from "./stats-wrapper";
import styles from "./stats-panel.module.scss";

interface Props {
  className?: string;
}

export function StatsPanel({ className }: Props) {
  const procurementData = useDashboardStore(
    (state) => state.procurementData,
  );
  const confirmedVendorIds = useDashboardStore(
    (state) => state.confirmedVendorIds,
  );
  const overrides = useGlanceStore((state) => state.overrides);
  const setOverride = useGlanceStore((state) => state.setOverride);
  const sentPoCount = useGlanceStore((state) => state.sentPoCount);

  const totalVendors = procurementData?.vendors.length ?? 0;
  const computedSpend = procurementData?.stats.proposedSpend ?? 0;

  const proposedSpend = overrides.proposedSpend ?? computedSpend;
  const posReady = totalVendors - confirmedVendorIds.size;
  const riskItems = useUpcomingRisks();

  return (
    <div className={cn(styles.panel, className)}>
      <StatsWrapper
        className={styles.statsSectionFirst}
        footerIcon={<StatsLightningIcon />}
        footerLabel="Today at a glance"
      >
        <StatRow
          icon={<StatsCardIcon />}
          label="Proposed spend"
          value={
            <EditableStatValue
              value={proposedSpend}
              onChange={(value) => setOverride("proposedSpend", value)}
              prefix="$"
              separator
            />
          }
        />
        <div className={styles.divider} />
        <StatRow
          icon={<StatsTruckIcon />}
          label="Deliveries arriving"
          value={<CountUpValue target={sentPoCount} />}
        />
        <div className={styles.divider} />
        <StatRow
          icon={<StatsListIcon />}
          label="POs ready"
          value={<CountUpValue target={posReady} />}
        />
      </StatsWrapper>

      <StatsWrapper
        className={styles.statsSectionSecond}
        footerIcon={<StatsRiskIcon />}
        footerLabel={
          <>
            Upcoming Risk{" "}
            <span className={styles.footerLabelMuted}>(7 days)</span>
          </>
        }
      >
        <div className={styles.riskContent}>
          <div className={cn("flex flex-col gap-3", styles.riskStagger)}>
            {riskItems.map((item) => (
              <RiskItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </StatsWrapper>
    </div>
  );
}
