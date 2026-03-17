import type { ChatMessage, CannedResponse } from "@models/chat";

export const INITIAL_MESSAGES: readonly ChatMessage[] = [
  {
    id: "greeting",
    role: "assistant",
    content:
      "Hey Sam! Mira here. How can I help you get started today?",
  },
];

export const DEFAULT_CANNED_RESPONSE =
  "The supplier confirmed the delay is minor and dispensing levels remain safe. No immediate stock risk identified. Let me know if you need a deeper breakdown.";

export const DEMO_CANNED_RESPONSES: readonly CannedResponse[] =
  [
    {
      id: "cr-shortage",
      keywords: "shortage,backorder,unavailable,supply,clearpath,medcore",
      response: DEFAULT_CANNED_RESPONSE,
    },
    {
      id: "cr-price",
      keywords: "price,cost,budget,spend,invoice",
      response:
        "Based on current procurement data, total spend this cycle is within budget. I flagged one potential overpay of 12% on the latest Amoxicillin quote from ClearPath Rx — want me to pull a supplier comparison?",
    },
    {
      id: "cr-order",
      keywords: "order,po,purchase,replenishment",
      response:
        "I've reviewed all active replenishment orders. No critical flags at the moment — one partial fill is pending resolution on Metformin 1000mg.",
    },
    {
      id: "cr-expiry",
      keywords: "expiry,expiration,expire,waste",
      response:
        "3 SKUs are projected to expire before depletion at current dispensing rates. I recommend reducing the next order quantity for Omeprazole 20mg by 30% to avoid waste.",
    },
    {
      id: "cr-clinical",
      keywords: "dosage,clinical,pharmacist,substitution,alert,warning,form",
      response:
        "⚠️ CLINICAL ALERT: The proposed supplier substitution for Amoxicillin 500mg involves a dosage form change. A pharmacist must verify and update dosage instructions for all pending prescriptions before approving this order. Please review the alert on the action card before proceeding.",
    },
  ];

export function buildResponseMatcher({
  cannedResponses,
  defaultResponse,
}: {
  cannedResponses: readonly CannedResponse[];
  defaultResponse: string;
}): (userMessage: string) => string {
  return (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    for (const entry of cannedResponses) {
      const keywords = entry.keywords
        .split(",")
        .map((keyword) => keyword.trim().toLowerCase())
        .filter(Boolean);

      const hasMatch = keywords.some((keyword) =>
        lowerMessage.includes(keyword),
      );

      if (hasMatch) {
        return entry.response;
      }
    }

    return defaultResponse;
  };
}

export function getCannedResponseForMessage(
  userMessage: string,
): string {
  return buildResponseMatcher({
    cannedResponses: DEMO_CANNED_RESPONSES,
    defaultResponse: DEFAULT_CANNED_RESPONSE,
  })(userMessage);
}
