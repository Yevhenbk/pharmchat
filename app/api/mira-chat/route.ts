import { NextResponse } from "next/server";
import Groq from "groq-sdk";

type ChatRole = "user" | "assistant";

interface ClientMessage {
  role: ChatRole;
  content: string;
}

interface GreetingRequest {
  mode: "greeting";
  userName?: string;
}

function isGreetingRequest(value: unknown): value is GreetingRequest {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const body = value as Record<string, unknown>;

  return body["mode"] === "greeting";
}

const CHAT_MODEL = "llama-3.1-8b-instant";

const SYSTEM_PROMPT = `You are Mira, an AI assistant for pharmacy procurement workflows.
- Keep responses concise and practical.
- Prioritize medication supply continuity, stockout prevention, and purchase-order decisions.
- When data is uncertain, say so briefly and suggest the next best action.
- Never fabricate policy citations.`;

function isClientMessage(value: unknown): value is ClientMessage {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const message = value as Record<string, unknown>;

  return (
    (message["role"] === "user" || message["role"] === "assistant") &&
    typeof message["content"] === "string"
  );
}

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured." },
        { status: 503 },
      );
    }

    const body: unknown = await request.json();

    const client = new Groq({ apiKey });

    if (isGreetingRequest(body)) {
      const userName =
        typeof body.userName === "string" && body.userName.trim().length > 0
          ? body.userName.trim()
          : "there";

      const completion = await client.chat.completions.create({
        model: CHAT_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content:
              `Write a warm one-sentence opening greeting to ${userName} for a pharmacy procurement assistant chat. Keep it under 20 words and do not use markdown.`,
          },
        ],
        temperature: 0.5,
      });

      const reply = completion.choices[0]?.message?.content?.trim();

      if (!reply) {
        return NextResponse.json(
          { reply: `Hi ${userName}, I am Mira. How can I help with procurement today?` },
        );
      }

      return NextResponse.json({ reply });
    }

    if (
      typeof body !== "object" ||
      body === null ||
      !("messages" in body) ||
      !Array.isArray((body as Record<string, unknown>)["messages"])
    ) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 },
      );
    }

    const messages = (
      (body as Record<string, unknown>)["messages"] as unknown[]
    ).filter(isClientMessage);

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "At least one message is required." },
        { status: 400 },
      );
    }

    const completion = await client.chat.completions.create({
      model: CHAT_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.4,
    });

    const reply = completion.choices[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { error: "Model returned an empty response." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[/api/mira-chat]", error);

    return NextResponse.json(
      { error: "Failed to generate Mira response." },
      { status: 500 },
    );
  }
}
