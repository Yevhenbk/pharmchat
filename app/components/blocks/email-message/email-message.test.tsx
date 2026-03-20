import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmailMessage } from "./email-message";

const fullEmailData = {
  from: "david.chen@clearpathrx.com",
  to: "procurement@greenfield-pharmacy.com",
  cc: "manager@greenfield-pharmacy.com",
  date: "Wed, 19 Mar 2026 08:14:22 +0000",
  subject: "URGENT — PO #2026-1099 Cancellation: Amoxicillin 500mg Capsules",
  body: "Sam,\n\nWe regret to inform you that we are unable to fulfil Purchase Order #2026-1099.\n\nRegards,\nDavid Chen",
};

const minimalEmailData = {
  from: "logistics@medcore-distribution.com",
  subject: "UPDATE: PO #1043 Delivery Rescheduled",
  body: "Hi Team,\n\nA quick update on your scheduled delivery for PO #1043. Delivery rescheduled to Thursday.",
};

describe("EmailMessage", () => {
  it("renders From and Subject fields always", () => {
    render(<EmailMessage data={minimalEmailData} />);
    expect(screen.getByText("From")).toBeInTheDocument();
    expect(screen.getByText("logistics@medcore-distribution.com")).toBeInTheDocument();
    expect(screen.getByText("Subject")).toBeInTheDocument();
    expect(
      screen.getByText("UPDATE: PO #1043 Delivery Rescheduled"),
    ).toBeInTheDocument();
  });

  it("renders To, Date, and CC fields when provided", () => {
    render(<EmailMessage data={fullEmailData} />);
    expect(screen.getByText("To")).toBeInTheDocument();
    expect(
      screen.getByText("procurement@greenfield-pharmacy.com"),
    ).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(
      screen.getByText("Wed, 19 Mar 2026 08:14:22 +0000"),
    ).toBeInTheDocument();
    expect(screen.getByText("CC")).toBeInTheDocument();
    expect(
      screen.getByText("manager@greenfield-pharmacy.com"),
    ).toBeInTheDocument();
  });

  it("does not render To and Date when they are absent", () => {
    render(<EmailMessage data={minimalEmailData} />);
    expect(screen.queryByText("To")).not.toBeInTheDocument();
    expect(screen.queryByText("Date")).not.toBeInTheDocument();
    expect(screen.queryByText("CC")).not.toBeInTheDocument();
  });

  it("renders the email body split into paragraphs on double newlines", () => {
    render(<EmailMessage data={fullEmailData} />);
    expect(screen.getByText(/We regret to inform you/)).toBeInTheDocument();
    expect(screen.getByText(/Regards,/)).toBeInTheDocument();
  });

  it("applies a custom className to the container", () => {
    const { container } = render(
      <EmailMessage data={minimalEmailData} className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
