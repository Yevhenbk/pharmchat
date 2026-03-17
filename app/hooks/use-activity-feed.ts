"use client";

import { useState, useEffect, useRef } from "react";

import type { ActivityFeedItem } from "@models/activity-feed";
import { useDashboardStore } from "@providers/store-provider";

// ── Helpers ───────────────────────────────────────────────

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const LIVE_DURATION_MS: Record<string, number> = {
  email: 10_000,
  x: 6_000,
};

// ── Hook ──────────────────────────────────────────────────

export function useActivityFeed(): ReadonlyArray<ActivityFeedItem> {
  const activityLog = useDashboardStore((state) => state.activityLog);
  const processedCountRef = useRef(0);
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const [activities, setActivities] = useState<ReadonlyArray<ActivityFeedItem>>(
    [],
  );

  useEffect(() => {
    const newCount = activityLog.length - processedCountRef.current;

    if (newCount <= 0) {
      return;
    }

    processedCountRef.current = activityLog.length;

    const newEvents = activityLog.slice(0, newCount);

    for (const event of newEvents) {
      const feedItem: ActivityFeedItem = {
        id: `real-${event.id}`,
        title: event.title,
        description: event.description,
        icon: event.icon,
        poNumber: event.poNumber,
        status: "live",
        startedAt: event.emittedAt,
        placedAt: formatTime(new Date(event.emittedAt)),
      };

      setActivities((previous) => [feedItem, ...previous]);

      const duration = LIVE_DURATION_MS[event.icon] ?? 10_000;

      const timer = setTimeout(() => {
        setActivities((previous) =>
          previous.map((item) =>
            item.id === feedItem.id ? { ...item, status: "done" } : item,
          ),
        );
        timersRef.current.delete(timer);
      }, duration);

      timersRef.current.add(timer);
    }
  }, [activityLog]);

  useEffect(() => {
    const activeTimers = timersRef.current;

    return () => {
      for (const timer of activeTimers) {
        clearTimeout(timer);
      }
    };
  }, []);

  return activities;
}
