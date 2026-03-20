import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProgressBar } from "./progress-bar";

describe("ProgressBar", () => {
  it("renders an inner fill bar with correct width", () => {
    const { container } = render(<ProgressBar value={60} />);
    const fill = container.querySelector<HTMLDivElement>("div > div");
    expect(fill).toHaveStyle({ width: "60%" });
  });

  it("clamps value at 100% maximum", () => {
    const { container } = render(<ProgressBar value={200} />);
    const fill = container.querySelector<HTMLDivElement>("div > div");
    expect(fill).toHaveStyle({ width: "100%" });
  });

  it("clamps value at 0% minimum", () => {
    const { container } = render(<ProgressBar value={-10} />);
    const fill = container.querySelector<HTMLDivElement>("div > div");
    expect(fill).toHaveStyle({ width: "0%" });
  });

  it("renders 0% fill for zero value", () => {
    const { container } = render(<ProgressBar value={0} />);
    const fill = container.querySelector<HTMLDivElement>("div > div");
    expect(fill).toHaveStyle({ width: "0%" });
  });
});
