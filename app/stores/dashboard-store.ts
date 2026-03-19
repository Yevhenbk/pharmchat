import { createStore } from "zustand/vanilla";

import type { ModalState, ModalMode } from "@models/modal";
import type { ActionItemData } from "@models/action-item";
import type { ProcurementRunData, VendorOrder } from "@models/procurement";
import type { ChatMessage, CannedResponse } from "@models/chat";
import type { ActionContentEntry, LiveEmailFooter } from "@models/action-content";
import type { DrugShortage } from "@models/shortage";
import type { GmailEmail } from "@models/gmail-email";
import type { Repositories } from "@models/repository";
import type { ActionItemType, Severity } from "@models/action-item";
import type { ActivityLogEvent } from "@models/activity-feed";
import type { LiveEmailAnalysis } from "@models/action-content";

// ── State ─────────────────────────────────────────────────

interface DashboardState {
  // Data (from repositories)
  readonly procurementData: ProcurementRunData | null;
  readonly actionItems: readonly ActionItemData[];
  readonly actionContentMap: Record<string, ActionContentEntry>;
  readonly dismissedActionIds: ReadonlySet<string>;
  readonly confirmedVendorIds: ReadonlySet<string>;
  readonly chatMessages: readonly ChatMessage[];
  readonly cannedResponses: readonly CannedResponse[];
  readonly defaultResponse: string;
  readonly nationalShortages: readonly DrugShortage[];

  // Selections
  readonly modalState: ModalState;
  readonly selectedVendorId: string | null;
  readonly selectedActionId: string | null;
  readonly selectedSkuId: string | null;

  // Activity log (real events from the app)
  readonly activityLog: readonly ActivityLogEvent[];

  // UI state
  readonly dismissingActionId: string | null;
  readonly dismissingVendorId: string | null;
  readonly skuSidebarOpen: boolean;
  readonly isDeleteModalOpen: boolean;
  readonly chatOpen: boolean;
  readonly widgetRect: DOMRect | null;
  readonly analyzingActionIds: ReadonlySet<string>;
  readonly failedAnalysisIds: ReadonlySet<string>;
}

// ── Actions ───────────────────────────────────────────────

interface DashboardActions {
  // Bootstrap
  initialize(): Promise<void>;

  // Activity log
  logActivity(
    params: Omit<ActivityLogEvent, "id" | "emittedAt">,
  ): void;

  // Email analysis (on-demand, triggered when modal opens)
  analyzeActionEmail(actionId: string): Promise<void>;

  // Modal
  openModal(params: {
    mode: ModalMode;
    actionId?: string;
  }): void;
  closeModal(): void;

  // Procurement
  selectVendor(vendorId: string | null): void;
  confirmCurrentVendor(): Promise<void>;
  setDismissingVendorId(vendorId: string | null): void;
  completeVendorDismiss(): Promise<void>;

  // Action items
  selectAction(id: string): Promise<void>;
  startDismissAction(id: string): Promise<void>;
  completeDismissAction(): Promise<void>;
  getActionContent(
    id: string,
  ): Promise<ActionContentEntry | undefined>;
  hasActionContent(id: string): Promise<boolean>;

  // SKU sidebar
  openSkuSidebar(skuId: string): void;
  closeSkuSidebar(): void;

  // Delete modal
  setDeleteModalOpen(open: boolean): void;

  // Chat
  openChat(widgetRect: DOMRect): void;
  closeChat(): void;
  sendChatMessage(content: string): Promise<ChatMessage>;

}

export type DashboardStore = DashboardState & DashboardActions;

// ── Helpers ───────────────────────────────────────────────

function isDrugShortage(value: unknown): value is DrugShortage {
  return (
    typeof value === "object" &&
    value !== null &&
    "genericName" in value &&
    "status" in value &&
    "reason" in value
  );
}

async function fetchNationalShortages(): Promise<
  readonly DrugShortage[]
> {
  try {
    const response = await fetch("/api/shortages");

    if (!response.ok) {
      return [];
    }

    const json: unknown = await response.json();

    if (!Array.isArray(json)) {
      return [];
    }

    return json.filter(isDrugShortage);
  } catch {
    return [];
  }
}

// ── Parsed procurement helpers ────────────────────────────

