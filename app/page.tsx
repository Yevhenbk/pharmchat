"use client";

import { AppProviders } from "@providers/app-providers";

import { DashboardContent } from "@components/blocks/dashboard-content/dashboard-content";

export default function DashboardPage() {
  return (
    <AppProviders>
      <DashboardContent />
    </AppProviders>
  );
}
