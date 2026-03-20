import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WhyOrderCard } from "./why-order-card";

const DEFAULT_SECTIONS = [
  {
    id: "demand",
    icon: <span>icon</span>,
    title: "Forecasted Demand",
    body: "Expected usage: ~140 units over the next 2 weeks.",
  },
  {
    id: "inventory",
    icon: <span>icon</span>,
    title: "Current Inventory",
    body: "On hand: 45 units.",
  },
];

const DEFAULT_PROPS = {
  poNumber: "PO-12345",
  skuLabel: "Atlantic Salmon Fillet — 6oz IQF",
  recommendation: "Order 200 units now to avoid running out on Jan 22.",
  sections: DEFAULT_SECTIONS,
};

describe("WhyOrderCard", () => {
  it("renders poNumber and skuLabel", () => {
    render(<WhyOrderCard {...DEFAULT_PROPS} />);
    expect(screen.getByText("PO-12345")).toBeInTheDocument();
    expect(
      screen.getByText("Atlantic Salmon Fillet — 6oz IQF"),
    ).toBeInTheDocument();
  });

  it("renders recommendation text", () => {
    render(<WhyOrderCard {...DEFAULT_PROPS} />);
    expect(
      screen.getByText("Order 200 units now to avoid running out on Jan 22."),
    ).toBeInTheDocument();
  });

  it("renders section titles", () => {
    render(<WhyOrderCard {...DEFAULT_PROPS} />);
    expect(screen.getByText("Forecasted Demand")).toBeInTheDocument();
    expect(screen.getByText("Current Inventory")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const onClose = vi.fn();
    const { getByLabelText } = render(
      <WhyOrderCard {...DEFAULT_PROPS} onClose={onClose} />,
    );
    getByLabelText("Close").click();
    expect(onClose).toHaveBeenCalledOnce();
  });
});
