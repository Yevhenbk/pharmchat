"use client";

import { useRef } from "react";
import { cn } from "@utilities/tailwind";

interface Props {
  placeholder?: string;
  onSubmit?: (message: string) => void;
  sendButton?: boolean;
  className?: string;
}

export function ChatInput({
  placeholder = "Ask Mira",
  onSubmit,
  sendButton = false,
  className,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const input = inputRef.current;

    if (!input) {
      return;
    }

    const value = input.value.trim();

    if (!value) {
      return;
    }

    onSubmit?.(value);
    input.value = "";
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key !== "Enter") {
      return;
    }

    handleSubmit();
  };

  return (
    <div className={cn("relative", className)}>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        className={cn(
          sendButton
            ? "w-full rounded-full border border-white/40 bg-white/25 backdrop-blur-xl px-5 py-3 text-sm text-text-primary shadow-[inset_0_0.5px_0_0_rgba(255,255,255,0.5),inset_0_-0.5px_0_0_rgba(255,255,255,0.1),0_1px_3px_rgba(0,0,0,0.06)] placeholder:text-text-muted-secondary focus:outline-none"
            : cn(
                "w-full rounded-lg border border-border/40 bg-card-bg",
                "px-3 py-2 text-sm text-text-primary",
                "placeholder:text-text-muted",
                "transition-all duration-[var(--transition-fast)]",
                "hover:border-border",
                "focus:border-info/40 focus:ring-2 focus:ring-info/20",
                "focus:outline-none",
              ),
          sendButton && "pr-12",
        )}
      />

      {sendButton ? (
        <button
          type="button"
          onClick={handleSubmit}
          className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-mira-olive transition-opacity hover:opacity-80"
          aria-label="Send message"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M7 12V2M7 2L2.5 6.5M7 2l4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : null}
    </div>
  );
}
