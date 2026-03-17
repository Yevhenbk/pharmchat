import "server-only";

import Groq from "groq-sdk";

import type { GmailEmail } from "@models/gmail-email";
import type { VendorOrder } from "@models/procurement";
import type { LiveEmailAnalysis } from "@models/action-content";

// ── Models ────────────────────────────────────────────────

const PO_MODEL = "llama-3.3-70b-versatile";
const ANALYSIS_MODEL = "llama-3.1-8b-instant";

// ── Supplier email filter ─────────────────────────────────

const SUPPLIER_PATTERN =
  /order|quotat|quote|availab|backorder|back-order|shipment|invoice|purchase\s+order|\bPO\b|delivery|shortage|supply|fulfil|catalog|price\s+list|backordered|out\s+of\s+stock|lead\s+time|dispatch/i;

const BOT_PATTERN =
  /\[bot\]|noreply|no-reply|do-not-reply|donotreply|automated|notifications?@|alerts?@|system@|github\.com|gitlab\.com/i;

function isSupplierEmail(email: GmailEmail): boolean {
  if (BOT_PATTERN.test(email.from)) {
    return false;
  }

  return SUPPLIER_PATTERN.test(`${email.subject} ${email.body}`);
}

// ── Prompt ───────────────────────────────────────────────

const SCHEMA_DESCRIPTION = `
{
  "id": "kebab-case slug derived from vendor name (e.g. 'acme-pharma')",
  "vendorName": "Supplier company name",
  "urgency": "out-of-stock" | "urgent" | null,
  "value": <total order value in USD as a number>,
  "skuCount": <number of SKUs>,
  "earliestStockout": "Abbreviated month + day of earliest stockout (e.g. 'Jan 23'). Use today's date + 7 days if unknown.",
  "poSummary": {
    "poNumber": "PO reference from email, or generate a unique placeholder like 'PO-' followed by a random 4-digit number (e.g. 'PO-3847') if absent",
    "value": <same as top-level value>,
    "leadTimeDays": <number — estimate 5 if not stated>,
    "leadTimeEta": "Abbreviated ETA date (e.g. 'Jan 28')",
    "confidencePercent": <integer 50–99 reflecting how complete the data in the email is>,
    "confidenceLabel": "Low" | "Medium" | "High" | "Very High",
    "skuCount": <same as top-level skuCount>,
    "skuNote": "e.g. '2 at risk', '1 backordered', 'All clear'"
  },
  "demandSignal": {
    "summary": "1–2 sentence description of demand drivers or supply situation from the email"
  },
  "riskFactors": [
    { "id": "rf-1", "label": "Short description of risk", "severity": "critical" | "warning" | "info" }
  ],
  "lineItems": [
    {
      "id": "li-1",
      "skuCode": "Pharmaceutical code or abbreviation",
      "name": "Full product name including strength and form",
      "status": "out-of-stock" | "urgent" | "low-stock" | "normal",
      "currentInventory": <estimated units on hand — use 0 if out-of-stock, else 50>,
      "runOutDate": "Abbreviated run-out date (e.g. 'Jan 25')",
      "unitPrice": <USD price per unit as a number — estimate from market if not stated>,
      "recommendedQuantity": <suggested order quantity>,
      "orderValue": <unitPrice × recommendedQuantity>
    }
  ]
}`;

function buildPrompt(email: GmailEmail): string {
  return `You are a pharmaceutical procurement AI assistant. Parse the following supplier email and extract a structured purchase order object.

Rules:
- Return ONLY valid JSON — no markdown, no explanation, no code fences.
- Fill every field. If data is missing from the email, make a reasonable pharmaceutical procurement estimate.
- Dates use abbreviated month + day format: "Jan 23", "Feb 4", etc. Use today as ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}.
- Monetary values are plain numbers in USD (no currency symbols).
- urgency is "out-of-stock" if any SKU is out of stock, "urgent" if lead time is ≤3 days or stockout is within 5 days, otherwise null.
- confidencePercent reflects data completeness: 90–99 if email is detailed, 70–89 if partial, 50–69 if very sparse.

Output schema:
${SCHEMA_DESCRIPTION}

Email:
From: ${email.from}
Subject: ${email.subject}
Date: ${email.date}
Body:
${email.body.slice(0, 3000)}`;
}

