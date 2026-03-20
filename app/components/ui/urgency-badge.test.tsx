import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UrgencyBadge } from "./urgency-badge";

describe("UrgencyBadge", () => {
  it("renders Out of stock label", () => {
    render(<UrgencyBadge urgency="out-of-stock" />);
    expect(screen.getByText("Out of stock")).toBeInTheDocument();
  });

  it("renders Urgent label", () => {
    render(<UrgencyBadge urgency="urgent" />);
    expect(screen.getByText("Urgent")).toBeInTheDocument();
  });
});
