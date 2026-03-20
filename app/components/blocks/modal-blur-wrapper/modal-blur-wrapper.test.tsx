import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ModalBlurWrapper } from "./modal-blur-wrapper";

describe("ModalBlurWrapper", () => {
  it("renders children", () => {
    render(
      <ModalBlurWrapper>
        <div>Modal Content</div>
      </ModalBlurWrapper>,
    );

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("renders multiple children", () => {
    render(
      <ModalBlurWrapper>
        <p>First child</p>
        <p>Second child</p>
      </ModalBlurWrapper>,
    );

    expect(screen.getByText("First child")).toBeInTheDocument();
    expect(screen.getByText("Second child")).toBeInTheDocument();
  });

  it("applies additional className when provided", () => {
    const { container } = render(
      <ModalBlurWrapper className="extra-class">
        <div>Content</div>
      </ModalBlurWrapper>,
    );

    expect(container.firstChild).toHaveClass("extra-class");
  });
});
