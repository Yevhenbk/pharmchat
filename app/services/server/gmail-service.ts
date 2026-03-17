import "server-only";

import type { GmailEmail } from "@models/gmail-email";

const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const GMAIL_BASE = "https://gmail.googleapis.com/gmail/v1";

// ── Internal Gmail API types ───────────────────────────────

interface GmailHeader {
  name: string;
  value: string;
}

interface GmailPart {
  mimeType: string;
  body: { data?: string; size: number };
  parts?: GmailPart[];
  headers?: GmailHeader[];
}

interface GmailMessage {
  id: string;
  threadId: string;
  snippet: string;
  payload: GmailPart & { headers: GmailHeader[] };
}

interface GmailListResponse {
  messages?: Array<{ id: string; threadId: string }>;
}

interface TokenResponse {
  access_token: string;
}

// ── Helpers ───────────────────────────────────────────────

async function getAccessToken(): Promise<string> {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GMAIL_CLIENT_ID ?? "",
      client_secret: process.env.GMAIL_CLIENT_SECRET ?? "",
      refresh_token: process.env.GMAIL_REFRESH_TOKEN ?? "",
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `[GmailService] Token exchange failed: ${response.status}`,
    );
  }

  const data = (await response.json()) as TokenResponse;

  return data.access_token;
}

function decodeBase64Url(encoded: string): string {
  const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");

  return Buffer.from(base64, "base64").toString("utf-8");
}

function extractHeader(headers: GmailHeader[], name: string): string {
  return (
    headers.find(
      (h) => h.name.toLowerCase() === name.toLowerCase(),
    )?.value ?? ""
  );
}

// Full HTML4 + common HTML5 named entity map
const HTML_ENTITIES: Record<string, string> = {
  // Invisible / zero-width
  zwnj: "", zwj: "", zws: "", shy: "",
  // Whitespace
  nbsp: "\u00A0", ensp: "\u2002", emsp: "\u2003", thinsp: "\u2009",
  // Punctuation & symbols
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'",
  copy: "©", reg: "®", trade: "™", deg: "°", micro: "µ",
  para: "¶", middot: "·", bull: "•", sdot: "·",
  mdash: "—", ndash: "–", minus: "−", horbar: "―",
  hellip: "…", prime: "′", Prime: "″",
  laquo: "«", raquo: "»",
  lsquo: "\u2018", rsquo: "\u2019", sbquo: "\u201A",
  ldquo: "\u201C", rdquo: "\u201D", bdquo: "\u201E",
  lsaquo: "‹", rsaquo: "›",
  iexcl: "¡", iquest: "¿",
  cent: "¢", pound: "£", curren: "¤", yen: "¥",
  brvbar: "¦", sect: "§", uml: "¨", ordf: "ª", ordm: "º",
  not: "¬", macr: "¯", acute: "´", cedil: "¸",
  sup1: "¹", sup2: "²", sup3: "³",
  frac14: "¼", frac12: "½", frac34: "¾",
  times: "×", divide: "÷", plusmn: "±",
  euro: "€",
  // Latin uppercase
  Agrave: "À", Aacute: "Á", Acirc: "Â", Atilde: "Ã", Auml: "Ä",
  Aring: "Å", AElig: "Æ", Ccedil: "Ç",
  Egrave: "È", Eacute: "É", Ecirc: "Ê", Euml: "Ë",
  Igrave: "Ì", Iacute: "Í", Icirc: "Î", Iuml: "Ï",
  ETH: "Ð", Ntilde: "Ñ",
  Ograve: "Ò", Oacute: "Ó", Ocirc: "Ô", Otilde: "Õ", Ouml: "Ö",
  Oslash: "Ø",
  Ugrave: "Ù", Uacute: "Ú", Ucirc: "Û", Uuml: "Ü",
  Yacute: "Ý", THORN: "Þ", szlig: "ß",
  // Latin lowercase
  agrave: "à", aacute: "á", acirc: "â", atilde: "ã", auml: "ä",
  aring: "å", aelig: "æ", ccedil: "ç",
  egrave: "è", eacute: "é", ecirc: "ê", euml: "ë",
  igrave: "ì", iacute: "í", icirc: "î", iuml: "ï",
  eth: "ð", ntilde: "ñ",
  ograve: "ò", oacute: "ó", ocirc: "ô", otilde: "õ", ouml: "ö",
  oslash: "ø",
  ugrave: "ù", uacute: "ú", ucirc: "û", uuml: "ü",
  yacute: "ý", thorn: "þ", yuml: "ÿ",
  // Greek (common in math/science emails)
  alpha: "α", beta: "β", gamma: "γ", delta: "δ", epsilon: "ε",
  mu: "μ", pi: "π", sigma: "σ", omega: "ω",
  Alpha: "Α", Beta: "Β", Gamma: "Γ", Delta: "Δ", Omega: "Ω",
  // Math
  infin: "∞", sum: "∑", prod: "∏", radic: "√",
  asymp: "≈", ne: "≠", le: "≤", ge: "≥",
  // Arrows
  larr: "←", rarr: "→", uarr: "↑", darr: "↓", harr: "↔",
  lArr: "⇐", rArr: "⇒", hArr: "⇔",
  // Misc
  spades: "♠", clubs: "♣", hearts: "♥", diams: "♦",
  star: "★", check: "✓", cross: "✗",
};

