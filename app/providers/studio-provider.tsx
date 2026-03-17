"use client";

import { createContext, useContext, useState } from "react";
import { useStore } from "zustand";

import {
  createStudioStore,
  type StudioStore,
  type StudioStoreApi,
} from "@stores/studio-store";

const StudioContext = createContext<StudioStoreApi | null>(null);

interface Props {
  children: React.ReactNode;
}

export function StudioProvider({ children }: Props) {
  const [store] = useState(createStudioStore);

  return (
    <StudioContext value={store}>{children}</StudioContext>
  );
}

export function useStudioStore<T>(
  selector: (state: StudioStore) => T,
): T {
  const store = useContext(StudioContext);

  if (!store) {
    throw new Error(
      "useStudioStore must be used within a StudioProvider",
    );
  }

  return useStore(store, selector);
}
