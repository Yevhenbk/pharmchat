import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GlanceOverrides {
  proposedSpend?: number;
}

interface GlanceState {
  overrides: GlanceOverrides;
  sentPoCount: number;
  setOverride(key: keyof GlanceOverrides, value: number): void;
  incrementSentPoCount(): void;
}

export const useGlanceStore = create<GlanceState>()(
  persist(
    (set) => ({
      overrides: {},
      sentPoCount: 0,

      setOverride(key, value) {
        set((state) => ({
          overrides: { ...state.overrides, [key]: value },
        }));
      },

      incrementSentPoCount() {
        set((state) => ({ sentPoCount: state.sentPoCount + 1 }));
      },
    }),
    { name: "pharmchat-glance" },
  ),
);
