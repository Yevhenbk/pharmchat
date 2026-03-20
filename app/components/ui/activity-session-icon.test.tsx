import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ActivitySessionIcon } from "./activity-session-icon";

describe("ActivitySessionIcon", () => {
  it("renders a DOM element for email icon", () => {
    const { container } = render(<ActivitySessionIcon icon="email" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders a DOM element for call icon", () => {
    const { container } = render(<ActivitySessionIcon icon="call" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders a DOM element for x icon", () => {
    const { container } = render(<ActivitySessionIcon icon="x" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders an SVG for the email icon type", () => {
    const { container } = render(
      <ActivitySessionIcon icon="email" variant="queued" />,
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
