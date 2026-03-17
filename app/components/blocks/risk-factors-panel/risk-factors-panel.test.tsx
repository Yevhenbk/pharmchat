import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { RiskFactor } from "@models/procurement";

import { RiskFactorsPanel } from "./risk-factors-panel";

const MOCK_FACTORS: readonly RiskFactor[] = [
  { id: "rf-1", label: "Demand Spike (+15%)", severity: "critical" },
  { id: "rf-2", label: "Weather warning", severity: "warning" },
];

describe("RiskFactorsPanel", () => {
  it("renders the risk factors label and all badges", () => {
    const { container } = render(
      <RiskFactorsPanel factors={MOCK_FACTORS} />,
    );
    const text = container.textContent ?? "";

    expect(text).toContain("RISK FACTORS");
    expect(text).toContain("Demand Spike (+15%)");
    expect(text).toContain("Weather warning");
  });

  it("returns null when factors array is empty", () => {
    const { container } = render(
      <RiskFactorsPanel factors={[]} />,
    );

    expect(container.firstChild).toBeNull();
  });
});
