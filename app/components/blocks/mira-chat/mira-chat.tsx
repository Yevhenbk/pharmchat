"use client";

import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { useSession } from "next-auth/react";

import { cn } from "@utilities/tailwind";
import { cssCustomProperties } from "@utilities/css";
import type { ChatMessage } from "@models/chat";
import { useDashboardStore } from "@providers/store-provider";
import { ChatInput } from "@components/ui/chat-input";
import { API_ROUTES } from "@/app/constants/api";

import { MiraChatHeader } from "./mira-chat-header";
import { MiraChatMessageList } from "./mira-chat-message-list";
import styles from "./mira-chat.module.scss";

const SIDEBAR_WIDTH = 80;

export function MiraChat() {
  const { data: session } = useSession();
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
  const greetingRequestedRef = useRef(false);

  const messages = useMemo(
    () => [...storeMessages, ...sessionMessages],
    [storeMessages, sessionMessages],
  );

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

  useEffect(() => {
    if (!open) {
      greetingRequestedRef.current = false;

      return;
    }

    if (messages.length > 0 || greetingRequestedRef.current) {
      return;
    }

    greetingRequestedRef.current = true;

    const loadingId = createMessageId();

    setSessionMessages((previous) => [
      ...previous,
      { id: loadingId, role: "assistant", content: "" },
    ]);

    const userName = session?.user?.name?.trim() || undefined;

    void fetch(API_ROUTES.MIRA_CHAT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "greeting", userName }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Greeting request failed: ${response.status}`);
        }

        const data: unknown = await response.json();

        return (
          typeof data === "object" &&
          data !== null &&
          "reply" in data &&
          typeof (data as Record<string, unknown>)["reply"] === "string"
            ? ((data as Record<string, unknown>)["reply"] as string)
            : `Hi ${userName ?? "there"}, I am Mira. How can I help with procurement today?`
        );
      })
      .catch(
        () => `Hi ${userName ?? "there"}, I am Mira. How can I help with procurement today?`,
      )
      .then((greeting) => {
        setSessionMessages((previous) =>
          previous.map((message) =>
            message.id === loadingId
              ? { ...message, content: greeting }
              : message,
          ),
        );
      });
  }, [open, messages.length, createMessageId, session?.user?.name]);

  const handleSubmit = useCallback(async (content: string) => {
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

    try {
      const conversation = [...messages, userMessage]
        .filter((message) => message.content.trim().length > 0)
        .map((message) => ({
          role: message.role,
          content: message.content,
        }));

      const response = await fetch(API_ROUTES.MIRA_CHAT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation }),
      });

      if (!response.ok) {
        throw new Error(`Mira chat request failed: ${response.status}`);
      }

      const data: unknown = await response.json();
      const reply =
        typeof data === "object" &&
        data !== null &&
        "reply" in data &&
        typeof (data as Record<string, unknown>)["reply"] === "string"
          ? ((data as Record<string, unknown>)["reply"] as string)
          : "I could not generate a response right now. Please try again.";

      setSessionMessages((previous) =>
        previous.map((message) =>
          message.id === loadingId
            ? { ...message, content: reply }
            : message,
        ),
      );
    } catch {
      const fallback =
        (
          cannedResponses.find((entry) =>
            entry.keywords
              .split(",")
              .map((keyword) => keyword.trim().toLowerCase())
              .filter(Boolean)
              .some((keyword) => content.toLowerCase().includes(keyword)),
          )?.response ?? defaultResponse
        ) || "Mira is temporarily unavailable. Please try again shortly.";

      setSessionMessages((previous) =>
        previous.map((message) =>
          message.id === loadingId
            ? { ...message, content: fallback }
            : message,
        ),
      );
    }
  }, [createMessageId, messages, cannedResponses, defaultResponse]);

  if (!shouldRender) {
    return null;
  }

  const viewportWidth =
    typeof window !== "undefined" ? window.innerWidth : 1280;

  const expandStyle = originRect
    ? cssCustomProperties({
        "--expand-origin-x": `${originRect.left - SIDEBAR_WIDTH + originRect.width / 2}px`,
        "--expand-origin-y": `${originRect.top + originRect.height / 2}px`,
        "--expand-start-scale": String(
          Math.min(
            Math.max(originRect.width / viewportWidth, 0.08),
            0.24,
          ),
        ),
      })
    : cssCustomProperties({
        "--expand-origin-x": "120px",
        "--expand-origin-y": "80px",
        "--expand-start-scale": "0.12",
      });

  return (
    <div
      className={cn(styles.overlay, isExiting ? styles.exiting : styles.entering)}
      style={expandStyle}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className={styles.chat}>
        <div className={styles.header}>
          <MiraChatHeader onClose={onClose} />
        </div>

        <div className={styles.card}>
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
