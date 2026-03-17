import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

import type { VendorOrder } from "@models/procurement";
import type { ActionItemData } from "@models/action-item";
import type { ActionContentEntry } from "@models/action-content";
import type { ChatMessage, CannedResponse } from "@models/chat";
import type { ActivityFeedTemplate } from "@models/activity-feed";
import { DEMO_PROCUREMENT_RUN } from "@demo/procurement-run-data";
import { DEMO_ACTION_ITEMS } from "@demo/action-items-data";
import { ACTION_CONTENT_MAP } from "@demo/action-content-data";
import {
  INITIAL_MESSAGES,
  DEMO_CANNED_RESPONSES,
  DEFAULT_CANNED_RESPONSE,
} from "@demo/chat-data";
import { ACTIVITY_FEED_TEMPLATES } from "@demo/activity-feed-data";
import { ProcurementService } from "@services/procurement-service";

// ── Types ──────────────────────────────────────────────

export type DataSection =
  | "stats"
  | "vendors"
  | "action-items"
  | "action-content"
  | "chat"
  | "activity";

export const DATA_SECTION_LABELS: Record<
  DataSection,
  string
> = {
  stats: "Stats",
  vendors: "Vendors",
  "action-items": "Action Items",
  "action-content": "Action Content",
  chat: "Chat Responses",
  activity: "Activity Feed",
};

export type StudioTab = "data" | "schema";

// ── State ──────────────────────────────────────────────

interface StudioState {
  readonly vendors: readonly VendorOrder[];
  readonly actionItems: readonly ActionItemData[];
  readonly actionContentMap: Record<string, ActionContentEntry>;
  readonly chatMessages: readonly ChatMessage[];
  readonly cannedResponses: readonly CannedResponse[];
  readonly defaultResponse: string;
  readonly activityTemplates: readonly ActivityFeedTemplate[];

  readonly activeTab: StudioTab;
  readonly dataSection: DataSection;
  readonly expandedId: string | null;
}

// ── Actions ────────────────────────────────────────────

interface StudioActions {
  setActiveTab(tab: StudioTab): void;
  setDataSection(section: DataSection): void;
  setExpandedId(id: string | null): void;

  setVendors(vendors: readonly VendorOrder[]): void;
  setActionItems(items: readonly ActionItemData[]): void;
  setActionContentMap(
    contentMap: Record<string, ActionContentEntry>,
  ): void;
  setChatMessages(messages: readonly ChatMessage[]): void;
  setCannedResponses(
    responses: readonly CannedResponse[],
  ): void;
  setDefaultResponse(response: string): void;
  setActivityTemplates(
    templates: readonly ActivityFeedTemplate[],
  ): void;

  reset(): void;
}

export type StudioStore = StudioState & StudioActions;

// ── Derivation ─────────────────────────────────────────

function deriveVendors(
  vendors: readonly VendorOrder[],
): readonly VendorOrder[] {
  return vendors.map(ProcurementService.deriveVendor);
}

// ── Initial data ───────────────────────────────────────

function cloneVendors(): readonly VendorOrder[] {
  return deriveVendors(
    structuredClone(
      DEMO_PROCUREMENT_RUN.vendors,
    ) satisfies readonly VendorOrder[],
  );
}

function cloneActionItems(): readonly ActionItemData[] {
  return structuredClone(
    DEMO_ACTION_ITEMS,
  ) satisfies readonly ActionItemData[];
}

function cloneActionContentMap(): Record<
  string,
  ActionContentEntry
> {
  return structuredClone(ACTION_CONTENT_MAP);
}

function cloneMessages(): readonly ChatMessage[] {
  return structuredClone(
    INITIAL_MESSAGES,
  ) satisfies readonly ChatMessage[];
}

function cloneCannedResponses(): readonly CannedResponse[] {
  return structuredClone(
    DEMO_CANNED_RESPONSES,
  ) satisfies readonly CannedResponse[];
}

function cloneTemplates(): readonly ActivityFeedTemplate[] {
  return structuredClone(
    ACTIVITY_FEED_TEMPLATES,
  ) satisfies readonly ActivityFeedTemplate[];
}

function getInitialState(): StudioState {
  return {
    vendors: cloneVendors(),
    actionItems: cloneActionItems(),
    actionContentMap: cloneActionContentMap(),
    chatMessages: cloneMessages(),
    cannedResponses: cloneCannedResponses(),
    defaultResponse: DEFAULT_CANNED_RESPONSE,
    activityTemplates: cloneTemplates(),
    activeTab: "data",
    dataSection: "vendors",
    expandedId: null,
  };
}

// ── Store factory ──────────────────────────────────────

export function createStudioStore() {
  return createStore<StudioStore>()(
    persist(
      (set) => ({
        ...getInitialState(),

        setActiveTab(tab) {
          set({ activeTab: tab });
        },

        setDataSection(section) {
          set({ dataSection: section, expandedId: null });
        },

        setExpandedId(id) {
          set({ expandedId: id });
        },

        setVendors(vendors) {
          set({ vendors: deriveVendors(vendors) });
        },

        setActionItems(items) {
          set({ actionItems: items });
        },

        setActionContentMap(contentMap) {
          set({ actionContentMap: contentMap });
        },

        setChatMessages(messages) {
          set({ chatMessages: messages });
        },

        setCannedResponses(responses) {
          set({ cannedResponses: responses });
        },

        setDefaultResponse(response) {
          set({ defaultResponse: response });
        },

        setActivityTemplates(templates) {
          set({ activityTemplates: templates });
        },

        reset() {
          set(getInitialState());
        },
      }),
      {
        name: "pharmchat-studio",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          vendors: state.vendors,
          actionItems: state.actionItems,
          actionContentMap: state.actionContentMap,
          chatMessages: state.chatMessages,
          cannedResponses: state.cannedResponses,
          defaultResponse: state.defaultResponse,
          activityTemplates: state.activityTemplates,
        }),
      },
    ),
  );
}

export type StudioStoreApi = ReturnType<
  typeof createStudioStore
>;
