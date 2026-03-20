import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ActionFooter } from "./action-footer";

describe("ActionFooter", () => {
  describe("approve-reject variant", () => {
    it("renders Approve and Reject buttons", () => {
      render(<ActionFooter variant="approve-reject" />);

      expect(screen.getByText("Approve")).toBeInTheDocument();
      expect(screen.getByText("Reject")).toBeInTheDocument();
    });

    it("calls onApprove when Approve button is clicked", async () => {
      const onApprove = vi.fn();
      render(<ActionFooter variant="approve-reject" onApprove={onApprove} />);

      await userEvent.click(screen.getByText("Approve"));

      expect(onApprove).toHaveBeenCalledTimes(1);
    });

    it("calls onReject when Reject button is clicked", async () => {
      const onReject = vi.fn();
      render(<ActionFooter variant="approve-reject" onReject={onReject} />);

      await userEvent.click(screen.getByText("Reject"));

      expect(onReject).toHaveBeenCalledTimes(1);
    });
  });

  describe("acknowledge variant", () => {
    it("renders the acknowledge label", () => {
      render(
        <ActionFooter
          variant="acknowledge"
          acknowledgeLabel="Acknowledge Delay"
        />,
      );

      expect(screen.getByText("Acknowledge Delay")).toBeInTheDocument();
    });

    it("calls onAcknowledge when button is clicked", async () => {
      const onAcknowledge = vi.fn();
      render(
        <ActionFooter
          variant="acknowledge"
          acknowledgeLabel="Acknowledge Early Arrival"
          onAcknowledge={onAcknowledge}
        />,
      );

      await userEvent.click(screen.getByText("Acknowledge Early Arrival"));

      expect(onAcknowledge).toHaveBeenCalledTimes(1);
    });

    it("does not render Approve or Reject buttons", () => {
      render(
        <ActionFooter
          variant="acknowledge"
          acknowledgeLabel="Confirm"
        />,
      );

      expect(screen.queryByText("Approve")).not.toBeInTheDocument();
      expect(screen.queryByText("Reject")).not.toBeInTheDocument();
    });
  });
});
