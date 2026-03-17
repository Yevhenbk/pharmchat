import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { GmailService } from "@services/server/gmail-service";
import { GeminiService } from "@services/server/gemini-service";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;

    const emails = await GmailService.fetchRecentEmails({
      limit: 20,
      accessToken,
    });

    const vendors = await GeminiService.parseSupplierEmails({ emails });

    return NextResponse.json(vendors);
  } catch (error) {
    console.error("[/api/parse-supplier-emails]", error);

    return NextResponse.json([]);
  }
}
