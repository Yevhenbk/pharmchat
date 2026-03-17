import { NextResponse } from "next/server";

import type { GmailEmail } from "@models/gmail-email";
import { GeminiService } from "@services/server/gemini-service";

function isGmailEmail(value: unknown): value is GmailEmail {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "from" in value &&
    "subject" in value &&
    "body" in value
  );
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("emails" in body) ||
      !Array.isArray((body as Record<string, unknown>)["emails"])
    ) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const emails = (
      (body as Record<string, unknown>)["emails"] as unknown[]
    ).filter(isGmailEmail);

    console.warn("[analyze-action-emails] received", emails.length, "emails:", emails.map(email => email.id));

    const analyses = await GeminiService.analyzeActionEmails({ emails });

    console.warn("[analyze-action-emails] returning analyses for keys:", Object.keys(analyses));

    return NextResponse.json(analyses);
  } catch (error) {
    console.error("[analyze-action-emails] Error:", error);

    return NextResponse.json({});
  }
}
