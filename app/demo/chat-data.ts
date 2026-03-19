import type { ChatMessage, CannedResponse } from "@models/chat";

export const INITIAL_MESSAGES: readonly ChatMessage[] = [
  {
    id: "init-1",
    role: "assistant",
    content:
      "Good morning. I've completed today's procurement run analysis across 6 suppliers.\n\n**3 critical issues need your attention now:**\n\n• **Amoxicillin 500mg** — out of stock. ClearPath Rx cancellation received this morning. Summit Pharma replacement confirmed (+$360, +2 days lead time).\n• **Insulin Glargine** — runs out Mar 21 (2 days). Cold-chain delay pushed ETA to Mar 24. 3-day gap. Emergency sourcing may be needed.\n• **Warfarin 5mg** — out of stock at PharmaLink, backordered until Apr 2. Two alternatives identified.\n\n**Today's run:** $34,800 across 6 suppliers · 3 SKUs at-risk · 18 active prescriptions affected.\n\nWhere would you like to start?",
  },
];

export const DEFAULT_CANNED_RESPONSE =
  "I've reviewed the latest supplier updates. The delay appears to be logistical rather than a stock issue — dispensing levels remain safe based on current inventory. Let me know if you'd like a deeper breakdown of any specific SKU or vendor.";

export const DEMO_CANNED_RESPONSES: readonly CannedResponse[] = [
  {
    id: "cr-shortage",
    keywords: "shortage,backorder,unavailable,supply,out of stock,allocation",
    response:
      "There are currently 3 active shortage events on this run:\n\n• **Amoxicillin 500mg** — national API shortage, ClearPath cancelled. Summit Pharma replacement available (+$1.50/unit).\n• **Insulin Glargine** — cold-chain logistics disruption at PharmaLink. Backordered until Apr 2 — emergency sourcing required.\n• **Warfarin 5mg** — manufacturer audit suspension at BMS. Two alternatives confirmed (Teva Warfarin or Acenocoumarol).\n\nWant me to pull the full detail on any of these?",
  },
  {
    id: "cr-price",
    keywords: "price,cost,budget,spend,invoice,expensive,cheaper",
    response:
      "Total proposed spend this run is **$34,800** across 6 suppliers — within the forecast range.\n\nOne pricing flag to note: Alliance Medical has issued a 20% price increase on Atorvastatin 20mg effective April 1, adding ~$80/month. McKesson and PharmaLink Co. both carry the equivalent product at current rates. Ordering this run locks in the contracted price before the increase kicks in.\n\nWant me to run a supplier comparison on Atorvastatin?",
  },
  {
    id: "cr-order",
    keywords: "order,po,purchase,replenishment,confirm,pending",
    response:
      "6 POs are active in this procurement run:\n\n• **PO-1099** (MedCore) — critical, Amoxicillin out of stock. Replacement pending your approval.\n• **PO-1042** (ClearPath) — delayed 2 days, Insulin Glargine runs out Mar 21.\n• **PO-1047** (Summit Pharma) — partial fill, Sertraline 50mg (80/160 units).\n• **PO-1051** (Alliance Medical) — unconfirmed after 48 hours.\n• **PO-1002** (PharmaLink) — Warfarin backordered.\n• **PO-5444** (Cardinal Rx) — on track, arriving early.\n\nShall I prioritise these by urgency?",
  },
  {
    id: "cr-expiry",
    keywords: "expiry,expiration,expire,waste,disposal,shelf life",
    response:
      "Based on current dispensing rates, 3 SKUs are projected to expire before depletion:\n\n• **Omeprazole 20mg** — 30 units on-hand, dispensing rate projects 8 units surplus at expiry. Recommend reducing next order by 25%.\n• **Zopiclone 7.5mg** — stable but worth monitoring if dispensing drops.\n• **Codeine 30mg** — running slightly above optimal stock level.\n\nAdjusting these quantities would reduce projected waste by approximately $340 this cycle.",
  },
  {
    id: "cr-clinical",
    keywords: "clinical,dosage,pharmacist,substitution,alert,warning,form,counselling",
    response:
      "⚠️ **CLINICAL ALERT:** Two active substitutions on this run require pharmacist sign-off:\n\n• **Amoxicillin 500mg** — different capsule shell formulation from Summit Pharma. Pharmacist must verify dosing instructions and update patient counselling before dispensing.\n• **Methotrexate 25mg/mL** — injectable oncology substitution from Fresenius Kabi. Requires co-authorisation from both the pharmacist and prescribing oncologist or rheumatologist per clinical governance policy.\n\nDo not approve either substitution until these reviews are completed.",
  },
  {
    id: "cr-insulin",
    keywords: "insulin,glargine,diabetes,diabetic,cold chain,refriger",
    response:
      "Insulin Glargine is the most time-sensitive item in this run. Stock runs out **Mar 21 — 2 days from now.** PharmaLink's cold-chain disruption pushed the restock ETA to Apr 2 — a 12-day gap.\n\nImmediate options:\n1. **McKesson** — reported to hold limited Insulin Glargine stock as of this morning.\n2. **Cardinal Health** — also reported to have stock.\n\nIf emergency sourcing fails, prescribers need to be notified today to evaluate bridging protocols for insulin-dependent patients. Don't delay this.",
  },
  {
    id: "cr-warfarin",
    keywords: "warfarin,anticoagulant,coagulation,inr,acenocoumarol,blood thin",
    response:
      "Warfarin 5mg is out of stock at PharmaLink — backordered until Apr 2 due to a BMS manufacturing audit. Current on-hand stock gives you **14 days of cover** — enough to bridge the gap without emergency action.\n\n**Recommended path:** Source Warfarin 5mg from Teva Pharmaceuticals via MedCore Distribution (bioequivalent, no INR adjustment required) within the next 7 days.\n\nAcenocoumarol 4mg is a valid fallback but requires individual prescriber sign-off and INR recalibration for each patient — use only if same-product sourcing fails.",
  },
  {
    id: "cr-supplier",
    keywords: "supplier,vendor,alternative,replacement,source,backup",
    response:
      "Confirmed alternative suppliers for critical items on this run:\n\n• **Amoxicillin 500mg** → Summit Pharma Supplies (+$1.50/unit, ETA Mar 27)\n• **Insulin Glargine** → McKesson or Cardinal Health (emergency allocation)\n• **Warfarin 5mg** → MedCore Distribution — Teva brand (bioequivalent)\n• **Doxycycline 100mg** → MedCore Distribution (+$2.00/unit, ETA Mar 26)\n• **Metoprolol Tartrate** → Alliance Medical — Teva brand (+$0.75/unit)\n\nWant me to initiate contact with any of these suppliers?",
  },
  {
    id: "cr-delay",
    keywords: "delay,late,delivery,logistics,shipment,reschedule,eta",
    response:
      "One confirmed delivery delay on this run:\n\n**MedCore Distribution (PO-1043)** — cold-chain vehicle emergency maintenance. Rescheduled from Mar 20 to Mar 22. Affected SKUs are Lisinopril 10mg and Metoprolol Succinate 50mg — both have sufficient on-hand stock to bridge the 48-hour delay without any dispensing risk.\n\nCardinal Rx (PO-5444) is actually arriving **4 hours early** today — ensure receiving bay is ready by 2:30 PM.",
  },
  {
    id: "cr-risk",
    keywords: "risk,critical,urgent,stockout,patient,safety,impact",
    response:
      "**Risk summary for today's run:**\n\n🔴 **Critical** (action required now)\n• Amoxicillin 500mg — zero stock, 14 Rx affected\n• Insulin Glargine — stockout in 2 days, no PharmaLink alternatives\n• Warfarin 5mg — zero stock, backordered 14 days\n\n🟡 **Warning** (monitor closely)\n• Sertraline 50mg partial fill — 80 of 160 units, backorder 10–14 days\n• ClearPath delivery delayed 2 days — Insulin gap window\n• PO-1051 unconfirmed after 48 hours\n\n🔵 **FYI**\n• Atorvastatin 20mg price increase +20% from Apr 1\n• Cardinal Rx arriving 4 hours early today\n\nTotal prescriptions at risk: **18 active**",
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