function isVendorOrder(value: unknown): value is VendorOrder {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "vendorName" in value &&
    "lineItems" in value
  );
}

async function fetchParsedProcurement(): Promise<
  readonly VendorOrder[]
> {
  if (isDemoMode()) return [];

  try {
    const response = await fetch("/api/parse-supplier-emails");

    if (!response.ok) {
      return [];
    }

    const json: unknown = await response.json();

    if (!Array.isArray(json)) {
      return [];
    }

    return json.filter(isVendorOrder);
  } catch {
    return [];
  }
}

// ── Gmail helpers ─────────────────────────────────────────

function isGmailEmail(value: unknown): value is GmailEmail {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "threadId" in value &&
    "from" in value &&
    "subject" in value &&
    "body" in value
  );
}

async function fetchActionEmailAnalyses(
  emails: readonly GmailEmail[],
): Promise<Record<string, LiveEmailAnalysis>> {
  if (emails.length === 0) {
    return {};
  }

  try {
    const response = await fetch("/api/analyze-action-emails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emails }),
    });

    console.warn("[fetchActionEmailAnalyses] HTTP", response.status);

    if (!response.ok) {
      console.warn("[fetchActionEmailAnalyses] non-OK response");

      return {};
    }

    const json: unknown = await response.json();

    console.warn("[fetchActionEmailAnalyses] body:", JSON.stringify(json).slice(0, 300));

    return typeof json === "object" && json !== null
      ? (json as Record<string, LiveEmailAnalysis>)
      : {};
  } catch (error) {
    console.error("[fetchActionEmailAnalyses] fetch error:", error);

    return {};
  }
}

function isDemoMode(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim() === "pharmchat-demo=1");
}

async function fetchGmailEmails(): Promise<readonly GmailEmail[]> {
  if (isDemoMode()) return [];

  try {
    const response = await fetch("/api/emails");

    if (!response.ok) {
      return [];
    }

    const json: unknown = await response.json();

    if (!Array.isArray(json)) {
      return [];
    }

    return json.filter(isGmailEmail);
  } catch {
    return [];
  }
}

function classifyEmail(
  email: GmailEmail,
): { type: ActionItemType; severity: Severity } {
  const text = `${email.subject} ${email.body}`.toLowerCase();

  if (/cancel|unable to fulfill|cannot fulfill|regret to inform/.test(text)) {
    return { type: "order-cancelled", severity: "critical" };
  }

  if (/backorder|back-order|out of stock|unavailable/.test(text)) {
    return { type: "sku-backordered", severity: "critical" };
  }

  if (/delay|delayed|behind schedule/.test(text)) {
    return { type: "delayed", severity: "warning" };
  }

  if (/partial|partially fulfilled|partial fill/.test(text)) {
    return { type: "partial-fill", severity: "warning" };
  }

  if (/price increase|price change|pricing update|new price/.test(text)) {
    return { type: "price-increase", severity: "warning" };
  }

  if (/early|ahead of schedule|early delivery/.test(text)) {
    return { type: "arriving-early", severity: "fyi" };
  }

  if (/not confirmed|pending confirmation|overdue|awaiting/.test(text)) {
    return { type: "not-confirmed", severity: "warning" };
  }

  if (/surge|high demand|increase in orders/.test(text)) {
    return { type: "demand-surge", severity: "warning" };
  }

  return { type: "order-cancelled", severity: "warning" };
}

function miraInsightForEmail(
  email: GmailEmail,
  type: ActionItemType,
): string {
  const sender =
    email.from.match(/<(.+)>/)?.[1] ?? email.from;

  switch (type) {
    case "order-cancelled":
      return `Cancellation from ${sender} detected. Review alternative suppliers and check national shortage status before responding.`;
    case "sku-backordered":
      return `Backorder alert from ${sender}. Cross-reference national shortage data and activate alternative sourcing if days-on-hand fall below threshold.`;
    case "delayed":
      return `Delivery delay from ${sender}. Assess current days-on-hand across affected SKUs and consider bridge ordering if stockout risk is elevated.`;
    case "partial-fill":
      return `Partial fulfilment from ${sender}. Monitor backordered quantities and consider sourcing the shortfall from a secondary supplier.`;
    case "price-increase":
      return `Price change notification from ${sender}. Evaluate monthly budget impact before acknowledging — consider bulk pre-ordering at current price if viable.`;
    case "arriving-early":
      return `Early delivery from ${sender}. Confirm storage capacity and update receiving schedule to avoid handling delays.`;
    case "not-confirmed":
      return `Unconfirmed order status from ${sender}. Initiate supplier chase to ensure processing before the scheduled delivery window closes.`;
    default:
      return `Message from ${sender} requires review. Classify and action within your SLA window.`;
  }
}

