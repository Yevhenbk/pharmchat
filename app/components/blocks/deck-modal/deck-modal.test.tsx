import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DeckModal } from "./deck-modal";

describe("DeckModal", () => {
  it("renders nothing when mode is closed", () => {
    const { container } = render(
      <DeckModal state={{ mode: "closed" }} onClose={vi.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders dialog when mode is open", () => {
    render(
      <DeckModal state={{ mode: "po-queue" }} onClose={vi.fn()}>
        <div>Modal content</div>
      </DeckModal>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("renders close button by default", () => {
    render(
      <DeckModal state={{ mode: "critical" }} onClose={vi.fn()} />,
    );
    expect(
      screen.getByRole("button", { name: "Close modal" }),
    ).toBeInTheDocument();
  });

  it("hides close button when hideCloseButton is true", () => {
    render(
      <DeckModal state={{ mode: "critical" }} onClose={vi.fn()} hideCloseButton />,
    );
    expect(
      screen.queryByRole("button", { name: "Close modal" }),
    ).toBeNull();
  });
});
