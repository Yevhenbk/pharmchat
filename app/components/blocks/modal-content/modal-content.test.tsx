import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ModalContent } from "./modal-content";

vi.mock("@providers/store-provider", () => ({
  useDashboardStore: vi.fn((selector) =>
    selector({
      actionItems: [],
      actionContentMap: {},
      nationalShortages: [],
      analyzeActionEmail: vi.fn(),
      analyzingActionIds: new Set(),
      failedAnalysisIds: new Set(),
    }),
  ),
}));

describe("ModalContent", () => {
  it("renders skeleton content when no actionId is provided", () => {
    const { container } = render(<ModalContent mode="critical" />);
    // The skeleton shimmer divs are present
    expect(container.querySelector(".skeleton-shimmer")).toBeTruthy();
  });

  it("returns null when mode is po-queue and no vendor is selected", () => {
    const { container } = render(
      <ModalContent mode="po-queue" selectedVendor={undefined} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders with an actionId in critical mode", () => {
    const { container } = render(
      <ModalContent mode="critical" actionId="action-1" />,
    );
    expect(container.firstChild).not.toBeNull();
  });
});
