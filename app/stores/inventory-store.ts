import { create } from "zustand";
import { persist } from "zustand/middleware";

// ── State ─────────────────────────────────────────────────

interface InventoryState {
  // skuCode → on-hand quantity, persisted to localStorage
  readonly overrides: Record<string, number>;
  readonly setInventory: (skuCode: string, quantity: number) => void;
}

// ── Store ─────────────────────────────────────────────────

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      overrides: {},

      setInventory: (skuCode, quantity) => {
        set((state) => ({
          overrides: { ...state.overrides, [skuCode]: quantity },
        }));
      },
    }),
    {
      name: "pharmchat-inventory",
    },
  ),
);
