import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ModalButton } from "./modal-button";

describe("ModalButton", () => {
  it("renders children text", () => {
    render(<ModalButton variant="approve">Approve Order</ModalButton>);
    expect(screen.getByRole("button", { name: "Approve Order" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(
      <ModalButton variant="approve" onClick={onClick}>
        Approve
      </ModalButton>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies reject variant styling", () => {
    render(<ModalButton variant="reject">Reject</ModalButton>);
    expect(screen.getByRole("button")).toHaveClass("bg-critical");
  });

  it("applies approve variant styling", () => {
    render(<ModalButton variant="approve">Approve</ModalButton>);
    expect(screen.getByRole("button")).toHaveClass("bg-mira-olive");
  });
});
