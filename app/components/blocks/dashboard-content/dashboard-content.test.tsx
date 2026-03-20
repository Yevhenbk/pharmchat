import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@providers/store-provider", () => ({
  useDashboardStore: vi.fn((selector: (s: {
    procurementData: null;
    confirmedVendorIds: Set<string>;
    actionItems: never[];
    activityLog: never[];
    openChat: () => void;
    logActivity: () => void;
  }) => unknown) =>
    selector({
      procurementData: null,
      confirmedVendorIds: new Set(),
      actionItems: [],
      activityLog: [],
      openChat: vi.fn(),
      logActivity: vi.fn(),
    }),
  ),
}));

vi.mock("@stores/glance-store", () => ({
  useGlanceStore: vi.fn((selector: (s: {
    overrides: Record<string, never>;
    sentPoCount: number;
    setOverride: () => void;
    incrementSentPoCount: () => void;
  }) => unknown) =>
    selector({
      overrides: {},
      sentPoCount: 0,
      setOverride: vi.fn(),
      incrementSentPoCount: vi.fn(),
    }),
  ),
}));

vi.mock("@hooks/use-activity-feed", () => ({
  useActivityFeed: vi.fn(() => []),
}));

vi.mock("@hooks/use-upcoming-risks", () => ({
  useUpcomingRisks: vi.fn(() => []),
}));

vi.mock("@hooks/use-dashboard", () => ({
  useDashboard: vi.fn(() => ({
    modalState: "closed",
    isOpen: false,
    currentMode: null,
    currentActionId: null,
    closeModal: vi.fn(),
    activeProcurementData: null,
    remainingVendors: [],
    currentVendor: null,
    selectedVendorId: null,
    selectVendor: vi.fn(),
    dismissingVendorId: null,
    completeVendorDismiss: vi.fn(),
    visibleActionItems: [],
    selectedActionId: null,
    dismissedActionIds: new Set(),
    dismissingActionId: null,
    completeDismissAction: vi.fn(),
    startDismissAction: vi.fn(),
    skuSidebarOpen: false,
    selectedSkuId: null,
    openSkuSidebar: vi.fn(),
    closeSkuSidebar: vi.fn(),
    isDeleteModalOpen: false,
    setDeleteModalOpen: vi.fn(),
    openChat: vi.fn(),
    handleOpenPOQueue: vi.fn(),
    handleOpenAction: vi.fn(),
    handleNextVendor: vi.fn(),
    selectAction: vi.fn(),
  })),
}));

vi.mock("next-auth/react", () => ({
  useSession: vi.fn(() => ({ data: null })),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

import { DashboardContent } from "./dashboard-content";

describe("DashboardContent", () => {
  it("renders the page heading", () => {
    render(<DashboardContent />);
    expect(screen.getByText("Procurement Run")).toBeInTheDocument();
  });

  it("renders the Mira Activity feed section", () => {
    render(<DashboardContent />);
    expect(screen.getByText("Mira Activity")).toBeInTheDocument();
  });

  it("renders the PO Queue section label", () => {
    render(<DashboardContent />);
    expect(screen.getByText("PO Queue")).toBeInTheDocument();
  });

  it("renders the Pharmchat brand in the sidebar", () => {
    render(<DashboardContent />);
    expect(screen.getByText("Pharmchat")).toBeInTheDocument();
  });
});
