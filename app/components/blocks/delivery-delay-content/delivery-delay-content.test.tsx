import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DEMO_DELIVERY_DELAY } from "@demo/action-content-data";
import { DeliveryDelayContent } from "./delivery-delay-content";

const defaultProps = {
  title: "Delivery Delay: PO #1043",
  subtitle:
    "MedCore Distribution cold-chain vehicle out of service — delivery rescheduled by 48 hours.",
  data: DEMO_DELIVERY_DELAY,
};

describe("DeliveryDelayContent", () => {
  it("renders the title and subtitle", () => {
    render(<DeliveryDelayContent {...defaultProps} />);
    expect(screen.getByText("Delivery Delay: PO #1043")).toBeInTheDocument();
    expect(
      screen.getByText(
        "MedCore Distribution cold-chain vehicle out of service — delivery rescheduled by 48 hours.",
      ),
    ).toBeInTheDocument();
  });

  it("renders vendor and ETA information", () => {
    const { container } = render(<DeliveryDelayContent {...defaultProps} />);
    expect(container.textContent).toContain("MedCore Distribution");
    expect(container.textContent).toContain("Mon Mar 20");
    expect(container.textContent).toContain("Wed Mar 22");
    expect(container.textContent).toContain("+ 48 Hours");
  });

  it("renders all affected SKUs", () => {
    const { container } = render(<DeliveryDelayContent {...defaultProps} />);
    expect(container.textContent).toContain("LISIN10");
    expect(container.textContent).toContain("Lisinopril 10mg Tablets");
    expect(container.textContent).toContain("METOP50");
    expect(container.textContent).toContain("Metoprolol Succinate 50mg");
  });

  it("renders days on hand and safe through dates for SKUs", () => {
    const { container } = render(<DeliveryDelayContent {...defaultProps} />);
    expect(container.textContent).toContain("Days On Hand");
    expect(container.textContent).toContain("Safe through Mar 24");
    expect(container.textContent).toContain("Safe through Mar 23");
  });

  it("calls onAcknowledge when the acknowledge button is clicked", () => {
    const onAcknowledge = vi.fn();
    render(<DeliveryDelayContent {...defaultProps} onAcknowledge={onAcknowledge} />);
    fireEvent.click(screen.getByText("Acknowledge Delay"));
    expect(onAcknowledge).toHaveBeenCalledTimes(1);
  });
});
