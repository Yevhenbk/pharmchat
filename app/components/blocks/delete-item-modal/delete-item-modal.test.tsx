import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DeleteItemModal } from "./delete-item-modal";

const DEFAULT_PROPS = {
  itemName: "Amoxicillin 500mg Capsules",
  onConfirm: vi.fn(),
  onCancel: vi.fn(),
};

describe("DeleteItemModal", () => {
  it("renders the item name in the heading and description", () => {
    render(<DeleteItemModal {...DEFAULT_PROPS} />);

    expect(
      screen.getByText("Delete Amoxicillin 500mg Capsules"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Are you sure you want to delete Amoxicillin 500mg Capsules?",
      ),
    ).toBeInTheDocument();
  });

  it("renders Cancel and Delete buttons", () => {
    render(<DeleteItemModal {...DEFAULT_PROPS} />);

    expect(
      screen.getByRole("button", { name: "Cancel" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Delete" }),
    ).toBeInTheDocument();
  });

  it("calls onCancel when the Cancel button is clicked", () => {
    const handleCancel = vi.fn();

    render(<DeleteItemModal {...DEFAULT_PROPS} onCancel={handleCancel} />);
    screen.getByRole("button", { name: "Cancel" }).click();

    expect(handleCancel).toHaveBeenCalledOnce();
  });

  it("calls onConfirm when the Delete button is clicked", () => {
    const handleConfirm = vi.fn();

    render(<DeleteItemModal {...DEFAULT_PROPS} onConfirm={handleConfirm} />);
    screen.getByRole("button", { name: "Delete" }).click();

    expect(handleConfirm).toHaveBeenCalledOnce();
  });

  it("renders as an alertdialog with correct aria attributes", () => {
    render(<DeleteItemModal {...DEFAULT_PROPS} />);

    const dialog = screen.getByRole("alertdialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });
});
