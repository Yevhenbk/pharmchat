import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LiveEmailContent } from "./live-email-content";
import type { LiveEmailData } from "@models/action-content";

const DEMO_DATA: LiveEmailData = {
  email: {
    from: "orders@mckesson.com",
    to: "procurement@pharmacy.com",
    subject: "Order Confirmation — PO-2024-0115",
    date: "Jan 15, 2024",
    body: "Your order has been confirmed.\n\nThank you for your business.",
  },
  classifiedAs: "Order Confirmation",
  miraInsight: "This order confirmation aligns with your formulary needs.",
  footerVariant: "acknowledge",
};

const DEFAULT_PROPS = {
  title: "Order Confirmation",
  subtitle: "McKesson · Jan 15, 2024",
  data: DEMO_DATA,
};

describe("LiveEmailContent", () => {
  it("renders title and subtitle", () => {
    render(<LiveEmailContent {...DEFAULT_PROPS} />);
    expect(screen.getByText("Order Confirmation")).toBeInTheDocument();
    expect(screen.getByText("McKesson · Jan 15, 2024")).toBeInTheDocument();
  });

  it("renders email metadata", () => {
    render(<LiveEmailContent {...DEFAULT_PROPS} />);
    expect(screen.getByText("orders@mckesson.com")).toBeInTheDocument();
    expect(
      screen.getByText("Order Confirmation — PO-2024-0115"),
    ).toBeInTheDocument();
  });

  it("renders mira insight", () => {
    render(<LiveEmailContent {...DEFAULT_PROPS} />);
    expect(
      screen.getByText("This order confirmation aligns with your formulary needs."),
    ).toBeInTheDocument();
  });

  it("shows retry button when analysis failed", () => {
    const onRetryAnalysis = vi.fn();
    render(
      <LiveEmailContent
        {...DEFAULT_PROPS}
        analysisFailed
        onRetryAnalysis={onRetryAnalysis}
      />,
    );
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });
});