// ── Validation ───────────────────────────────────────────

function isVendorOrder(value: unknown): value is VendorOrder {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const v = value as Record<string, unknown>;

  return (
    typeof v["id"] === "string" &&
    typeof v["vendorName"] === "string" &&
    typeof v["value"] === "number" &&
    typeof v["skuCount"] === "number" &&
    typeof v["poSummary"] === "object" &&
    v["poSummary"] !== null &&
    typeof v["demandSignal"] === "object" &&
    v["demandSignal"] !== null &&
    Array.isArray(v["riskFactors"]) &&
    Array.isArray(v["lineItems"])
  );
}

// ── Retry helpers ─────────────────────────────────────────

const RETRY_DELAY_MS = 4000;
const MAX_RETRIES = 2;
const ANALYSIS_MAX_RETRIES = 2;

// If the API signals a retry delay longer than this, bail immediately.
const MAX_SENSIBLE_RETRY_MS = 30_000;

function getRetryAfterMs(error: unknown, fallback: number): number {
  if (error instanceof Groq.APIError) {
    const retryAfter = error.headers?.get("retry-after");

    if (retryAfter) {
      const seconds = parseFloat(retryAfter);

      if (!Number.isNaN(seconds)) {
        return Math.ceil(seconds * 1000) + 500;
      }
    }
  }

  return fallback;
}

// ── PO parse ─────────────────────────────────────────────

async function parseWithRetry({
  client,
  email,
}: {
  client: Groq;
  email: GmailEmail;
}): Promise<VendorOrder | "rate-limited" | null> {
  // eslint-disable-next-line no-restricted-syntax
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const completion = await client.chat.completions.create({
        model: PO_MODEL,
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: buildPrompt(email) }],
      });

      const text = completion.choices[0]?.message?.content ?? "";
      const parsed: unknown = JSON.parse(text);

      if (!isVendorOrder(parsed)) {
        console.warn(
          `[AIService] Invalid VendorOrder from email ${email.id}`,
        );

        return null;
      }

      return parsed;
    } catch (error) {
      const is429 =
        error instanceof Groq.APIError && error.status === 429;
      const is503 =
        error instanceof Groq.APIError && error.status === 503;

      if (is429) {
        return "rate-limited";
      }

      if (is503 && attempt < MAX_RETRIES) {
        console.warn(
          `[AIService] 503 on email ${email.id}, retrying in ${RETRY_DELAY_MS}ms (attempt ${attempt}/${MAX_RETRIES})`,
        );

        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
        continue;
      }

      console.error(`[AIService] Failed to parse email ${email.id}:`, error);

      return null;
    }
  }

  return null;
}

// ── Action email analysis ─────────────────────────────────

const ANALYSIS_SCHEMA = `
{
  "emailId": "<echo the email id passed in>",
  "orderDetails": {
    "vendor": "Company name if stated; otherwise use the sender's display name from the From field. Use '—' only if truly unidentifiable.",
    "skus": "Comma-separated drug codes or names (e.g. 'Amoxicillin 500mg, NDC 0005-0072-01'), or '—'",
    "quantity": "e.g. '500 units' — extract from email body, or '—'",
    "value": "Total order value in USD (compute quantity × unit price if both stated), e.g. '$90.00' or '—'",
    "date": "Order or email date e.g. 'Jan 23, 2025' or '—'",
    "poRef": "PO number or order reference from the email, or '—'"
  },
  "impactAnalysis": {
    "stockoutRisk": "Assess from context: 'Low' if supplier proactively offers stock; 'High — est. X days' if shortage or backorder reported; 'Medium' if uncertain but time-sensitive. Never return 'Unknown' — always make a clinical estimate.",
    "financialExposure": "Use computed order value if available (e.g. '$90.00'); otherwise estimate from drug type and quantity. Never return 'Unknown'.",
    "rxAtRisk": "e.g. 'Est. 10–20 active Rxs' based on drug type and typical dispensing volume. Never return 'Unknown'.",
    "shortageListed": "'Yes (FDA)' if drug is a known national shortage, 'No' if not, 'Check FDA' if uncertain"
  },
  "recommendedActions": [
    "Verb-first, specific action referencing the actual drug/supplier/quantity from this email",
    "Second specific action",
    "Third specific action"
  ],
  "miraInsight": "1–2 sentence expert clinical procurement insight referencing the specific drug, supplier, and situation in this email",
  "ifIgnored": "1–2 sentence description of the concrete risk if no action is taken, specific to this drug and situation",
  "ifActioned": "1–2 sentence description of the concrete benefit if recommended actions are followed"
}`;

