import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionLabel } from "./section-label";

describe("SectionLabel", () => {
  it("renders children text", () => {
    render(<SectionLabel variant="critical">Critical</SectionLabel>);
    expect(screen.getByText("Critical")).toBeInTheDocument();
  });

  it("applies critical variant color class", () => {
    render(<SectionLabel variant="critical">Critical</SectionLabel>);
    expect(screen.getByText("Critical")).toHaveClass("text-[#9e4545]");
  });

  it("applies warning variant color class", () => {
    render(<SectionLabel variant="warning">Warning</SectionLabel>);
    expect(screen.getByText("Warning")).toHaveClass("text-[#b45309]");
  });

  it("applies fyi variant color class", () => {
    render(<SectionLabel variant="fyi">FYI</SectionLabel>);
    expect(screen.getByText("FYI")).toHaveClass("text-[#3a5c10]");
  });
});
