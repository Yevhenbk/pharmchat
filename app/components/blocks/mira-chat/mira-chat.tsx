"use client";

import { useState, useCallback, useRef } from "react";

import { cn } from "@utilities/tailwind";
import { cssCustomProperties } from "@utilities/css";
import type { ChatMessage } from "@models/chat";
import { useDashboardStore } from "@providers/store-provider";
import { buildResponseMatcher } from "@demo/chat-data";
import { ChatInput } from "@components/ui/chat-input";

import { MiraChatHeader } from "./mira-chat-header";
import { MiraChatMessageList } from "./mira-chat-message-list";
import styles from "./mira-chat.module.scss";

const SIDEBAR_WIDTH = 80;

export function MiraChat() {
  const open = useDashboardStore((state) => state.chatOpen);
  const onClose = useDashboardStore((state) => state.closeChat);
  const originRect = useDashboardStore((state) => state.widgetRect);
  const storeMessages = useDashboardStore(
    (state) => state.chatMessages,
  );
  const cannedResponses = useDashboardStore(
    (state) => state.cannedResponses,
  );
  const defaultResponse = useDashboardStore(
    (state) => state.defaultResponse,
  );
  const [sessionMessages, setSessionMessages] = useState<
    readonly ChatMessage[]
  >([]);
  const [shouldRender, setShouldRender] = useState(false);
  const messageCounterRef = useRef(0);

  const messages = [...storeMessages, ...sessionMessages];

  if (open && !shouldRender) {
    setShouldRender(true);
  }

  const isExiting = !open && shouldRender;

  const handleAnimationEnd = useCallback(
    (event: React.AnimationEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget) {
        return;
      }

      if (!open) {
        setShouldRender(false);
      }
    },
    [open]
  );

  const createMessageId = useCallback((): string => {
    messageCounterRef.current += 1;

    return `msg-${Date.now()}-${messageCounterRef.current}`;
  }, []);

  const handleSubmit = useCallback((content: string) => {
    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: "user",
      content,
    };

    const loadingId = createMessageId();

    const loadingMessage: ChatMessage = {
      id: loadingId,
      role: "assistant",
      content: "",
    };

    setSessionMessages((previous) => [
      ...previous,
      userMessage,
      loadingMessage,
    ]);

    setTimeout(() => {
      const getResponse = buildResponseMatcher({
        cannedResponses,
        defaultResponse,
      });

      setSessionMessages((previous) =>
        previous.map((message) =>
          message.id === loadingId
            ? { ...message, content: getResponse(content) }
            : message,
        ),
      );
    }, 1500);
  }, [createMessageId, cannedResponses, defaultResponse]);

  if (!shouldRender) {
    return null;
  }

  const clipStyle = originRect
    ? cssCustomProperties({
        "--clip-top": `${originRect.top}px`,
        "--clip-right": `${window.innerWidth - originRect.right}px`,
        "--clip-bottom": `${window.innerHeight - originRect.bottom}px`,
        "--clip-left": `${originRect.left - SIDEBAR_WIDTH}px`,
      })
    : {};

  return (
    <div
      className={cn(styles.overlay, isExiting ? styles.exiting : styles.entering)}
      style={clipStyle}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className={styles.chat}>
        <div className={styles.header}>
          <MiraChatHeader onClose={onClose} />
        </div>

        <div className={styles.card}>
          <div className={styles.cardBorder} aria-hidden />

          <div className={cn(styles.messages, "min-h-0 flex-1")}>
            <MiraChatMessageList messages={messages} />
          </div>

          <div className={cn(styles.input, "px-4")}>
            <ChatInput
              placeholder="Ask me anything..."
              onSubmit={handleSubmit}
              sendButton
            />
          </div>
        </div>
      </div>
    </div>
  );
}
