import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { GmailService } from "@services/server/gmail-service";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;

    const emails = await GmailService.fetchRecentEmails({
      limit: 30,
      accessToken,
    });

    return NextResponse.json(emails);
  } catch (error) {
    console.error("[/api/emails]", error);

    return NextResponse.json([]);
  }
}
