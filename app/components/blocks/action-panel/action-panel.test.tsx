import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@providers/store-provider", () => ({
  useDashboardStore: vi.fn((selector: (s: {
    procurementData: null;
    confirmedVendorIds: Set<string>;
    actionItems: never[];
    logActivity: () => void;
  }) => unknown) =>
    selector({
      procurementData: null,
      confirmedVendorIds: new Set(),
      actionItems: [],
      logActivity: vi.fn(),
    }),
  ),
}));

vi.mock("@stores/glance-store", () => ({
  useGlanceStore: vi.fn((selector: (s: {
    incrementSentPoCount: () => void;
  }) => unknown) =>
    selector({ incrementSentPoCount: vi.fn() }),
  ),
}));

import type { ActionItemData } from "@models/action-item";
import { ActionPanel } from "./action-panel";

const MOCK_ACTION_ITEMS: ActionItemData[] = [
  {
    id: "action-001",
    type: "order-cancelled",
    severity: "critical",
    title: "Order Cancelled by Vendor",
    description: "Vendor cancelled PO-2026-001 due to inventory shortage.",
    actions: [{ label: "Find Alternative" }],
    ignoreLabel: "Ignore",
    timeAgo: "1h ago",
  },
  {
    id: "action-002",
    type: "delayed",
    severity: "warning",
    title: "Shipment Delayed 2 Days",
    description: "Carrier delay may impact stock levels.",
    actions: [{ label: "View Details" }],
    ignoreLabel: "Dismiss",
    timeAgo: "3h ago",
  },
];

describe("ActionPanel", () => {
  it("renders PO Queue section label in rx-deck tab", () => {
    render(<ActionPanel activeTab="rx-deck" poCount={5} />);
    expect(screen.getByText("PO Queue")).toBeInTheDocument();
  });

  it("renders Order Run section label in order-run tab", () => {
    render(<ActionPanel activeTab="order-run" poCount={5} />);
    expect(screen.getByText("Order Run")).toBeInTheDocument();
  });

  it("renders PO count and description in rx-deck tab", () => {
    const { container } = render(<ActionPanel activeTab="rx-deck" poCount={7} />);
    const text = container.textContent ?? "";
    expect(text).toContain("7 POs to approve");
  });

  it("renders action items from store when they are present", async () => {
    const { useDashboardStore } = await import("@providers/store-provider");

    (useDashboardStore as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: (s: {
        procurementData: null;
        confirmedVendorIds: Set<string>;
        actionItems: ActionItemData[];
        logActivity: () => void;
      }) => unknown) =>
        selector({
          procurementData: null,
          confirmedVendorIds: new Set(),
          actionItems: MOCK_ACTION_ITEMS,
          logActivity: vi.fn(),
        }),
    );

    render(<ActionPanel activeTab="rx-deck" poCount={2} />);

    expect(screen.getByText("Order Cancelled by Vendor")).toBeInTheDocument();
    expect(screen.getByText("Shipment Delayed 2 Days")).toBeInTheDocument();
  });
});
