import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { DemandSignal } from "@models/procurement";

import { DemandSignalsPanel } from "./demand-signals-panel";

const MOCK_SIGNAL: DemandSignal = {
  summary: "Projected demand spike correlating with holiday weekend.",
};

describe("DemandSignalsPanel", () => {
  it("renders the demand signals label", () => {
    render(<DemandSignalsPanel signal={MOCK_SIGNAL} />);

    expect(screen.getByText("DEMAND SIGNALS")).toBeInTheDocument();
  });

  it("renders the signal summary text", () => {
    const { container } = render(
      <DemandSignalsPanel signal={MOCK_SIGNAL} />,
    );

    expect(container.textContent).toContain(
      "Projected demand spike",
    );
  });
});
