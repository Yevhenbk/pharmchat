import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CountUpValue } from "./count-up-value";

vi.mock("@hooks/use-count-up", () => ({
  useCountUp: ({ target }: { target: number }) => target,
}));

describe("CountUpValue", () => {
  it("renders the target value", () => {
    render(<CountUpValue target={42} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders with a prefix", () => {
    render(<CountUpValue target={100} prefix="$" />);
    expect(screen.getByText("$100")).toBeInTheDocument();
  });

  it("renders with thousands separator", () => {
    render(<CountUpValue target={1500} separator />);
    expect(screen.getByText("1,500")).toBeInTheDocument();
  });

  it("renders zero target", () => {
    render(<CountUpValue target={0} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
