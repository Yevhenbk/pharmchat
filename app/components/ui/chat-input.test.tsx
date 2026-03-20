import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ChatInput } from "./chat-input";

describe("ChatInput", () => {
  it("renders with default placeholder", () => {
    render(<ChatInput />);
    expect(screen.getByPlaceholderText("Ask Mira")).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    render(<ChatInput placeholder="Search products..." />);
    expect(screen.getByPlaceholderText("Search products...")).toBeInTheDocument();
  });

  it("renders send button when sendButton prop is true", () => {
    render(<ChatInput sendButton />);
    expect(screen.getByRole("button", { name: "Send message" })).toBeInTheDocument();
  });

  it("calls onSubmit with input value when Enter is pressed", () => {
    const onSubmit = vi.fn();
    render(<ChatInput onSubmit={onSubmit} />);
    const input = screen.getByPlaceholderText("Ask Mira");
    fireEvent.change(input, { target: { value: "hello" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSubmit).toHaveBeenCalledWith("hello");
  });
});
