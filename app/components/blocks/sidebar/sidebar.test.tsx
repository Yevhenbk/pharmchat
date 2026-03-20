import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("@providers/store-provider", () => ({
  useDashboardStore: vi.fn((selector: (s: { openChat: () => void }) => unknown) =>
    selector({ openChat: vi.fn() }),
  ),
}));

vi.mock("next-auth/react", () => ({
  useSession: vi.fn(() => ({ data: null })),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

import { Sidebar } from "./sidebar";

describe("Sidebar", () => {
  it("renders the Pharmchat brand name", () => {
    render(<Sidebar />);
    expect(screen.getByText("Pharmchat")).toBeInTheDocument();
  });

  it("renders both navigation items", () => {
    render(<Sidebar />);
    expect(screen.getByText("Rx Deck")).toBeInTheDocument();
    expect(screen.getByText("Order Run")).toBeInTheDocument();
  });

  it("calls onTabChange when a nav item is clicked", async () => {
    const onTabChange = vi.fn();
    render(<Sidebar activeTab="rx-deck" onTabChange={onTabChange} />);

    await userEvent.click(screen.getByText("Order Run"));

    expect(onTabChange).toHaveBeenCalledWith("order-run");
  });

  it("renders Ask Mira button", () => {
    render(<Sidebar />);
    expect(screen.getByText("Ask Mira")).toBeInTheDocument();
  });
});