function formatTimeAgo(dateString: string): string {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "";
  }

  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) {
    return `${diffMins}m ago`;
  }

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  return `${diffDays}d ago`;
}

function gmailEmailToActionItem(email: GmailEmail): ActionItemData {
  const { type, severity } = classifyEmail(email);

  return {
    id: `gmail-${email.id}`,
    type,
    severity,
    title: email.subject || "(No Subject)",
    description: email.snippet,
    actions: [{ label: "Review" }],
    ignoreLabel: "Ignore",
    timeAgo: formatTimeAgo(email.date),
  };
}

function gmailEmailToContentEntry(
  email: GmailEmail,
  analysis?: LiveEmailAnalysis,
): ActionContentEntry {
  const { type } = classifyEmail(email);
  const miraInsight =
    analysis?.miraInsight ?? miraInsightForEmail(email, type);

  const footerVariant: LiveEmailFooter =
    type === "arriving-early" || type === "not-confirmed"
      ? "acknowledge"
      : "approve-reject";

  return {
    type: "live-email",
    data: {
      email: {
        from: email.from,
        to: email.to,
        subject: email.subject,
        body: email.body,
        bodyHtml: email.bodyHtml,
        date: email.date,
      },
      classifiedAs: type,
      miraInsight,
      footerVariant,
      analysis,
    },
  };
}

// ── Store factory ─────────────────────────────────────────

