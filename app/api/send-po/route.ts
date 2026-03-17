import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { GmailService } from "@services/server/gmail-service";
import { NextResponse } from "next/server";
import type { VendorOrder, SKULineItem } from "@models/procurement";
import { FormatService } from "@services/format";

export const dynamic = "force-dynamic";

// ── Email template ────────────────────────────────────────

function buildPOEmailBody({
  vendor,
  lineItems,
}: {
  vendor: VendorOrder;
  lineItems: readonly SKULineItem[];
}): string {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const totalValue = lineItems.reduce(
    (sum, item) => sum + item.orderValue,
    0,
  );

  const divider = "─".repeat(56);

  const lineItemRows = lineItems
    .map(
      (item) =>
        `  ${item.skuCode.padEnd(16)} ${item.name.padEnd(32)}\n` +
        `  ${"Qty:".padEnd(8)} ${String(item.recommendedQuantity).padStart(6)}  ` +
        `Unit: ${FormatService.currency(item.unitPrice).padEnd(10)}  ` +
        `Total: ${FormatService.currency(item.orderValue)}`,
    )
    .join("\n\n");

  return [
    `Dear ${vendor.vendorName} Team,`,
    ``,
    `Please find below our Purchase Order ${vendor.poSummary.poNumber}, issued ${today}.`,
    ``,
    divider,
    `PURCHASE ORDER`,
    divider,
    `PO Number:      ${vendor.poSummary.poNumber}`,
    `Order Date:     ${today}`,
    `Requested ETA:  ${vendor.poSummary.leadTimeEta} (${vendor.poSummary.leadTimeDays} business days)`,
    divider,
    `LINE ITEMS`,
    divider,
    lineItemRows,
    ``,
    divider,
    `TOTAL ORDER VALUE:  ${FormatService.currency(totalValue)}`,
    divider,
    ``,
    `Please confirm receipt of this purchase order and provide`,
    `a tracking reference once the order has been dispatched.`,
    ``,
    `Kind regards,`,
    `Pharmchat Procurement Team`,
  ].join("\n");
}

// ── Request validation ────────────────────────────────────

interface SendPOBody {
  vendor: VendorOrder;
  lineItems: readonly SKULineItem[];
}

function isSendPOBody(value: unknown): value is SendPOBody {
  return (
    typeof value === "object" &&
    value !== null &&
    "vendor" in value &&
    "lineItems" in value &&
    Array.isArray((value as SendPOBody).lineItems)
  );
}

// ── Route ─────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;

    const body: unknown = await request.json();

    if (!isSendPOBody(body)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const { vendor, lineItems } = body;

    if (!vendor.supplierEmail) {
      return NextResponse.json(
        { error: "No supplier email address on this vendor" },
        { status: 422 },
      );
    }

    const subject = `Purchase Order ${vendor.poSummary.poNumber} — ${vendor.vendorName}`;
    const emailBody = buildPOEmailBody({ vendor, lineItems });

    await GmailService.sendEmail({
      to: vendor.supplierEmail,
      subject,
      body: emailBody,
      accessToken,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[/api/send-po]", error);

    return NextResponse.json(
      { error: String(error) },
      { status: 500 },
    );
  }
}
