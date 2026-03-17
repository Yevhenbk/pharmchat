"use client";

import { motion, AnimatePresence } from "motion/react";
import { cn } from "@utilities/tailwind";
import { useActivityFeed } from "@hooks/use-activity-feed";
import { useDashboardStore } from "@providers/store-provider";
import { MiraLayersIcon } from "@components/icons/mira-layers-icon";
import {
  ActivityCard,
  type ActivityCardVariant,
} from "@components/ui/activity-card";
import styles from "./activity-feed.module.scss";

interface Props {
  className?: string;
}

function statusToVariant(status: "live" | "done"): ActivityCardVariant {
  if (status === "live") {
    return "active";
  }

  return "queued";
}

const SKELETON_COUNT = 7;

function ActivityCardSkeleton() {
  return (
    <div className="flex items-center gap-4 opacity-40">
      <div className="skeleton-shimmer h-9 w-9 shrink-0 rounded-md" />

      <div className="flex min-w-0 flex-1 items-center justify-between gap-8">
        <div className="min-w-0 flex-1">
          <div className="skeleton-shimmer h-3.5 w-3/4 rounded" />
          <div className="skeleton-shimmer mt-1.5 h-3 w-1/2 rounded" />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="skeleton-shimmer h-3 w-8 rounded" />
          <div className="skeleton-shimmer h-3 w-16 rounded" />
        </div>
      </div>
    </div>
  );
}

const ENTER_TRANSITION = {
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1] as const,
};

function AnimatedRow({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      transition={ENTER_TRANSITION}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function ActivityFeed({ className }: Props) {
  const initialized = useDashboardStore(
    (state) => state.procurementData !== null,
  );
  const activities = useActivityFeed();
  const isLoading = !initialized;
  const isEmpty = initialized && activities.length === 0;

  return (
    <section className={cn(styles.feed, className)}>
      <div className={styles.scrollArea}>
        <div className={styles.topBar}>
          <div className={styles.header}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eef2e6]">
              <MiraLayersIcon className="h-4 w-4 text-[#3a5c10]" />
            </div>

            <h2 className="text-[17px] font-600 text-[#1e293b] tracking-[-0.015em]">
              Mira Activity
            </h2>
          </div>

          <div className={styles.divider} />
        </div>

        <div className={styles.list}>
          {isLoading ? (
            Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <ActivityCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : isEmpty ? (
            <p className="text-[13px] text-[#94a3b8] px-1 pt-2">
              No activity yet. Events will appear here when Mira takes action.
            </p>
          ) : (
            <AnimatePresence initial={false}>
              {activities.map((item) => (
                <AnimatedRow key={item.id}>
                  <ActivityCard
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                    poNumber={item.poNumber}
                    placedAt={item.placedAt}
                    variant={statusToVariant(item.status)}
                  />
                </AnimatedRow>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