export function createDashboardStore(repositories: Repositories) {
  return createStore<DashboardStore>()((set, get) => ({
    // Initial state
    procurementData: null,
    actionItems: [],
    actionContentMap: {},
    dismissedActionIds: new Set(),
    confirmedVendorIds: new Set(),
    chatMessages: [],
    cannedResponses: [],
    defaultResponse: "",
    nationalShortages: [],
    activityLog: [],
    modalState: { mode: "closed" },
    selectedVendorId: null,
    selectedActionId: null,
    selectedSkuId: null,
    dismissingActionId: null,
    dismissingVendorId: null,
    skuSidebarOpen: false,
    isDeleteModalOpen: false,
    chatOpen: false,
    widgetRect: null,
    analyzingActionIds: new Set(),
    failedAnalysisIds: new Set(),

    // ── Bootstrap ───────────────────────────────────────

    async initialize() {
      const [
        repoProcurementData,
        actionItems,
        actionContentMap,
        chatMessages,
        cannedResponses,
        defaultResponse,
        nationalShortages,
        gmailEmails,
        parsedVendors,
      ] = await Promise.all([
        repositories.procurement.getProcurementRun(),
        repositories.actionItems.getAll(),
        repositories.actionItems.getContentMap(),
        repositories.chat.getMessages(),
        repositories.chat.getCannedResponses(),
        repositories.chat.getDefaultResponse(),
        fetchNationalShortages(),
        fetchGmailEmails(),
        fetchParsedProcurement(),
      ]);

      const uniqueParsedVendors = parsedVendors.filter(
        (vendor, index, array) =>
          array.findIndex((v) => v.id === vendor.id) === index,
      );

      const procurementData =
        uniqueParsedVendors.length > 0
          ? {
              vendors: uniqueParsedVendors,
              stats: {
                purchaseOrderCount: uniqueParsedVendors.length,
                supplierCount: uniqueParsedVendors.length,
                proposedSpend: uniqueParsedVendors.reduce(
                  (sum, v) => sum + v.value,
                  0,
                ),
                stockOutsAtRisk: uniqueParsedVendors.reduce(
                  (count, v) =>
                    count +
                    v.lineItems.filter(
                      (item) =>
                        item.status === "out-of-stock" ||
                        item.status === "urgent",
                    ).length,
                  0,
                ),
              },
            }
          : repoProcurementData;

      const gmailActionItems = gmailEmails.map(gmailEmailToActionItem);

      const gmailContentEntries: Record<string, ActionContentEntry> =
        Object.fromEntries(
          gmailEmails.map((email) => [
            `gmail-${email.id}`,
            gmailEmailToContentEntry(email),
          ]),
        );

      const hasLiveEmails = gmailActionItems.length > 0;

      // Commit state immediately so the UI renders without waiting
      // for the Gemini analysis pass below.
      set({
        procurementData,
        actionItems: hasLiveEmails ? gmailActionItems : actionItems,
        actionContentMap: hasLiveEmails
          ? gmailContentEntries
          : actionContentMap,
        chatMessages,
        cannedResponses,
        defaultResponse,
        nationalShortages,
      });

      if (uniqueParsedVendors.length > 0) {
        const count = uniqueParsedVendors.length;

        get().logActivity({
          title: `${count} supplier order${count === 1 ? "" : "s"} extracted`,
          description: "Mira processed incoming supplier emails",
          icon: "email",
          poNumber: uniqueParsedVendors[0].poSummary.poNumber.replace(/^PO-/i, ""),
        });
      }

    },

    // ── Activity log ────────────────────────────────────

    logActivity(params) {
      const event: ActivityLogEvent = {
        ...params,
        id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        emittedAt: Date.now(),
      };

      set((state) => ({
        activityLog: [event, ...state.activityLog],
      }));
    },

    // ── Email analysis ──────────────────────────────────

    async analyzeActionEmail(actionId) {
      const state = get();
      const entry = state.actionContentMap[actionId];

      console.warn("[analyzeActionEmail] called", {
        actionId,
        entryType: entry?.type,
        hasAnalysis: entry?.type === "live-email"
          ? Boolean(entry.data.analysis)
          : "n/a",
        isAlreadyAnalyzing: state.analyzingActionIds.has(actionId),
      });

      if (
        !entry ||
        entry.type !== "live-email" ||
        entry.data.analysis ||
        state.analyzingActionIds.has(actionId)
      ) {
        console.warn("[analyzeActionEmail] bailed out early");

        return;
      }

      set((s) => ({
        analyzingActionIds: new Set([...s.analyzingActionIds, actionId]),
        failedAnalysisIds: (() => {
          const next = new Set(s.failedAnalysisIds);
          next.delete(actionId);

          return next;
        })(),
      }));

      try {
        const { email } = entry.data;
        const emailId = actionId.replace(/^gmail-/, "");

        const gmailEmail: GmailEmail = {
          id: emailId,
          threadId: "",
          from: email.from,
          to: email.to ?? "",
          subject: email.subject,
          body: email.body,
          bodyHtml: email.bodyHtml,
          date: email.date ?? "",
          snippet: "",
        };

        const analyses = await fetchActionEmailAnalyses([gmailEmail]);

        console.warn("[analyzeActionEmail] analyses returned", {
          emailId,
          keys: Object.keys(analyses),
          hasResult: Boolean(analyses[emailId]),
        });

        const analysis = analyses[emailId];

        if (analysis) {
          set((s) => ({
            actionContentMap: {
              ...s.actionContentMap,
              [actionId]: {
                type: "live-email",
                data: { ...entry.data, analysis },
              },
            },
          }));
        }
      } finally {
        set((s) => {
          const analyzing = new Set(s.analyzingActionIds);
          analyzing.delete(actionId);

          // Mark as failed only if analysis still isn't populated
          const failed = new Set(s.failedAnalysisIds);
          const entry = s.actionContentMap[actionId];

          if (
            !entry ||
            entry.type !== "live-email" ||
            !entry.data.analysis
          ) {
            failed.add(actionId);
          }

          return { analyzingActionIds: analyzing, failedAnalysisIds: failed };
        });
      }
    },

    // ── Modal ───────────────────────────────────────────

    openModal({ mode, actionId }) {
      set({
        modalState: { mode, actionId },
      });
    },

    closeModal() {
      set({
        modalState: { mode: "closed" },
        skuSidebarOpen: false,
        selectedSkuId: null,
        selectedVendorId: null,
        selectedActionId: null,
      });
    },

    // ── Procurement ─────────────────────────────────────

    selectVendor(vendorId) {
      set({ selectedVendorId: vendorId });
    },

    async confirmCurrentVendor() {
      const { selectedVendorId } = get();

      if (!selectedVendorId) {
        return;
      }

      await repositories.procurement.confirmVendor(
        selectedVendorId,
      );

      const confirmedVendorIds =
        await repositories.procurement.getConfirmedVendorIds();

      const procurementData =
        await repositories.procurement.getProcurementRun();

      set({ confirmedVendorIds, procurementData });
    },

    setDismissingVendorId(vendorId) {
      set({ dismissingVendorId: vendorId });
    },

    async completeVendorDismiss() {
      const { dismissingVendorId } = get();

      if (!dismissingVendorId) {
        return;
      }

      await repositories.procurement.confirmVendor(
        dismissingVendorId,
      );

      const confirmedVendorIds =
        await repositories.procurement.getConfirmedVendorIds();

      const procurementData =
        await repositories.procurement.getProcurementRun();

      set({
        confirmedVendorIds,
        procurementData,
        dismissingVendorId: null,
      });
    },

    // ── Action items ────────────────────────────────────

    async selectAction(id) {
      const state = get();
      const actionItem = state.actionItems.find(
        (item) => item.id === id,
      );
      const hasContent = id in state.actionContentMap;

      if (!actionItem || !hasContent) {
        return;
      }

      const SEVERITY_TO_MODE: Record<string, ModalMode> = {
        critical: "critical",
        warning: "warning",
        fyi: "fyi",
      };

      const mode = SEVERITY_TO_MODE[actionItem.severity];

      if (!mode) {
        return;
      }

      set({
        modalState: { mode, actionId: id },
        selectedActionId: id,
      });
    },

    async startDismissAction(id) {
      set({ dismissingActionId: id });

      const state = get();

      if (
        state.modalState.mode === "closed" ||
        state.modalState.actionId !== id
      ) {
        return;
      }

      const visibleItems = state.actionItems.filter(
        (item) =>
          !state.dismissedActionIds.has(item.id) &&
          item.id !== id,
      );

      const nextItem = visibleItems.find(
        (item) => item.id in state.actionContentMap,
      );

      if (!nextItem) {
        set({
          modalState: { mode: "closed" },
          selectedActionId: null,
        });

        return;
      }

      const SEVERITY_TO_MODE: Record<string, ModalMode> = {
        critical: "critical",
        warning: "warning",
        fyi: "fyi",
      };

      const mode = SEVERITY_TO_MODE[nextItem.severity];

      if (!mode) {
        return;
      }

      set({
        modalState: { mode, actionId: nextItem.id },
        selectedActionId: nextItem.id,
      });
    },

    async completeDismissAction() {
      const { dismissingActionId } = get();

      if (!dismissingActionId) {
        return;
      }

      await repositories.actionItems.dismiss(dismissingActionId);

      const dismissedActionIds =
        await repositories.actionItems.getDismissedIds();

      set({ dismissedActionIds, dismissingActionId: null });
    },

    async getActionContent(id) {
      return get().actionContentMap[id];
    },

    async hasActionContent(id) {
      return id in get().actionContentMap;
    },

    // ── SKU sidebar ─────────────────────────────────────

    openSkuSidebar(skuId) {
      set({ selectedSkuId: skuId, skuSidebarOpen: true });
    },

    closeSkuSidebar() {
      set({ selectedSkuId: null, skuSidebarOpen: false });
    },

    // ── Delete modal ────────────────────────────────────

    setDeleteModalOpen(open) {
      set({ isDeleteModalOpen: open });
    },

    // ── Chat ────────────────────────────────────────────

    openChat(widgetRect) {
      set({ chatOpen: true, widgetRect });
    },

    closeChat() {
      set({ chatOpen: false });
    },

    async sendChatMessage(content) {
      const assistantMessage =
        await repositories.chat.sendMessage(content);

      const chatMessages =
        await repositories.chat.getMessages();

      set({ chatMessages });

      return assistantMessage;
    },

  }));
}

export type DashboardStoreApi = ReturnType<
  typeof createDashboardStore
>;
