import type { ActionItemData } from "@models/action-item";
import type { ActionContentEntry } from "@models/action-content";
import type {
  ProcurementRunData,
  VendorOrder,
} from "@models/procurement";
import type { ChatMessage, CannedResponse } from "@models/chat";
import type { ActivityFeedTemplate } from "@models/activity-feed";

// ── Repository interfaces ─────────────────────────────────

export interface ProcurementRepository {
  getProcurementRun(): Promise<ProcurementRunData>;
  getVendorById(vendorId: string): Promise<VendorOrder | undefined>;
  confirmVendor(vendorId: string): Promise<void>;
  getConfirmedVendorIds(): Promise<ReadonlySet<string>>;
}

export interface ActionItemRepository {
  getAll(): Promise<readonly ActionItemData[]>;
  getById(id: string): Promise<ActionItemData | undefined>;
  dismiss(id: string): Promise<void>;
  getDismissedIds(): Promise<ReadonlySet<string>>;
  getContent(id: string): Promise<ActionContentEntry | undefined>;
  getContentMap(): Promise<Record<string, ActionContentEntry>>;
  hasContent(id: string): Promise<boolean>;
}

export interface ChatRepository {
  getMessages(): Promise<readonly ChatMessage[]>;
  sendMessage(content: string): Promise<ChatMessage>;
  getCannedResponses(): Promise<readonly CannedResponse[]>;
  getDefaultResponse(): Promise<string>;
}

export interface ActivityFeedRepository {
  getTemplates(): Promise<readonly ActivityFeedTemplate[]>;
}

// ── Aggregate ─────────────────────────────────────────────

export interface Repositories {
  readonly procurement: ProcurementRepository;
  readonly actionItems: ActionItemRepository;
  readonly chat: ChatRepository;
  readonly activityFeed: ActivityFeedRepository;
}
