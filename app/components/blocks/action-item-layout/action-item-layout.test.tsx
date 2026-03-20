import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ActionItemLayout } from "./action-item-layout";

describe("ActionItemLayout", () => {
  it("renders title and subtitle", () => {
    render(
      <ActionItemLayout
        title="Action Items"
        subtitle="3 items require your attention"
        footer={<div>Footer</div>}
      >
        <div>Content</div>
      </ActionItemLayout>,
    );

    expect(screen.getByText("Action Items")).toBeInTheDocument();
    expect(screen.getByText("3 items require your attention")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <ActionItemLayout
        title="Action Items"
        subtitle="Subtitle"
        footer={<div>Footer</div>}
      >
        <div>Child Content Here</div>
      </ActionItemLayout>,
    );

    expect(screen.getByText("Child Content Here")).toBeInTheDocument();
  });

  it("renders footer content", () => {
    render(
      <ActionItemLayout
        title="Action Items"
        subtitle="Subtitle"
        footer={<div>Footer Area</div>}
      >
        <div>Content</div>
      </ActionItemLayout>,
    );

    expect(screen.getByText("Footer Area")).toBeInTheDocument();
  });

  it("renders title as an h2 element", () => {
    render(
      <ActionItemLayout
        title="Procurement Alerts"
        subtitle="Subtitle"
        footer={<div>Footer</div>}
      >
        <div>Content</div>
      </ActionItemLayout>,
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Procurement Alerts");
  });
});
