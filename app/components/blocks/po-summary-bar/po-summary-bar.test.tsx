import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { POSummary } from "@models/procurement";

import { POSummaryBar } from "./po-summary-bar";

const MOCK_SUMMARY: POSummary = {
  poNumber: "PO-2026-892",
  value: 4609,
  leadTimeDays: 5,
  leadTimeEta: "Feb 22",
  confidencePercent: 94,
  confidenceLabel: "High",
  skuCount: 24,
  skuNote: "3 New Items",
};

describe("POSummaryBar", () => {
  it("renders the PO number", () => {
    render(<POSummaryBar summary={MOCK_SUMMARY} />);

    expect(screen.getByText("PO-2026-892")).toBeInTheDocument();
  });

  it("renders all summary data", () => {
    const { container } = render(
      <POSummaryBar summary={MOCK_SUMMARY} />,
    );
    const text = container.textContent ?? "";

    expect(text).toContain("4,609");
    expect(text).toContain("5");
    expect(text).toContain("Feb 22");
    expect(text).toContain("94");
    expect(text).toContain("High");
    expect(text).toContain("24");
    expect(text).toContain("3 New Items");
  });

  it("renders all section labels", () => {
    const { container } = render(
      <POSummaryBar summary={MOCK_SUMMARY} />,
    );
    const text = container.textContent ?? "";

    expect(text).toContain("PO");
    expect(text).toContain("VALUE");
    expect(text).toContain("LEAD TIME");
    expect(text).toContain("CONFIDENCE");
    expect(text).toContain("SKUS");
  });
});
