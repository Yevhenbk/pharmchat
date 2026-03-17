"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useStore } from "zustand";

import type { Repositories } from "@models/repository";
import {
  createDashboardStore,
  type DashboardStore,
  type DashboardStoreApi,
} from "@stores/dashboard-store";

const StoreContext = createContext<DashboardStoreApi | null>(null);

interface Props {
  repositories: Repositories;
  children: React.ReactNode;
}

export function StoreProvider({ repositories, children }: Props) {
  const [store] = useState(() =>
    createDashboardStore(repositories),
  );

  useEffect(() => {
    store.getState().initialize();
  }, [store]);

  return (
    <StoreContext value={store}>
      {children}
    </StoreContext>
  );
}

export function useDashboardStore<T>(
  selector: (state: DashboardStore) => T,
): T {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error(
      "useDashboardStore must be used within a StoreProvider",
    );
  }

  return useStore(store, selector);
}
