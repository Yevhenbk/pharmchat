import type { Repositories } from "@models/repository";
import type { ProcurementRunData } from "@models/procurement";
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
  buildResponseMatcher,
} from "@demo/chat-data";
import { ACTIVITY_FEED_TEMPLATES } from "@demo/activity-feed-data";
import { ProcurementService } from "@services/procurement-service";

import { InMemoryProcurementRepository } from "./in-memory-procurement-repository";
import { InMemoryActionItemRepository } from "./in-memory-action-item-repository";
import { InMemoryChatRepository } from "./in-memory-chat-repository";
import { InMemoryActivityFeedRepository } from "./in-memory-activity-feed-repository";

// ── Studio data reader ─────────────────────────────────

interface StudioPersistedState {
  vendors?: ProcurementRunData["vendors"];
  actionItems?: readonly ActionItemData[];
  actionContentMap?: Record<string, ActionContentEntry>;
  chatMessages?: readonly ChatMessage[];
  cannedResponses?: readonly CannedResponse[];
  defaultResponse?: string;
  activityTemplates?: readonly ActivityFeedTemplate[];
}

function readStudioData(): {
  procurement: ProcurementRunData;
  actionItems: readonly ActionItemData[];
  actionContentMap: Record<string, ActionContentEntry>;
  chatMessages: readonly ChatMessage[];
  cannedResponses: readonly CannedResponse[];
  defaultResponse: string;
  activityTemplates: readonly ActivityFeedTemplate[];
} | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem("pharmchat-studio");

    if (!raw) {
      return null;
    }

    const parsed: { state?: StudioPersistedState } =
      JSON.parse(raw);

    const state = parsed.state;

    if (!state?.vendors || state.vendors.length === 0) {
      return null;
    }

    const stats = ProcurementService.deriveStats(
      state.vendors,
    );

    return {
      procurement: { stats, vendors: state.vendors },
      actionItems: state.actionItems ?? DEMO_ACTION_ITEMS,
      actionContentMap:
        state.actionContentMap ?? ACTION_CONTENT_MAP,
      chatMessages: state.chatMessages ?? INITIAL_MESSAGES,
      cannedResponses:
        state.cannedResponses ?? DEMO_CANNED_RESPONSES,
      defaultResponse:
        state.defaultResponse ?? DEFAULT_CANNED_RESPONSE,
      activityTemplates:
        state.activityTemplates ?? ACTIVITY_FEED_TEMPLATES,
    };
  } catch {
    return null;
  }
}

// ── Factory ────────────────────────────────────────────

export function createInMemoryRepositories(): Repositories {
  const studioData = readStudioData();

  const procurement =
    studioData?.procurement ?? DEMO_PROCUREMENT_RUN;
  const actionItems =
    studioData?.actionItems ?? DEMO_ACTION_ITEMS;
  const actionContentMap =
    studioData?.actionContentMap ?? ACTION_CONTENT_MAP;
  const chatMessages =
    studioData?.chatMessages ?? INITIAL_MESSAGES;
  const cannedResponses =
    studioData?.cannedResponses ?? DEMO_CANNED_RESPONSES;
  const defaultResponse =
    studioData?.defaultResponse ?? DEFAULT_CANNED_RESPONSE;
  const activityTemplates =
    studioData?.activityTemplates ?? ACTIVITY_FEED_TEMPLATES;

  return {
    procurement: new InMemoryProcurementRepository(
      procurement,
    ),
    actionItems: new InMemoryActionItemRepository({
      items: actionItems,
      contentMap: actionContentMap,
    }),
    chat: new InMemoryChatRepository({
      initialMessages: chatMessages,
      cannedResponses,
      defaultResponse,
      getResponse: buildResponseMatcher({
        cannedResponses,
        defaultResponse,
      }),
    }),
    activityFeed: new InMemoryActivityFeedRepository(
      activityTemplates,
    ),
  };
}