function buildAnalysisPrompt(email: GmailEmail): string {
  return `You are a pharmaceutical procurement AI assistant. Analyse the following supplier email and return a structured JSON analysis object.

Rules:
- Return ONLY valid JSON — no markdown, no explanation, no code fences.
- Be specific. Reference actual drug names, quantities, prices, and supplier names from the email.
- vendor: use the sender's display name if no company is stated — never return '—' unless the From field is completely empty.
- financialExposure: if quantity and unit price are both in the email, multiply them and report the result.
- stockoutRisk / financialExposure / rxAtRisk: always provide a concrete estimate — never return 'Unknown'.
- shortageListed: answer based on your knowledge of FDA drug shortages.
- recommendedActions: 3 specific, verb-first actions a pharmacist should take now (e.g. "Place order for 500 units of Amoxicillin 500mg at $0.18/unit from [vendor]").
- Today's date is ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}.

Output schema:
${ANALYSIS_SCHEMA}

Email id: ${email.id}
From: ${email.from}
Subject: ${email.subject}
Date: ${email.date}
Body:
${email.body.slice(0, 3000)}`;
}

function extractStringOrFallback(value: unknown, fallback = "—"): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function extractAnalysis(
  value: unknown,
): (LiveEmailAnalysis & { emailId: string }) | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const v = value as Record<string, unknown>;

  if (typeof v["emailId"] !== "string") {
    return null;
  }

  const od = (v["orderDetails"] ?? {}) as Record<string, unknown>;
  const ia = (v["impactAnalysis"] ?? {}) as Record<string, unknown>;
  const actions = Array.isArray(v["recommendedActions"])
    ? (v["recommendedActions"] as unknown[]).filter(
        (a): a is string => typeof a === "string",
      )
    : [];

  return {
    emailId: v["emailId"],
    orderDetails: {
      vendor: extractStringOrFallback(od["vendor"]),
      skus: extractStringOrFallback(od["skus"]),
      quantity: extractStringOrFallback(od["quantity"]),
      value: extractStringOrFallback(od["value"]),
      date: extractStringOrFallback(od["date"]),
      poRef: extractStringOrFallback(od["poRef"]),
    },
    impactAnalysis: {
      stockoutRisk: extractStringOrFallback(ia["stockoutRisk"]),
      financialExposure: extractStringOrFallback(ia["financialExposure"]),
      rxAtRisk: extractStringOrFallback(ia["rxAtRisk"]),
      shortageListed: extractStringOrFallback(ia["shortageListed"]),
    },
    recommendedActions: actions,
    miraInsight: extractStringOrFallback(v["miraInsight"], ""),
    ifIgnored: extractStringOrFallback(v["ifIgnored"], ""),
    ifActioned: extractStringOrFallback(v["ifActioned"], ""),
  };
}

// ── Service ───────────────────────────────────────────────

export class GeminiService {
  static async parseSupplierEmails({
    emails,
    limit = 10,
  }: {
    emails: readonly GmailEmail[];
    limit?: number;
  }): Promise<readonly VendorOrder[]> {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.warn("[AIService] GROQ_API_KEY not set — skipping parse");

      return [];
    }

    const supplierEmails = emails.filter(isSupplierEmail).slice(0, limit);

    if (supplierEmails.length === 0) {
      console.warn("[AIService] No supplier emails found");

      return [];
    }

    console.warn(
      `[AIService] Parsing ${supplierEmails.length} supplier emails`,
    );

    const client = new Groq({ apiKey });

    const results: Array<VendorOrder | null> = [];

