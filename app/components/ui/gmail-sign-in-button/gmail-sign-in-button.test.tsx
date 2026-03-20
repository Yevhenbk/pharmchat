import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { GmailSignInButton } from "./gmail-sign-in-button";

const mockSignIn = vi.fn();
const mockSignOut = vi.fn();

vi.mock("next-auth/react", () => ({
  useSession: vi.fn(() => ({ data: null })),
  signIn: mockSignIn,
  signOut: mockSignOut,
}));

import { useSession } from "next-auth/react";

describe("GmailSignInButton", () => {
  it("renders sign-in button when there is no session", () => {
    vi.mocked(useSession).mockReturnValue({ data: null, status: "unauthenticated", update: vi.fn() });
    render(<GmailSignInButton />);
    expect(
      screen.getByRole("button", { name: /sign in with google/i }),
    ).toBeInTheDocument();
  });

  it("renders connected state with user email when session exists", () => {
    vi.mocked(useSession).mockReturnValue({
      data: {
        user: { email: "pharmacist@example.com" },
        expires: "2099-01-01",
      },
      status: "authenticated",
      update: vi.fn(),
    });
    render(<GmailSignInButton />);
    expect(screen.getByText("pharmacist@example.com")).toBeInTheDocument();
    expect(screen.getByText(/gmail connected/i)).toBeInTheDocument();
  });

  it("renders a sign-out button when session exists", () => {
    vi.mocked(useSession).mockReturnValue({
      data: {
        user: { email: "user@example.com" },
        expires: "2099-01-01",
      },
      status: "authenticated",
      update: vi.fn(),
    });
    render(<GmailSignInButton />);
    expect(screen.getByRole("button", { name: /sign out/i })).toBeInTheDocument();
  });

  it("calls signOut when sign-out button is clicked", async () => {
    vi.mocked(useSession).mockReturnValue({
      data: {
        user: { email: "user@example.com" },
        expires: "2099-01-01",
      },
      status: "authenticated",
      update: vi.fn(),
    });
    render(<GmailSignInButton />);
    await userEvent.click(screen.getByRole("button", { name: /sign out/i }));
    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
});