function decodeHtmlEntities(text: string): string {
  return text
    // Hex numeric entities: &#x1F4; → char
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    // Decimal numeric entities: &#44; → ','
    .replace(/&#(\d+);/g, (_, dec: string) =>
      String.fromCodePoint(parseInt(dec, 10)),
    )
    // Named entities via lookup table (case-sensitive to distinguish e.g. Agrave vs agrave)
    .replace(/&([a-zA-Z]+);/g, (match, name: string) =>
      HTML_ENTITIES[name] ?? match,
    );
}

function stripHtml(html: string): string {
  const stripped = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    // Preserve block-level element boundaries as newlines
    .replace(/<\/?(p|div|br|tr|li|h[1-6])[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .split("\n")
    .map((line) => decodeHtmlEntities(line).replace(/\s{2,}/g, " ").trim())
    .filter((line) => line.length > 0)
    .join("\n");

  return stripped.trim();
}

interface ExtractedBody {
  text: string;
  html?: string;
}

function extractBody(part: GmailPart): ExtractedBody {
  // Prefer plain text
  if (part.mimeType === "text/plain" && part.body.data) {
    return { text: decodeHtmlEntities(decodeBase64Url(part.body.data)) };
  }

  // Recurse into multipart — collect best text and HTML
  if (part.parts) {
    // eslint-disable-next-line no-restricted-syntax
    let plainText = "";

    // eslint-disable-next-line no-restricted-syntax
    let htmlText = "";

    // eslint-disable-next-line no-restricted-syntax
    let rawHtml = "";

    for (const child of part.parts) {
      if (child.mimeType === "text/plain" && child.body.data && !plainText) {
        plainText = decodeHtmlEntities(decodeBase64Url(child.body.data));
      }

      if (child.mimeType === "text/html" && child.body.data && !rawHtml) {
        rawHtml = decodeBase64Url(child.body.data);
        htmlText = stripHtml(rawHtml);
      }

      if (!plainText && !rawHtml) {
        const nested = extractBody(child);

        if (nested.text) {
          plainText = nested.text;
        }

        if (nested.html) {
          rawHtml = nested.html;
        }
      }
    }

    if (plainText) {
      return { text: plainText, html: rawHtml || undefined };
    }

    if (rawHtml) {
      return { text: htmlText, html: rawHtml };
    }
  }

  // Top-level HTML
  if (part.mimeType === "text/html" && part.body.data) {
    const rawHtml = decodeBase64Url(part.body.data);

    return { text: stripHtml(rawHtml), html: rawHtml };
  }

  return { text: "" };
}

// ── RFC 2822 builder ──────────────────────────────────────

function buildRawMessage({
  from,
  to,
  subject,
  body,
}: {
  from: string;
  to: string;
  subject: string;
  body: string;
}): string {
  const message = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    `Content-Type: text/plain; charset=utf-8`,
    ``,
    body,
  ].join("\r\n");

  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// ── Service ───────────────────────────────────────────────

export class GmailService {
  static async fetchRecentEmails({
    limit = 30,
    accessToken: providedToken,
  }: { limit?: number; accessToken?: string } = {}): Promise<
    readonly GmailEmail[]
  > {
    const userId = "me";
    const accessToken = providedToken ?? (await getAccessToken());

    const listUrl =
      `${GMAIL_BASE}/users/${userId}/messages` +
      `?maxResults=${limit}&q=in:inbox`;

    const listResponse = await fetch(listUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    if (!listResponse.ok) {
      throw new Error(
        `[GmailService] List messages failed: ${listResponse.status}`,
      );
    }

    const listData = (await listResponse.json()) as GmailListResponse;
    const messageReferences = listData.messages ?? [];

    console.warn(
      `[GmailService] Fetching ${messageReferences.length} emails for ${userId}`,
    );

    const emails = await Promise.all(
      messageReferences.map(async ({ id }) => {
        const messageUrl =
          `${GMAIL_BASE}/users/${userId}/messages/${id}` +
          `?format=full`;

        const messageResponse = await fetch(messageUrl, {
          headers: { Authorization: `Bearer ${accessToken}` },
          cache: "no-store",
        });

        if (!messageResponse.ok) {
          return null;
        }

        const message = (await messageResponse.json()) as GmailMessage;
        const headers = message.payload.headers;
        const extracted = extractBody(message.payload);

        const email: GmailEmail = {
          id: message.id,
          threadId: message.threadId,
          from: extractHeader(headers, "From"),
          to: extractHeader(headers, "To"),
          subject: extractHeader(headers, "Subject"),
          date: extractHeader(headers, "Date"),
          body: extracted.text,
          bodyHtml: extracted.html,
          snippet: message.snippet,
        };

        return email;
      }),
    );

    const result = emails.filter(
      (email): email is GmailEmail => email !== null,
    );

    console.warn(
      `[GmailService] Successfully fetched ${result.length} emails`,
    );

    return result;
  }

  static async sendEmail({
    to,
    subject,
    body,
    accessToken: providedToken,
  }: {
    to: string;
    subject: string;
    body: string;
    accessToken?: string;
  }): Promise<void> {
    const userId = "me";
    const accessToken = providedToken ?? (await getAccessToken());

    const senderEmail =
      process.env.GMAIL_USER_EMAIL ?? "me";

    const raw = buildRawMessage({
      from: senderEmail,
      to,
      subject,
      body,
    });

    const sendUrl =
      `${GMAIL_BASE}/users/${userId}/messages/send`;

    const response = await fetch(sendUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `[GmailService] Send failed: ${response.status} ${errorText}`,
      );
    }

    console.warn(`[GmailService] Email sent to ${to}`);
  }
}
