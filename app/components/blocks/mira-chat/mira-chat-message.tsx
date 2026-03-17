import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@utilities/tailwind";
import type { ChatMessage } from "@models/chat";
import { MiraBulbMini } from "@components/icons/mira-bulb-mini";

const CHAR_DELAY_MS = 6;

function Typewriter({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const [charIndex, setCharIndex] = useState(0);
  const isTyping = charIndex < content.length;

  useEffect(() => {
    if (!isTyping) {
      return;
    }

    const timer = setTimeout(() => {
      setCharIndex((previous) => previous + 1);
    }, CHAR_DELAY_MS);

    return () => clearTimeout(timer);
  }, [charIndex, isTyping]);

  return (
    <p className={className}>
      {content.slice(0, charIndex)}
      {isTyping ? (
        <span className="ml-0.5 inline-block h-[1em] w-px animate-pulse bg-text-primary align-middle" />
      ) : null}
    </p>
  );
}

interface Props {
  message: ChatMessage;
  isLastAssistant?: boolean;
}

export function MiraChatMessage({
  message,
  isLastAssistant = false,
}: Props) {
  const isUser = message.role === "user";
  const isLoading = message.role === "assistant" && !message.content;
  const [contentOnMount] = useState(message.content);
  const shouldType = !isLoading && !contentOnMount && !!message.content;

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className={cn(
            "max-w-[60%] rounded-xl bg-card-bg px-5 py-4",
            "text-sm leading-relaxed text-text-primary",
            "border border-border/10",
          )}
        >
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center">
        {isLastAssistant ? (
          <motion.div
            layoutId="mira-bulb-indicator"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={isLoading ? "animate-pulse" : undefined}
          >
            <MiraBulbMini className="size-7 -m-1" />
          </motion.div>
        ) : null}
      </div>

      {isLoading ? (
        <p className="text-sm leading-relaxed text-text-muted">
          Fetching information...
        </p>
      ) : shouldType ? (
        <Typewriter
          key={message.id}
          content={message.content}
          className="text-sm leading-relaxed text-text-primary"
        />
      ) : (
        <p className="text-sm leading-relaxed text-text-primary">
          {message.content}
        </p>
      )}
    </div>
  );
}