    for (const email of supplierEmails) {
      // eslint-disable-next-line no-await-in-loop
      const vendor = await parseWithRetry({ client, email });

      if (vendor === "rate-limited") {
        console.warn("[AIService] Rate limited — stopping early");
        break;
      }

      if (vendor !== null) {
        results.push({ ...vendor, supplierEmail: email.from });
      } else {
        results.push(null);
      }
    }

    const vendors = results.filter(
      (v): v is VendorOrder => v !== null && v.lineItems.length > 0,
    );

    console.warn(
      `[AIService] Successfully parsed ${vendors.length} vendor orders`,
    );

    return vendors;
  }

  static async analyzeActionEmails({
    emails,
    limit = 5,
  }: {
    emails: readonly GmailEmail[];
    limit?: number;
  }): Promise<Record<string, LiveEmailAnalysis>> {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.warn(
        "[AIService] GROQ_API_KEY not set — skipping email analysis",
      );

      return {};
    }

    const targetEmails = emails.slice(0, limit);

    if (targetEmails.length === 0) {
      return {};
    }

    console.warn(
      `[AIService] Analysing ${targetEmails.length} action emails`,
    );

    const client = new Groq({ apiKey });
    const analyses: Record<string, LiveEmailAnalysis> = {};

    for (const email of targetEmails) {
      let succeeded = false;

      for (let attempt = 1; attempt <= ANALYSIS_MAX_RETRIES; attempt += 1) {
        try {
          // eslint-disable-next-line no-await-in-loop
          const completion = await client.chat.completions.create({
            model: ANALYSIS_MODEL,
            response_format: { type: "json_object" },
            messages: [
              { role: "user", content: buildAnalysisPrompt(email) },
            ],
          });

          const text = completion.choices[0]?.message?.content ?? "";

          console.warn(
            `[AIService] Raw analysis for ${email.id}:`,
            text.slice(0, 300),
          );

          const parsed: unknown = JSON.parse(text);
          const extracted = extractAnalysis(parsed);

          console.warn(
            `[AIService] extractAnalysis result for ${email.id}:`,
            extracted ? "OK" : "FAILED",
          );

          if (!extracted) {
            console.warn(
              `[AIService] Could not extract analysis for email ${email.id}`,
              parsed,
            );
            break;
          }

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { emailId: _, ...analysis } = extracted;

          analyses[email.id] = analysis;
          succeeded = true;
          break;
        } catch (error) {
          const is429 =
            error instanceof Groq.APIError && error.status === 429;
          const is503 =
            error instanceof Groq.APIError && error.status === 503;

          if (is429) {
            const delayMs = getRetryAfterMs(error, RETRY_DELAY_MS);

            if (delayMs > MAX_SENSIBLE_RETRY_MS) {
              console.warn(
                `[AIService] Rate limit window too long for email ${email.id} (${delayMs}ms) — giving up`,
              );
              break;
            }

            if (attempt < ANALYSIS_MAX_RETRIES) {
              console.warn(
                `[AIService] 429 for email ${email.id}, waiting ${delayMs}ms (attempt ${attempt}/${ANALYSIS_MAX_RETRIES})`,
              );

              // eslint-disable-next-line no-await-in-loop
              await new Promise((resolve) => setTimeout(resolve, delayMs));
              continue;
            }

            break;
          }

          if (is503 && attempt < ANALYSIS_MAX_RETRIES) {
            console.warn(
              `[AIService] 503 on email ${email.id}, retrying in ${RETRY_DELAY_MS}ms (attempt ${attempt}/${ANALYSIS_MAX_RETRIES})`,
            );

            // eslint-disable-next-line no-await-in-loop
            await new Promise((resolve) =>
              setTimeout(resolve, RETRY_DELAY_MS),
            );
            continue;
          }

          console.error(
            `[AIService] Failed to analyse email ${email.id}:`,
            error,
          );
          break;
        }
      }

      if (!succeeded) {
        console.warn(
          `[AIService] Skipping email ${email.id} after retries`,
        );
      }
    }

    console.warn(
      `[AIService] Analysed ${Object.keys(analyses).length} emails`,
    );

    return analyses;
  }
}
