"use client";

import { useEffect, useRef, useMemo } from "react";
import { LayoutGroup } from "motion/react";
import type { ChatMessage } from "@models/chat";
import { MiraChatMessage } from "./mira-chat-message";

interface Props {
  messages: readonly ChatMessage[];
}

export function MiraChatMessageList({
  messages,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const lastAssistantId = useMemo(() => {
    const lastAssistant = [...messages]
      .reverse()
      .find((message) => message.role === "assistant");

    return lastAssistant?.id ?? null;
  }, [messages]);

  return (
    <LayoutGroup>
      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-6">
        {messages.map((message) => (
          <MiraChatMessage
            key={message.id}
            message={message}
            isLastAssistant={message.id === lastAssistantId}
          />
        ))}

        <div ref={bottomRef} />
      </div>
    </LayoutGroup>
  );
}
